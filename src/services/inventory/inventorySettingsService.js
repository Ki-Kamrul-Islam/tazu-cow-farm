import { inventorySettingsRepository } from "../../repositories/inventory/inventorySettingsRepository.js";

function generateId(prefix) {
    return `${prefix}_${crypto.randomUUID()}`;
}

function createEntry(data, prefix) {
    return {
        id: generateId(prefix),
        name: data.name.trim(),
        status: "active",
    };
}

function hasDuplicateName(items, name, excludeId = null) {
    return items.some(
        (item) =>
            item.id !== excludeId &&
            item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
}

export const inventorySettingsService = {
    getCategories() {
        return inventorySettingsRepository.getCategories();
    },

    getActiveCategories() {
        return this.getCategories().filter(
            (category) => category.status === "active",
        );
    },

    addCategory(name) {
        if (!name?.trim()) {
            return {
                error: "inventorySettings.validation.nameRequired",
            };
        }

        const categories = this.getCategories();

        if (hasDuplicateName(categories, name)) {
            return {
                error: "inventorySettings.validation.duplicate",
            };
        }

        const category = createEntry({ name }, "category");

        inventorySettingsRepository.saveCategories([...categories, category]);

        return { item: category };
    },

    updateCategory(id, name) {
        if (!name?.trim()) {
            return {
                error: "inventorySettings.validation.nameRequired",
            };
        }

        const categories = this.getCategories();

        if (hasDuplicateName(categories, name, id)) {
            return {
                error: "inventorySettings.validation.duplicate",
            };
        }

        const updated = categories.map((category) =>
            category.id === id ?
                {
                    ...category,
                    name: name.trim(),
                }
            :   category,
        );

        inventorySettingsRepository.saveCategories(updated);

        return {
            item: updated.find((category) => category.id === id),
        };
    },

    toggleCategory(id) {
        const categories = this.getCategories();

        const updated = categories.map((category) =>
            category.id === id ?
                {
                    ...category,
                    status:
                        category.status === "active" ? "inactive" : "active",
                }
            :   category,
        );

        inventorySettingsRepository.saveCategories(updated);

        return updated;
    },

    getUnits() {
        return inventorySettingsRepository.getUnits();
    },

    getActiveUnits() {
        return this.getUnits().filter((unit) => unit.status === "active");
    },

    addUnit(name) {
        if (!name?.trim()) {
            return {
                error: "inventorySettings.validation.nameRequired",
            };
        }

        const units = this.getUnits();

        if (hasDuplicateName(units, name)) {
            return {
                error: "inventorySettings.validation.duplicate",
            };
        }

        const unit = createEntry({ name }, "unit");

        inventorySettingsRepository.saveUnits([...units, unit]);

        return { item: unit };
    },

    updateUnit(id, name) {
        if (!name?.trim()) {
            return {
                error: "inventorySettings.validation.nameRequired",
            };
        }

        const units = this.getUnits();

        if (hasDuplicateName(units, name, id)) {
            return {
                error: "inventorySettings.validation.duplicate",
            };
        }

        const updated = units.map((unit) =>
            unit.id === id ?
                {
                    ...unit,
                    name: name.trim(),
                }
            :   unit,
        );

        inventorySettingsRepository.saveUnits(updated);

        return {
            item: updated.find((unit) => unit.id === id),
        };
    },

    toggleUnit(id) {
        const units = this.getUnits();

        const updated = units.map((unit) =>
            unit.id === id ?
                {
                    ...unit,
                    status: unit.status === "active" ? "inactive" : "active",
                }
            :   unit,
        );

        inventorySettingsRepository.saveUnits(updated);

        return updated;
    },
};
