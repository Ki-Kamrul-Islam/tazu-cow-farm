import { inventoryItemRepository } from "../../repositories/inventory/inventoryItemRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateInventoryItem(data, { excludeId } = {}) {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = "inventoryItem.validation.nameRequired";
    }

    if (!data.sku?.trim()) {
        errors.sku = "inventoryItem.validation.skuRequired";
    } else {
        const duplicateSku = inventoryItemRepository
            .getAll()
            .some(
                (item) =>
                    item.sku.trim().toLowerCase() ===
                        data.sku.trim().toLowerCase() && item.id !== excludeId,
            );

        if (duplicateSku) {
            errors.sku = "inventoryItem.validation.skuDuplicate";
        }
    }

    if (!data.category) {
        errors.category = "inventoryItem.validation.categoryRequired";
    }

    if (!data.unit) {
        errors.unit = "inventoryItem.validation.unitRequired";
    }

    if (data.quantity === "" || Number(data.quantity) < 0) {
        errors.quantity = "inventoryItem.validation.quantityNonNegative";
    }

    if (data.reorderLevel === "" || Number(data.reorderLevel) < 0) {
        errors.reorderLevel =
            "inventoryItem.validation.reorderLevelNonNegative";
    }

    return errors;
}

function buildInventoryItem(data) {
    return {
        name: data.name.trim(),
        sku: data.sku.trim(),
        category: data.category,
        unit: data.unit,
        quantity: Number(data.quantity),
        reorderLevel: Number(data.reorderLevel),
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const inventoryItemService = {
    list({ search = "", category = "", status = "" } = {}) {
        let items = inventoryItemRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();

            items = items.filter(
                (item) =>
                    item.name?.toLowerCase().includes(q) ||
                    item.sku?.toLowerCase().includes(q),
            );
        }

        if (category) {
            items = items.filter((item) => item.category === category);
        }

        if (status) {
            items = items.filter((item) => item.status === status);
        }

        return [...items].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    count() {
        return inventoryItemRepository.getAll().length;
    },

    getById(id) {
        return inventoryItemRepository.getById(id);
    },

    create(data) {
        const errors = validateInventoryItem(data);

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const now = new Date().toISOString();

        const item = {
            id: generateId(),
            ...buildInventoryItem(data),
            createdAt: now,
            updatedAt: now,
        };

        inventoryItemRepository.create(item);

        return { item };
    },

    update(id, data) {
        const errors = validateInventoryItem(data, {
            excludeId: id,
        });

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const item = inventoryItemRepository.update(id, {
            ...buildInventoryItem(data),
            updatedAt: new Date().toISOString(),
        });

        return { item };
    },

    remove(id) {
        return inventoryItemRepository.remove(id);
    },
};
