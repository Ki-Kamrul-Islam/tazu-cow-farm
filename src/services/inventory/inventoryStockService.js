import { inventoryItemRepository } from "../../modules/inventory/repositories/inventoryItemRepository.js";

export const inventoryStockService = {
    increaseStock(inventoryItemId, quantity) {
        const items = inventoryItemRepository.getAll();

        const item = items.find((item) => item.id === inventoryItemId);

        if (!item) {
            throw new Error("Inventory item not found.");
        }

        const currentStock = Number(item.quantity || 0);

        const receivedQuantity = Number(quantity || 0);

        const updatedItem = {
            ...item,

            quantity: currentStock + receivedQuantity,
        };

        const updatedItems = items.map((item) =>
            item.id === inventoryItemId ? updatedItem : item,
        );

        inventoryItemRepository.saveAll(updatedItems);

        return updatedItem;
    },
};
