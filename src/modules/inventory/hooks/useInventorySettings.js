import { useCallback, useEffect, useState } from "react";

import { inventorySettingsService } from "../../../services/inventory/inventorySettingsService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

export function useInventorySettings() {
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);

        setCategories(inventorySettingsService.getCategories());

        setUnits(inventorySettingsService.getUnits());

        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const addCategory = (name) => {
        const result = inventorySettingsService.addCategory(name);

        if (result.error) {
            showToast(t(result.error), "error");
            return false;
        }

        showToast(t("inventorySettings.toast.categoryAdded"), "success");

        load();
        return true;
    };

    const updateCategory = (id, name) => {
        const result = inventorySettingsService.updateCategory(id, name);

        if (result.error) {
            showToast(t(result.error), "error");
            return false;
        }

        showToast(t("inventorySettings.toast.categoryUpdated"), "success");

        load();
        return true;
    };

    const toggleCategory = (id) => {
        inventorySettingsService.toggleCategory(id);

        load();
    };

    const addUnit = (name) => {
        const result = inventorySettingsService.addUnit(name);

        if (result.error) {
            showToast(t(result.error), "error");
            return false;
        }

        showToast(t("inventorySettings.toast.unitAdded"), "success");

        load();
        return true;
    };

    const updateUnit = (id, name) => {
        const result = inventorySettingsService.updateUnit(id, name);

        if (result.error) {
            showToast(t(result.error), "error");
            return false;
        }

        showToast(t("inventorySettings.toast.unitUpdated"), "success");

        load();
        return true;
    };

    const toggleUnit = (id) => {
        inventorySettingsService.toggleUnit(id);

        load();
    };

    return {
        categories,
        units,
        loading,

        addCategory,
        updateCategory,
        toggleCategory,

        addUnit,
        updateUnit,
        toggleUnit,
    };
}
