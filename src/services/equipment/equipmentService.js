import { equipmentRepository } from "../../repositories/equipment/equipmentRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateEquipment(data, { excludeId } = {}) {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = "equipmentItem.validation.nameRequired";
    } else {
        const isDuplicate = equipmentRepository
            .getAll()
            .some(
                (e) =>
                    e.name.trim().toLowerCase() ===
                        data.name.trim().toLowerCase() && e.id !== excludeId,
            );
        if (isDuplicate) errors.name = "equipmentItem.validation.nameDuplicate";
    }

    if (!data.type) errors.type = "equipmentItem.validation.typeRequired";

    if (!data.purchaseDate) {
        errors.purchaseDate = "equipmentItem.validation.purchaseDateRequired";
    } else if (new Date(data.purchaseDate) > new Date()) {
        errors.purchaseDate = "equipmentItem.validation.purchaseDateFuture";
    }

    if (data.purchaseCost !== "" && Number(data.purchaseCost) < 0) {
        errors.purchaseCost = "equipmentItem.validation.costNonNegative";
    }

    return errors;
}

function buildEquipment(data) {
    return {
        name: data.name.trim(),
        type: data.type,
        purchaseDate: data.purchaseDate,
        purchaseCost: Number(data.purchaseCost || 0),
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const equipmentService = {
    list({ search = "", status = "" } = {}) {
        let items = equipmentRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            items = items.filter((e) => e.name?.toLowerCase().includes(q));
        }
        if (status) items = items.filter((e) => e.status === status);

        return [...items].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    listActive() {
        return equipmentRepository
            .getAll()
            .filter((e) => e.status !== "retired");
    },

    count() {
        return equipmentRepository.getAll().length;
    },

    getById(id) {
        return equipmentRepository.getById(id);
    },

    create(data) {
        const errors = validateEquipment(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const equipment = {
            id: generateId(),
            ...buildEquipment(data),
            createdAt: now,
            updatedAt: now,
        };

        equipmentRepository.create(equipment);
        return { equipment };
    },

    update(id, data) {
        const errors = validateEquipment(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const equipment = equipmentRepository.update(id, {
            ...buildEquipment(data),
            updatedAt: new Date().toISOString(),
        });

        return { equipment };
    },

    remove(id) {
        return equipmentRepository.remove(id);
    },
};
