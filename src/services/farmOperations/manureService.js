import { manureRepository } from "../../repositories/farmOperations/manureRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.type) errors.type = "manure.validation.typeRequired";

    if (!data.date) {
        errors.date = "manure.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "manure.validation.dateFuture";
    }

    if (!data.quantity || Number(data.quantity) <= 0) {
        errors.quantity = "manure.validation.quantityPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        type: data.type,
        date: data.date,
        quantity: Number(data.quantity || 0),
        notes: data.notes?.trim() || "",
    };
}

export const manureService = {
    list({ type = "" } = {}) {
        let records = manureRepository.getAll();
        if (type) records = records.filter((r) => r.type === type);
        return [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getById(id) {
        return manureRepository.getById(id);
    },

    getTotalQuantity() {
        return manureRepository
            .getAll()
            .reduce((sum, r) => sum + Number(r.quantity || 0), 0);
    },

    create(data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const record = {
            id: generateId(),
            ...buildRecord(data),
            createdAt: now,
            updatedAt: now,
        };

        manureRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = manureRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return manureRepository.remove(id);
    },
};
