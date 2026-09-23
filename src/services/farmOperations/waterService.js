import { waterRepository } from "../../repositories/farmOperations/waterRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.purpose) errors.purpose = "water.validation.purposeRequired";

    if (!data.date) {
        errors.date = "water.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "water.validation.dateFuture";
    }

    if (!data.quantity || Number(data.quantity) <= 0) {
        errors.quantity = "water.validation.quantityPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        purpose: data.purpose,
        date: data.date,
        quantity: Number(data.quantity || 0),
        cost: Number(data.cost || 0),
        notes: data.notes?.trim() || "",
    };
}

export const waterService = {
    list({ purpose = "" } = {}) {
        let records = waterRepository.getAll();
        if (purpose) records = records.filter((r) => r.purpose === purpose);
        return [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getById(id) {
        return waterRepository.getById(id);
    },

    getTotalQuantity() {
        return waterRepository
            .getAll()
            .reduce((sum, r) => sum + Number(r.quantity || 0), 0);
    },

    getTotalCost() {
        return waterRepository
            .getAll()
            .reduce((sum, r) => sum + Number(r.cost || 0), 0);
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

        waterRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = waterRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return waterRepository.remove(id);
    },
};
