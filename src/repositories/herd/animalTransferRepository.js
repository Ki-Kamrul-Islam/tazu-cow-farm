import { storage } from "../../storage/storage.js";
import { STORAGE_KEYS } from "../../storage/storageKeys.js";

export const animalTransferRepository = {
    getAll() {
        return storage.get(STORAGE_KEYS.ANIMAL_TRANSFERS, []);
    },
    getById(id) {
        return this.getAll().find((t) => t.id === id) ?? null;
    },
    create(transfer) {
        const transfers = this.getAll();
        storage.set(STORAGE_KEYS.ANIMAL_TRANSFERS, [...transfers, transfer]);
        return transfer;
    },
    remove(id) {
        const transfers = this.getAll();
        storage.set(
            STORAGE_KEYS.ANIMAL_TRANSFERS,
            transfers.filter((t) => t.id !== id),
        );
        return true;
    },
};
