import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const goodsReceivedRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.GOODS_RECEIVED, []);
    },

    getById(id) {
        const records = this.getAll();

        return records.find((record) => record.id === id);
    },

    getByPurchaseOrderId(purchaseOrderId) {
        return this.getAll().filter(
            (record) => record.purchaseOrderId === purchaseOrderId,
        );
    },

    saveAll(records) {
        storage.set(STORAGE_KEYS.GOODS_RECEIVED, records);

        return records;
    },
};
