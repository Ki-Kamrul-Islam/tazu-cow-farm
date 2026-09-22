import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const animalRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.ANIMALS, []);
    },

    getById(id) {
        return this.getAll().find((animal) => animal.id === id) ?? null;
    },

    create(animal) {
        const animals = this.getAll();
        storage.set(STORAGE_KEYS.ANIMALS, [...animals, animal]);
        return animal;
    },

    update(id, updates) {
        const animals = this.getAll();
        const next = animals.map((animal) =>
            animal.id === id ? { ...animal, ...updates } : animal,
        );
        storage.set(STORAGE_KEYS.ANIMALS, next);
        return next.find((animal) => animal.id === id) ?? null;
    },

    remove(id) {
        const animals = this.getAll();
        storage.set(
            STORAGE_KEYS.ANIMALS,
            animals.filter((animal) => animal.id !== id),
        );
        return true;
    },
};
