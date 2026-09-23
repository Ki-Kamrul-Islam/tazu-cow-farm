import { getTodayDateString } from "../../../utils/date.js";
import stockAdjustmentRepository from "../repositories/stockAdjustmentRepository.js";
import { inventoryItemRepository } from "../repositories/inventoryItemRepository.js";
import { stockMovementRepository } from "../../../repositories/stockMovement/stockMovementRepository.js";

import {
    calculateNewStock,
    validateStockChange,
} from "../utils/stockCalculations.js";

function generateAdjustmentNumber() {
    const records = stockAdjustmentRepository.getAll();

    const number = records.length + 1;

    return `ADJ-${String(number).padStart(4, "0")}`;
}

function generateId() {
    return `adj_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

const stockAdjustmentService = {
    getAll() {
        return stockAdjustmentRepository.getAll();
    },

    getById(id) {
        return stockAdjustmentRepository.getById(id);
    },

    getByItemId(inventoryItemId) {
        return stockAdjustmentRepository.getByItemId(inventoryItemId);
    },

    createAdjustment({
        inventoryItemId,
        type,
        quantity,
        reason,
        notes = "",
        date,
    }) {
        if (!inventoryItemId) {
            throw new Error("Inventory item is required.");
        }

        if (!type) {
            throw new Error("Adjustment type is required.");
        }

        if (!reason?.trim()) {
            throw new Error("Reason is required.");
        }

        const items = inventoryItemRepository.getAll();

        const item = items.find((item) => item.id === inventoryItemId);

        if (!item) {
            throw new Error("Inventory item not found.");
        }

        const currentStock = Number(item.quantity) || 0;

        const result = validateStockChange(currentStock, quantity, type);

        const previousStock = result.currentStock;

        const newStock = calculateNewStock(previousStock, quantity, type);

        const adjustment = {
            id: generateId(),

            adjustmentNumber: generateAdjustmentNumber(),

            inventoryItemId,

            type,

            quantity: Number(quantity),

            previousStock,

            newStock,

            reason: reason.trim(),

            notes: notes.trim(),

            date: date || getTodayDateString(),

            createdAt: new Date().toISOString(),
        };

        // 1. Save adjustment
        stockAdjustmentRepository.create(adjustment);

        // 2. Update inventory stock
        const updatedItems = items.map((item) => {
            if (item.id !== inventoryItemId) {
                return item;
            }

            return {
                ...item,
                quantity: newStock,
                updatedAt: new Date().toISOString(),
            };
        });

        inventoryItemRepository.saveAll(updatedItems);

        // 3. Create stock movement
        const movement = {
            id: `movement_${Date.now()}`,

            inventoryItemId,

            type: "adjustment",

            quantity: newStock - previousStock,

            previousStock,

            newStock,

            referenceType: "stock_adjustment",

            referenceId: adjustment.id,

            date: adjustment.date,

            notes: reason.trim(),

            createdAt: new Date().toISOString(),
        };

        const movements = stockMovementRepository.getAll();

        stockMovementRepository.saveAll([...movements, movement]);

        return adjustment;
    },
};

export default stockAdjustmentService;