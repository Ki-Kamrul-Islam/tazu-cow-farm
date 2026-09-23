import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const supplierRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.SUPPLIERS, []);
    },

    getById(id) {
        const suppliers = this.getAll();

        return suppliers.find((supplier) => supplier.id === id);
    },

    saveAll(suppliers) {
        storage.set(STORAGE_KEYS.SUPPLIERS, suppliers);

        return suppliers;
    },
};
