import { storage } from "../../../storage/storage.js";

const STORAGE_KEY = "cow_farm_stock_adjustments";

const stockAdjustmentRepository = {
    getAll() {
        return storage.get(STORAGE_KEY) || [];
    },

    getById(id) {
        const records = this.getAll();

        return records.find((record) => record.id === id) || null;
    },

    getByItemId(inventoryItemId) {
        const records = this.getAll();

        return records.filter(
            (record) => record.inventoryItemId === inventoryItemId,
        );
    },

    saveAll(records) {
        storage.set(STORAGE_KEY, records);

        return records;
    },

    create(record) {
        const records = this.getAll();

        records.push(record);

        this.saveAll(records);

        return record;
    },
};

export default stockAdjustmentRepository;
