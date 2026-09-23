import { getTodayDateString } from "../../utils/date.js";
import { goodsReceivedRepository } from "../../repositories/goodsReceived/goodsReceivedRepository.js";

import { purchaseOrderRepository } from "../../repositories/purchaseOrder/purchaseOrderRepository.js";

import { stockMovementRepository } from "../../repositories/stockMovement/stockMovementRepository.js";

import { inventoryStockService } from "../inventory/inventoryStockService.js";

function generateId() {
    return `grn_${crypto.randomUUID()}`;
}

function generateItemId() {
    return `grn_item_${crypto.randomUUID()}`;
}

function now() {
    return new Date().toISOString();
}

function generateReceiptNumber() {
    const year = new Date().getFullYear();

    const records = goodsReceivedRepository.getAll();

    const number = String(records.length + 1).padStart(4, "0");

    return `GRN-${year}-${number}`;
}

function calculateAlreadyReceived(purchaseOrderId, purchaseOrderItemId) {
    const records =
        goodsReceivedRepository.getByPurchaseOrderId(purchaseOrderId);

    return records.reduce((sum, record) => {
        const item = record.items.find(
            (item) => item.purchaseOrderItemId === purchaseOrderItemId,
        );

        return sum + Number(item?.receivedQuantity || 0);
    }, 0);
}

function calculateOrderStatus(purchaseOrder) {
    let totalOrdered = 0;
    let totalReceived = 0;

    purchaseOrder.items.forEach((item) => {
        totalOrdered += Number(item.quantity || 0);

        totalReceived += calculateAlreadyReceived(purchaseOrder.id, item.id);
    });

    if (totalReceived === 0) {
        return "ordered";
    }

    if (totalReceived < totalOrdered) {
        return "partially_received";
    }

    return "received";
}

export const goodsReceivedService = {
    getById(id) {
        return goodsReceivedRepository.getById(id);
    },

    list() {
        return goodsReceivedRepository.getAll();
    },

    getPurchaseOrderReceivingSummary(purchaseOrderId) {
        const purchaseOrder = purchaseOrderRepository.getById(purchaseOrderId);

        if (!purchaseOrder) {
            return null;
        }

        return purchaseOrder.items.map((poItem) => {
            const alreadyReceived = calculateAlreadyReceived(
                purchaseOrderId,
                poItem.id,
            );

            const orderedQuantity = Number(poItem.quantity || 0);

            const remainingQuantity = Math.max(
                0,
                orderedQuantity - alreadyReceived,
            );

            return {
                purchaseOrderItemId: poItem.id,

                inventoryItemId: poItem.inventoryItemId,

                orderedQuantity,

                receivedQuantity: alreadyReceived,

                remainingQuantity,

                unitCost: Number(poItem.unitCost || 0),
            };
        });
    },

    receive(purchaseOrderId, receivedItems, receivedDate, notes = "") {
        const purchaseOrder = purchaseOrderRepository.getById(purchaseOrderId);

        if (!purchaseOrder) {
            return {
                errors: {
                    form: "goodsReceived.validation.purchaseOrderNotFound",
                },
            };
        }

        if (purchaseOrder.status === "cancelled") {
            return {
                errors: {
                    form: "goodsReceived.validation.orderCancelled",
                },
            };
        }

        if (purchaseOrder.status === "received") {
            return {
                errors: {
                    form: "goodsReceived.validation.orderAlreadyReceived",
                },
            };
        }

        const summary = this.getPurchaseOrderReceivingSummary(purchaseOrderId);

        const errors = {};

        const validItems = [];

        receivedItems.forEach((receivedItem) => {
            const orderItem = summary.find(
                (item) =>
                    item.purchaseOrderItemId ===
                    receivedItem.purchaseOrderItemId,
            );

            if (!orderItem) {
                return;
            }

            const quantity = Number(receivedItem.receivedQuantity || 0);

            if (quantity < 0) {
                errors.items = "goodsReceived.validation.invalidQuantity";

                return;
            }

            if (quantity > orderItem.remainingQuantity) {
                errors.items = "goodsReceived.validation.exceedsRemaining";

                return;
            }

            if (quantity > 0) {
                validItems.push({
                    ...orderItem,
                    receivedQuantity: quantity,
                });
            }
        });

        if (validItems.length === 0) {
            errors.items = "goodsReceived.validation.noQuantity";
        }

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const timestamp = now();

        const receiptItems = validItems.map((item) => ({
            id: generateItemId(),

            purchaseOrderItemId: item.purchaseOrderItemId,

            inventoryItemId: item.inventoryItemId,

            orderedQuantity: item.orderedQuantity,

            receivedQuantity: item.receivedQuantity,

            unitCost: item.unitCost,

            totalCost: item.receivedQuantity * item.unitCost,
        }));

        const totalCost = receiptItems.reduce(
            (sum, item) => sum + item.totalCost,
            0,
        );

        const receipt = {
            id: generateId(),

            receiptNumber: generateReceiptNumber(),

            purchaseOrderId,

            receivedDate: receivedDate || getTodayDateString(),

            notes: notes.trim(),

            items: receiptItems,

            totalCost,

            createdAt: timestamp,
            updatedAt: timestamp,
        };

        // 1. Save receiving record
        const existingReceipts = goodsReceivedRepository.getAll();

        goodsReceivedRepository.saveAll([...existingReceipts, receipt]);

        // 2. Increase inventory stock
        receiptItems.forEach((item) => {
            inventoryStockService.increaseStock(
                item.inventoryItemId,
                item.receivedQuantity,
            );
        });

        // 3. Create stock movements
        const existingMovements = stockMovementRepository.getAll();

        const movements = receiptItems.map((item) => ({
            id: `movement_${crypto.randomUUID()}`,

            inventoryItemId: item.inventoryItemId,

            type: "purchase",

            quantity: item.receivedQuantity,

            unitCost: item.unitCost,

            totalCost: item.totalCost,

            referenceType: "goods_received",

            referenceId: receipt.id,

            purchaseOrderId,

            date: receipt.receivedDate,

            notes: `Received from PO ${purchaseOrder.poNumber}`,

            createdAt: timestamp,
        }));

        stockMovementRepository.saveAll([...existingMovements, ...movements]);

        // 4. Update PO status
        const newStatus = calculateOrderStatus(purchaseOrder);

        const allOrders = purchaseOrderRepository.getAll();

        const updatedOrder = {
            ...purchaseOrder,

            status: newStatus,

            updatedAt: timestamp,
        };

        purchaseOrderRepository.saveAll(
            allOrders.map((order) =>
                order.id === purchaseOrder.id ? updatedOrder : order,
            ),
        );

        return {
            receipt,
            purchaseOrder: updatedOrder,
        };
    },
};
