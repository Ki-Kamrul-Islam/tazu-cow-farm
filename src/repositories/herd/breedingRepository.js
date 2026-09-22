import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const breedingRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.BREEDING_RECORDS, []);
    },

    getById(id) {
        return this.getAll().find((record) => record.id === id) ?? null;
    },

    create(record) {
        const records = this.getAll();
        storage.set(STORAGE_KEYS.BREEDING_RECORDS, [...records, record]);
        return record;
    },

    update(id, updates) {
        const records = this.getAll();
        const next = records.map((record) =>
            record.id === id ? { ...record, ...updates } : record,
        );
        storage.set(STORAGE_KEYS.BREEDING_RECORDS, next);
        return next.find((record) => record.id === id) ?? null;
    },

    remove(id) {
        const records = this.getAll();
        storage.set(
            STORAGE_KEYS.BREEDING_RECORDS,
            records.filter((record) => record.id !== id),
        );
        return true;
    },
};
