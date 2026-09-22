import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const customerRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.CUSTOMERS, []);
    },

    getById(id) {
        return this.getAll().find((customer) => customer.id === id) ?? null;
    },

    create(customer) {
        const customers = this.getAll();
        storage.set(STORAGE_KEYS.CUSTOMERS, [...customers, customer]);
        return customer;
    },

    update(id, updates) {
        const customers = this.getAll();
        const next = customers.map((customer) =>
            customer.id === id ? { ...customer, ...updates } : customer,
        );
        storage.set(STORAGE_KEYS.CUSTOMERS, next);
        return next.find((customer) => customer.id === id) ?? null;
    },

    remove(id) {
        const customers = this.getAll();
        storage.set(
            STORAGE_KEYS.CUSTOMERS,
            customers.filter((customer) => customer.id !== id),
        );
        return true;
    },
};
