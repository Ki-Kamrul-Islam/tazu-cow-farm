import { breedingRepository } from "../../repositories/herd/breedingRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";
import { addDays } from "../../utils/date.js";
import { GESTATION_DAYS } from "../../constants/breeding.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.animalId) errors.animalId = "breeding.validation.animalRequired";

    if (!data.breedingDate) {
        errors.breedingDate = "breeding.validation.breedingDateRequired";
    } else if (new Date(data.breedingDate) > new Date()) {
        errors.breedingDate = "breeding.validation.dateFuture";
    }

    if (!data.method) errors.method = "breeding.validation.methodRequired";

    if (data.status === "calved" && !data.actualCalvingDate) {
        errors.actualCalvingDate = "breeding.validation.calvingDateRequired";
    }

    return errors;
}

function buildRecord(data) {
    return {
        animalId: data.animalId,
        breedingDate: data.breedingDate,
        method: data.method,
        sireInfo: data.sireInfo?.trim() || "",
        status: data.status || "bred",
        pregnancyDiagnosisDate: data.pregnancyDiagnosisDate || "",
        expectedCalvingDate:
            data.expectedCalvingDate ||
            addDays(data.breedingDate, GESTATION_DAYS),
        actualCalvingDate: data.actualCalvingDate || "",
        notes: data.notes?.trim() || "",
    };
}

export const breedingService = {
    list({ status = "" } = {}) {
        const animals = animalRepository.getAll();
        let records = breedingRepository.getAll();

        if (status) records = records.filter((r) => r.status === status);

        return [...records]
            .sort((a, b) => new Date(b.breedingDate) - new Date(a.breedingDate))
            .map((record) => ({
                ...record,
                animal: animals.find((a) => a.id === record.animalId) ?? null,
            }));
    },

    getById(id) {
        return breedingRepository.getById(id);
    },

    getBreedableAnimals() {
        return animalRepository
            .getAll()
            .filter(
                (a) =>
                    a.gender === "female" &&
                    a.status === "active" &&
                    (a.type === "cow" || a.type === "heifer"),
            );
    },

    suggestExpectedCalvingDate(breedingDate) {
        return addDays(breedingDate, GESTATION_DAYS);
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

        breedingRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = breedingRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return breedingRepository.remove(id);
    },
};
