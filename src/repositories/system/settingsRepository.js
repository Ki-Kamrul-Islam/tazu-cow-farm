import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

const DEFAULT_SETTINGS = {
    farmName: "Tazu Cow Farm",
    currency: "৳",
    dateFormat: "YYYY-MM-DD",
};

export const settingsRepository = {
    get() {
        return storage.get(STORAGE_KEYS.FARM_SETTINGS, DEFAULT_SETTINGS);
    },
    save(settings) {
        storage.set(STORAGE_KEYS.FARM_SETTINGS, settings);
        return settings;
    },
};
