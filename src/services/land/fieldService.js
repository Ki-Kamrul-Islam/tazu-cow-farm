import { fieldRepository } from "../../repositories/land/fieldRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateField(data, { excludeId } = {}) {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = "field.validation.nameRequired";
    } else {
        const isDuplicate = fieldRepository
            .getAll()
            .some(
                (f) =>
                    f.name.trim().toLowerCase() ===
                        data.name.trim().toLowerCase() && f.id !== excludeId,
            );
        if (isDuplicate) errors.name = "field.validation.nameDuplicate";
    }

    if (!data.area || Number(data.area) <= 0) {
        errors.area = "field.validation.areaPositive";
    }
    if (!data.areaUnit) errors.areaUnit = "field.validation.areaUnitRequired";
    if (!data.soilType) errors.soilType = "field.validation.soilTypeRequired";

    return errors;
}

function buildField(data) {
    return {
        name: data.name.trim(),
        area: Number(data.area),
        areaUnit: data.areaUnit,
        soilType: data.soilType,
        waterSource: data.waterSource || "",
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const fieldService = {
    list({ search = "", status = "" } = {}) {
        let items = fieldRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            items = items.filter((f) => f.name?.toLowerCase().includes(q));
        }
        if (status) items = items.filter((f) => f.status === status);

        return [...items].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    listActive() {
        return fieldRepository.getAll().filter((f) => f.status === "active");
    },

    count() {
        return fieldRepository.getAll().length;
    },

    getById(id) {
        return fieldRepository.getById(id);
    },

    create(data) {
        const errors = validateField(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const field = {
            id: generateId(),
            ...buildField(data),
            createdAt: now,
            updatedAt: now,
        };

        fieldRepository.create(field);
        return { field };
    },

    update(id, data) {
        const errors = validateField(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const field = fieldRepository.update(id, {
            ...buildField(data),
            updatedAt: new Date().toISOString(),
        });

        return { field };
    },

    remove(id) {
        return fieldRepository.remove(id);
    },
};
