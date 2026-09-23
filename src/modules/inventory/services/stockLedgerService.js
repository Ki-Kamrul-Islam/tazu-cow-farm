import { inventoryItemRepository } from "../repositories/inventoryItemRepository.js";
import { stockMovementRepository } from "../../../repositories/stockMovement/stockMovementRepository.js";
import stockAdjustmentRepository from "../repositories/stockAdjustmentRepository.js";

const stockLedgerService = {
    getCurrentStock() {
        const items = inventoryItemRepository.getAll();

        return items.map((item) => {
            const stock = Number(item.quantity) || 0;

            return {
                ...item,
                quantity: stock,
            };
        });
    },

    getMovements() {
        return stockMovementRepository.getAll();
    },

    getAdjustments() {
        return stockAdjustmentRepository.getAll();
    },

    getItemLedger(inventoryItemId) {
        const movements = stockMovementRepository.getByItemId(inventoryItemId);

        return movements.sort(
            (a, b) =>
                new Date(b.createdAt || b.date) -
                new Date(a.createdAt || a.date),
        );
    },

    getSummary() {
        const items = inventoryItemRepository.getAll();

        const movements = stockMovementRepository.getAll();

        let totalStock = 0;
        let totalStockIn = 0;
        let totalStockOut = 0;

        items.forEach((item) => {
            totalStock += Number(item.quantity) || 0;
        });

        movements.forEach((movement) => {
            const quantity = Number(movement.quantity) || 0;

            if (quantity > 0) {
                totalStockIn += quantity;
            }

            if (quantity < 0) {
                totalStockOut += Math.abs(quantity);
            }
        });

        return {
            totalStock,
            totalStockIn,
            totalStockOut,
            totalItems: items.length,
        };
    },
};

export default stockLedgerService;
