import { purchaseOrderRepository } from "../../repositories/purchaseOrder/purchaseOrderRepository.js";

function generateId() {
    return `po_${crypto.randomUUID()}`;
}

function generateItemId() {
    return `po_item_${crypto.randomUUID()}`;
}

function now() {
    return new Date().toISOString();
}

function calculateItemTotal(item) {
    return Number(item.quantity || 0) * Number(item.unitCost || 0);
}

function calculateTotals(items) {
    const subtotal = items.reduce(
        (sum, item) => sum + calculateItemTotal(item),
        0,
    );

    return {
        subtotal,
        total: subtotal,
    };
}

function generatePONumber() {
    const year = new Date().getFullYear();

    const orders = purchaseOrderRepository.getAll();

    const number = String(orders.length + 1).padStart(4, "0");

    return `PO-${year}-${number}`;
}

function validate(data) {
    const errors = {};

    if (!data.supplierId) {
        errors.supplierId = "purchaseOrder.validation.supplierRequired";
    }

    if (!data.orderDate) {
        errors.orderDate = "purchaseOrder.validation.orderDateRequired";
    }

    if (!data.items || data.items.length === 0) {
        errors.items = "purchaseOrder.validation.itemsRequired";
    }

    return errors;
}

export const purchaseOrderService = {
    list() {
        return purchaseOrderRepository.getAll();
    },

    getById(id) {
        return purchaseOrderRepository.getById(id);
    },

    create(data) {
        const errors = validate(data);

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const timestamp = now();

        const items = data.items.map((item) => ({
            id: generateItemId(),

            inventoryItemId: item.inventoryItemId,

            quantity: Number(item.quantity),

            unitCost: Number(item.unitCost),

            total: calculateItemTotal(item),
        }));

        const totals = calculateTotals(items);

        const order = {
            id: generateId(),

            poNumber: generatePONumber(),

            supplierId: data.supplierId,

            orderDate: data.orderDate,

            expectedDate: data.expectedDate || "",

            status: "draft",

            notes: data.notes?.trim() || "",

            items,

            subtotal: totals.subtotal,

            total: totals.total,

            createdAt: timestamp,
            updatedAt: timestamp,
        };

        const orders = purchaseOrderRepository.getAll();

        purchaseOrderRepository.saveAll([...orders, order]);

        return {
            order,
        };
    },

    update(id, data) {
        const existing = purchaseOrderRepository.getById(id);

        if (!existing) {
            return {
                errors: {
                    form: "purchaseOrder.validation.notFound",
                },
            };
        }

        if (existing.status !== "draft") {
            return {
                errors: {
                    form: "purchaseOrder.validation.onlyDraftCanEdit",
                },
            };
        }

        const errors = validate(data);

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const items = data.items.map((item) => ({
            id: item.id || generateItemId(),

            inventoryItemId: item.inventoryItemId,

            quantity: Number(item.quantity),

            unitCost: Number(item.unitCost),

            total: calculateItemTotal(item),
        }));

        const totals = calculateTotals(items);

        const updatedOrder = {
            ...existing,

            supplierId: data.supplierId,

            orderDate: data.orderDate,

            expectedDate: data.expectedDate || "",

            notes: data.notes?.trim() || "",

            items,

            subtotal: totals.subtotal,

            total: totals.total,

            updatedAt: now(),
        };

        const orders = purchaseOrderRepository.getAll();

        const updated = orders.map((order) =>
            order.id === id ? updatedOrder : order,
        );

        purchaseOrderRepository.saveAll(updated);

        return {
            order: updatedOrder,
        };
    },

    updateStatus(id, status) {
        const orders = purchaseOrderRepository.getAll();

        const existing = orders.find((order) => order.id === id);

        if (!existing) {
            return {
                error: "purchaseOrder.validation.notFound",
            };
        }

        const updatedOrder = {
            ...existing,

            status,

            updatedAt: now(),
        };

        const updated = orders.map((order) =>
            order.id === id ? updatedOrder : order,
        );

        purchaseOrderRepository.saveAll(updated);

        return {
            order: updatedOrder,
        };
    },

    remove(id) {
        const orders = purchaseOrderRepository.getAll();

        const filtered = orders.filter((order) => order.id !== id);

        purchaseOrderRepository.saveAll(filtered);

        return true;
    },
};
