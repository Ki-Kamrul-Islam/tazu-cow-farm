import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const fieldRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.FIELDS, []);
    },
    getById(id) {
        return this.getAll().find((item) => item.id === id) ?? null;
    },
    create(field) {
        const items = this.getAll();
        storage.set(STORAGE_KEYS.FIELDS, [...items, field]);
        return field;
    },
    update(id, updates) {
        const items = this.getAll();
        const next = items.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
        );
        storage.set(STORAGE_KEYS.FIELDS, next);
        return next.find((item) => item.id === id) ?? null;
    },
    remove(id) {
        const items = this.getAll();
        storage.set(
            STORAGE_KEYS.FIELDS,
            items.filter((item) => item.id !== id),
        );
        return true;
    },
};
