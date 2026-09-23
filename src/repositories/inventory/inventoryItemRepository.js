import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const inventoryItemRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.INVENTORY_ITEMS, []);
    },

    getById(id) {
        return this.getAll().find((item) => item.id === id) ?? null;
    },

    create(item) {
        const items = this.getAll();

        storage.set(STORAGE_KEYS.INVENTORY_ITEMS, [...items, item]);

        return item;
    },

    update(id, updates) {
        const items = this.getAll();

        const next = items.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
        );

        storage.set(STORAGE_KEYS.INVENTORY_ITEMS, next);

        return next.find((item) => item.id === id) ?? null;
    },

    remove(id) {
        const items = this.getAll();

        storage.set(
            STORAGE_KEYS.INVENTORY_ITEMS,
            items.filter((item) => item.id !== id),
        );

        return true;
    },
};
