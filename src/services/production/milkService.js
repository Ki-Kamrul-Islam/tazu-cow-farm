import { milkRepository } from "../../repositories/production/milkRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";
import { getTodayDateString } from "../../utils/date.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.animalId) errors.animalId = "milk.validation.animalRequired";

    if (!data.date) {
        errors.date = "milk.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "milk.validation.dateFuture";
    }

    if (!data.session) errors.session = "milk.validation.sessionRequired";

    if (!data.quantity || Number(data.quantity) <= 0) {
        errors.quantity = "milk.validation.quantityPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        animalId: data.animalId,
        date: data.date,
        session: data.session,
        quantity: Number(data.quantity),
        notes: data.notes?.trim() || "",
    };
}

export const milkService = {
    list({ animalId = "", date = "" } = {}) {
        const animals = animalRepository.getAll();
        let records = milkRepository.getAll();

        if (animalId) records = records.filter((r) => r.animalId === animalId);
        if (date) records = records.filter((r) => r.date === date);

        return [...records]
            .sort((a, b) => {
                const dateDiff = new Date(b.date) - new Date(a.date);
                if (dateDiff !== 0) return dateDiff;
                return a.session === "morning" ? -1 : 1;
            })
            .map((record) => ({
                ...record,
                animal: animals.find((a) => a.id === record.animalId) ?? null,
            }));
    },

    getById(id) {
        return milkRepository.getById(id);
    },

    getActiveAnimals() {
        return animalRepository.getAll().filter((a) => a.status === "active");
    },

    getTodayTotal() {
        const today = getTodayDateString();
        return milkRepository
            .getAll()
            .filter((r) => r.date === today)
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

        milkRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = milkRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return milkRepository.remove(id);
    },
};
