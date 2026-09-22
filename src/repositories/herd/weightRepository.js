import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const weightRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.WEIGHT_RECORDS, []);
    },

    getById(id) {
        return this.getAll().find((record) => record.id === id) ?? null;
    },

    getByAnimalId(animalId) {
        return this.getAll().filter((record) => record.animalId === animalId);
    },

    create(record) {
        const records = this.getAll();
        storage.set(STORAGE_KEYS.WEIGHT_RECORDS, [...records, record]);
        return record;
    },

    update(id, updates) {
        const records = this.getAll();
        const next = records.map((record) =>
            record.id === id ? { ...record, ...updates } : record,
        );
        storage.set(STORAGE_KEYS.WEIGHT_RECORDS, next);
        return next.find((record) => record.id === id) ?? null;
    },

    remove(id) {
        const records = this.getAll();
        storage.set(
            STORAGE_KEYS.WEIGHT_RECORDS,
            records.filter((record) => record.id !== id),
        );
        return true;
    },
};
