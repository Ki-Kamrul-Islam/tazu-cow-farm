import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const dashboardRepository = {
    getAnimals: () => storage.get(STORAGE_KEYS.ANIMALS, []),
    getBreedingRecords: () => storage.get(STORAGE_KEYS.BREEDING_RECORDS, []),
    getHealthRecords: () => storage.get(STORAGE_KEYS.HEALTH_RECORDS, []),
    getMilkRecords: () => storage.get(STORAGE_KEYS.MILK_RECORDS, []),
    getSales: () => storage.get(STORAGE_KEYS.SALES, []),
    getExpenses: () => storage.get(STORAGE_KEYS.EXPENSES, []),
    getInventoryItems: () => storage.get(STORAGE_KEYS.INVENTORY_ITEMS, []),
    getTasks: () => storage.get(STORAGE_KEYS.TASKS, []),
};
