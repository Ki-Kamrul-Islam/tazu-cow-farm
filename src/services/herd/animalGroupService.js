import { animalGroupRepository } from "../../repositories/herd/animalGroupRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateGroup(data, { excludeId } = {}) {
    const errors = {};
    if (!data.name?.trim()) {
        errors.name = "group.validation.nameRequired";
    } else {
        const isDuplicate = animalGroupRepository
            .getAll()
            .some(
                (g) =>
                    g.name.trim().toLowerCase() ===
                        data.name.trim().toLowerCase() && g.id !== excludeId,
            );
        if (isDuplicate) errors.name = "group.validation.nameDuplicate";
    }
    return errors;
}

export const animalGroupService = {
    list() {
        const groups = animalGroupRepository.getAll();
        const animals = animalRepository.getAll();
        return groups.map((g) => ({
            ...g,
            animalCount: animals.filter((a) => a.group === g.name).length,
        }));
    },

    getById(id) {
        return animalGroupRepository.getById(id);
    },

    create(data) {
        const errors = validateGroup(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const group = {
            id: generateId(),
            name: data.name.trim(),
            description: data.description?.trim() || "",
            createdAt: now,
            updatedAt: now,
        };
        animalGroupRepository.create(group);
        return { group };
    },

    update(id, data) {
        const errors = validateGroup(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const group = animalGroupRepository.update(id, {
            name: data.name.trim(),
            description: data.description?.trim() || "",
            updatedAt: new Date().toISOString(),
        });
        return { group };
    },

    remove(id) {
        return animalGroupRepository.remove(id);
    },
};
