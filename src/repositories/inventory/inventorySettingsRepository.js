import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

import {
    DEFAULT_INVENTORY_CATEGORIES,
    DEFAULT_INVENTORY_UNITS,
} from "../../constants/inventory.js";

function getWithDefaults(key, defaults) {
    const existing = storage.get(key, null);

    if (existing === null) {
        storage.set(key, defaults);
        return defaults;
    }

    return existing;
}

export const inventorySettingsRepository = {
    getCategories() {
        return getWithDefaults(
            STORAGE_KEYS.INVENTORY_CATEGORIES,
            DEFAULT_INVENTORY_CATEGORIES,
        );
    },

    saveCategories(categories) {
        storage.set(STORAGE_KEYS.INVENTORY_CATEGORIES, categories);

        return categories;
    },

    getUnits() {
        return getWithDefaults(
            STORAGE_KEYS.INVENTORY_UNITS,
            DEFAULT_INVENTORY_UNITS,
        );
    },

    saveUnits(units) {
        storage.set(STORAGE_KEYS.INVENTORY_UNITS, units);

        return units;
    },
};
