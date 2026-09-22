import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const feedTypeRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.FEED_TYPES, []);
    },

    getById(id) {
        return this.getAll().find((item) => item.id === id) ?? null;
    },

    create(feedType) {
        const items = this.getAll();
        storage.set(STORAGE_KEYS.FEED_TYPES, [...items, feedType]);
        return feedType;
    },

    update(id, updates) {
        const items = this.getAll();
        const next = items.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
        );
        storage.set(STORAGE_KEYS.FEED_TYPES, next);
        return next.find((item) => item.id === id) ?? null;
    },

    remove(id) {
        const items = this.getAll();
        storage.set(
            STORAGE_KEYS.FEED_TYPES,
            items.filter((item) => item.id !== id),
        );
        return true;
    },
};
