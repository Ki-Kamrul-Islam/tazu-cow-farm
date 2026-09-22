import { weightRepository } from "../../repositories/herd/weightRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.animalId) errors.animalId = "weight.validation.animalRequired";

    if (!data.date) {
        errors.date = "weight.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "weight.validation.dateFuture";
    }

    if (!data.weight || Number(data.weight) <= 0) {
        errors.weight = "weight.validation.weightPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        animalId: data.animalId,
        date: data.date,
        weight: Number(data.weight),
        notes: data.notes?.trim() || "",
    };
}

export const weightService = {
    list({ animalId = "" } = {}) {
        const animals = animalRepository.getAll();
        let records = weightRepository.getAll();

        if (animalId) records = records.filter((r) => r.animalId === animalId);

        return [...records]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record) => ({
                ...record,
                animal: animals.find((a) => a.id === record.animalId) ?? null,
            }));
    },

    getById(id) {
        return weightRepository.getById(id);
    },

    getActiveAnimals() {
        return animalRepository.getAll().filter((a) => a.status === "active");
    },

    calculateADG(animalId) {
        const records = weightRepository
            .getByAnimalId(animalId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (records.length < 2) return null;

        const first = records[0];
        const last = records[records.length - 1];
        const days =
            (new Date(last.date) - new Date(first.date)) /
            (1000 * 60 * 60 * 24);

        if (days <= 0) return null;

        return (last.weight - first.weight) / days;
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

        weightRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = weightRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return weightRepository.remove(id);
    },
};
