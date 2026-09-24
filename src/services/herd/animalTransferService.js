import { animalTransferRepository } from "../../repositories/herd/animalTransferRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateTransfer(data) {
    const errors = {};
    if (!data.animalId) errors.animalId = "transfer.validation.animalRequired";
    if (!data.toGroup) errors.toGroup = "transfer.validation.toGroupRequired";

    if (!data.date) {
        errors.date = "transfer.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "transfer.validation.dateFuture";
    }

    return errors;
}

export const animalTransferService = {
    list() {
        const transfers = animalTransferRepository.getAll();
        const animals = animalRepository.getAll();
        return [...transfers]
            .map((t) => ({
                ...t,
                animalName:
                    animals.find((a) => a.id === t.animalId)?.name ?? "-",
                animalCode:
                    animals.find((a) => a.id === t.animalId)?.animalId ?? "-",
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    create(data) {
        const errors = validateTransfer(data);
        if (Object.keys(errors).length > 0) return { errors };

        const animal = animalRepository.getById(data.animalId);
        const fromGroup = animal?.group || "";

        const transfer = {
            id: generateId(),
            animalId: data.animalId,
            fromGroup,
            toGroup: data.toGroup,
            date: data.date,
            reason: data.reason?.trim() || "",
            createdAt: new Date().toISOString(),
        };

        animalTransferRepository.create(transfer);

        // animal-এর বর্তমান group আপডেট করা হচ্ছে যাতে Animal তালিকায় নতুন group দেখা যায়
        if (animal) {
            animalRepository.update(data.animalId, {
                group: data.toGroup,
                updatedAt: new Date().toISOString(),
            });
        }

        return { transfer };
    },

    remove(id) {
        return animalTransferRepository.remove(id);
    },
};
