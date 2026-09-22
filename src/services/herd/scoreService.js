import { scoreRepository } from "../../repositories/herd/scoreRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function calculateOverallScore(record) {
    const scores = [
        record.bodyConditionScore,
        record.udderScore,
        record.mobilityScore,
    ]
        .filter((s) => s !== null && s !== undefined && s !== "")
        .map(Number);

    if (scores.length === 0) return null;

    const sum = scores.reduce((total, s) => total + s, 0);
    return Math.round((sum / scores.length) * 10) / 10;
}

function validateRecord(data) {
    const errors = {};

    if (!data.animalId) errors.animalId = "scoring.validation.animalRequired";

    if (!data.date) {
        errors.date = "scoring.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "scoring.validation.dateFuture";
    }

    const hasAnyScore =
        data.bodyConditionScore || data.udderScore || data.mobilityScore;
    if (!hasAnyScore) {
        errors.bodyConditionScore = "scoring.validation.atLeastOneScore";
    }

    return errors;
}

function buildRecord(data) {
    return {
        animalId: data.animalId,
        date: data.date,
        bodyConditionScore:
            data.bodyConditionScore ? Number(data.bodyConditionScore) : null,
        udderScore: data.udderScore ? Number(data.udderScore) : null,
        mobilityScore: data.mobilityScore ? Number(data.mobilityScore) : null,
        notes: data.notes?.trim() || "",
    };
}

export const scoreService = {
    list({ animalId = "" } = {}) {
        const animals = animalRepository.getAll();
        let records = scoreRepository.getAll();

        if (animalId) records = records.filter((r) => r.animalId === animalId);

        return [...records]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record) => ({
                ...record,
                overallScore: calculateOverallScore(record),
                animal: animals.find((a) => a.id === record.animalId) ?? null,
            }));
    },

    getById(id) {
        return scoreRepository.getById(id);
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

        scoreRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = scoreRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return scoreRepository.remove(id);
    },
};
