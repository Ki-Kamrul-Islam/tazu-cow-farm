import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const animalGroupRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.ANIMAL_GROUPS, []);
    },
    getById(id) {
        return this.getAll().find((g) => g.id === id) ?? null;
    },
    create(group) {
        const groups = this.getAll();
        storage.set(STORAGE_KEYS.ANIMAL_GROUPS, [...groups, group]);
        return group;
    },
    update(id, updates) {
        const groups = this.getAll();
        const next = groups.map((g) =>
            g.id === id ? { ...g, ...updates } : g,
        );
        storage.set(STORAGE_KEYS.ANIMAL_GROUPS, next);
        return next.find((g) => g.id === id) ?? null;
    },
    remove(id) {
        const groups = this.getAll();
        storage.set(
            STORAGE_KEYS.ANIMAL_GROUPS,
            groups.filter((g) => g.id !== id),
        );
        return true;
    },
};
