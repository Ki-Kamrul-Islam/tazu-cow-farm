import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const employeeRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.EMPLOYEES, []);
    },
    getById(id) {
        return this.getAll().find((item) => item.id === id) ?? null;
    },
    create(employee) {
        const items = this.getAll();
        storage.set(STORAGE_KEYS.EMPLOYEES, [...items, employee]);
        return employee;
    },
    update(id, updates) {
        const items = this.getAll();
        const next = items.map((item) =>
            item.id === id ? { ...item, ...updates } : item,
        );
        storage.set(STORAGE_KEYS.EMPLOYEES, next);
        return next.find((item) => item.id === id) ?? null;
    },
    remove(id) {
        const items = this.getAll();
        storage.set(
            STORAGE_KEYS.EMPLOYEES,
            items.filter((item) => item.id !== id),
        );
        return true;
    },
};
