import { animalRepository } from "../../repositories/herd/animalRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateAnimal(data, { excludeId } = {}) {
    const errors = {};

    if (!data.animalId?.trim()) {
        errors.animalId = "herd.validation.animalIdRequired";
    } else {
        const isDuplicate = animalRepository
            .getAll()
            .some(
                (a) =>
                    a.animalId === data.animalId.trim() && a.id !== excludeId,
            );
        if (isDuplicate) errors.animalId = "herd.validation.animalIdDuplicate";
    }

    if (!data.name?.trim()) errors.name = "herd.validation.nameRequired";
    if (!data.type) errors.type = "herd.validation.typeRequired";
    if (!data.gender) errors.gender = "herd.validation.genderRequired";

    if (data.dateOfBirth) {
        const dob = new Date(data.dateOfBirth);
        if (Number.isNaN(dob.getTime())) {
            errors.dateOfBirth = "herd.validation.dateInvalid";
        } else if (dob > new Date()) {
            errors.dateOfBirth = "herd.validation.dateFuture";
        }
    }

    if (
        data.weight !== "" &&
        data.weight !== undefined &&
        Number(data.weight) <= 0
    ) {
        errors.weight = "herd.validation.weightPositive";
    }

    return errors;
}

function buildAnimalRecord(data) {
    return {
        animalId: data.animalId.trim(),
        name: data.name.trim(),
        type: data.type,
        gender: data.gender,
        breed: data.breed?.trim() || "",
        dateOfBirth: data.dateOfBirth || "",
        weight: data.weight ? Number(data.weight) : null,
        group: data.group?.trim() || "",
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const animalService = {
    list({ search = "", type = "", status = "" } = {}) {
        let animals = animalRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            animals = animals.filter(
                (a) =>
                    a.animalId?.toLowerCase().includes(q) ||
                    a.name?.toLowerCase().includes(q) ||
                    a.breed?.toLowerCase().includes(q),
            );
        }

        if (type) animals = animals.filter((a) => a.type === type);
        if (status) animals = animals.filter((a) => a.status === status);

        return [...animals].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    count() {
        return animalRepository.getAll().length;
    },

    getById(id) {
        return animalRepository.getById(id);
    },

    create(data) {
        const errors = validateAnimal(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const animal = {
            id: generateId(),
            ...buildAnimalRecord(data),
            createdAt: now,
            updatedAt: now,
        };

        animalRepository.create(animal);
        return { animal };
    },

    update(id, data) {
        const errors = validateAnimal(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const animal = animalRepository.update(id, {
            ...buildAnimalRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { animal };
    },

    remove(id) {
        return animalRepository.remove(id);
    },
};
