import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const taskRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.TASKS, []);
    },
    getById(id) {
        return this.getAll().find((task) => task.id === id) ?? null;
    },
    create(task) {
        const tasks = this.getAll();
        storage.set(STORAGE_KEYS.TASKS, [...tasks, task]);
        return task;
    },
    update(id, updates) {
        const tasks = this.getAll();
        const next = tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task,
        );
        storage.set(STORAGE_KEYS.TASKS, next);
        return next.find((task) => task.id === id) ?? null;
    },
    remove(id) {
        const tasks = this.getAll();
        storage.set(
            STORAGE_KEYS.TASKS,
            tasks.filter((task) => task.id !== id),
        );
        return true;
    },
};
