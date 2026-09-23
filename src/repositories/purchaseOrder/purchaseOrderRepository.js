import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const purchaseOrderRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.PURCHASE_ORDERS, []);
    },

    getById(id) {
        const orders = this.getAll();

        return orders.find((order) => order.id === id);
    },

    saveAll(orders) {
        storage.set(STORAGE_KEYS.PURCHASE_ORDERS, orders);

        return orders;
    },
};
