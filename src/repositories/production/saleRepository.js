import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const saleRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.SALES, []);
    },

    getById(id) {
        return this.getAll().find((sale) => sale.id === id) ?? null;
    },

    create(sale) {
        const sales = this.getAll();
        storage.set(STORAGE_KEYS.SALES, [...sales, sale]);
        return sale;
    },

    update(id, updates) {
        const sales = this.getAll();
        const next = sales.map((sale) =>
            sale.id === id ? { ...sale, ...updates } : sale,
        );
        storage.set(STORAGE_KEYS.SALES, next);
        return next.find((sale) => sale.id === id) ?? null;
    },

    remove(id) {
        const sales = this.getAll();
        storage.set(
            STORAGE_KEYS.SALES,
            sales.filter((sale) => sale.id !== id),
        );
        return true;
    },
};
