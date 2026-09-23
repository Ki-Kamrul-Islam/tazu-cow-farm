import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const stockMovementRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.STOCK_MOVEMENTS, []);
    },

    getByItemId(inventoryItemId) {
        return this.getAll().filter(
            (movement) => movement.inventoryItemId === inventoryItemId,
        );
    },

    saveAll(movements) {
        storage.set(STORAGE_KEYS.STOCK_MOVEMENTS, movements);

        return movements;
    },
};
