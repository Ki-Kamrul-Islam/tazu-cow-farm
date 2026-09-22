import { healthRepository } from "../../repositories/herd/healthRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.animalId) errors.animalId = "health.validation.animalRequired";
    if (!data.type) errors.type = "health.validation.typeRequired";

    if (!data.date) {
        errors.date = "health.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "health.validation.dateFuture";
    }

    if (data.cost !== "" && data.cost !== undefined && Number(data.cost) < 0) {
        errors.cost = "health.validation.costPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        animalId: data.animalId,
        type: data.type,
        date: data.date,
        diseaseOrReason: data.diseaseOrReason?.trim() || "",
        medicine: data.medicine?.trim() || "",
        dosage: data.dosage?.trim() || "",
        vetName: data.vetName?.trim() || "",
        cost: data.cost ? Number(data.cost) : 0,
        nextDueDate: data.nextDueDate || "",
        notes: data.notes?.trim() || "",
    };
}

export const healthService = {
    list({ type = "" } = {}) {
        const animals = animalRepository.getAll();
        let records = healthRepository.getAll();

        if (type) records = records.filter((r) => r.type === type);

        return [...records]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record) => ({
                ...record,
                animal: animals.find((a) => a.id === record.animalId) ?? null,
            }));
    },

    getById(id) {
        return healthRepository.getById(id);
    },

    getActiveAnimals() {
        return animalRepository.getAll().filter((a) => a.status === "active");
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

        healthRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = healthRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return healthRepository.remove(id);
    },
};
