import { feedTypeRepository } from "../../repositories/feed/feedTypeRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateFeedType(data, { excludeId } = {}) {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = "feedType.validation.nameRequired";
    } else {
        const isDuplicate = feedTypeRepository
            .getAll()
            .some(
                (f) =>
                    f.name.trim().toLowerCase() ===
                        data.name.trim().toLowerCase() && f.id !== excludeId,
            );
        if (isDuplicate) errors.name = "feedType.validation.nameDuplicate";
    }

    if (!data.category)
        errors.category = "feedType.validation.categoryRequired";
    if (!data.unit) errors.unit = "feedType.validation.unitRequired";

    if (!data.pricePerUnit || Number(data.pricePerUnit) <= 0) {
        errors.pricePerUnit = "feedType.validation.pricePositive";
    }

    return errors;
}

function buildFeedType(data) {
    return {
        name: data.name.trim(),
        category: data.category,
        unit: data.unit,
        pricePerUnit: Number(data.pricePerUnit),
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const feedTypeService = {
    list({ search = "", status = "" } = {}) {
        let items = feedTypeRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            items = items.filter((f) => f.name?.toLowerCase().includes(q));
        }

        if (status) items = items.filter((f) => f.status === status);

        return [...items].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    listActive() {
        return feedTypeRepository.getAll().filter((f) => f.status === "active");
    },

    count() {
        return feedTypeRepository.getAll().length;
    },

    getById(id) {
        return feedTypeRepository.getById(id);
    },

    create(data) {
        const errors = validateFeedType(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const feedType = {
            id: generateId(),
            ...buildFeedType(data),
            createdAt: now,
            updatedAt: now,
        };

        feedTypeRepository.create(feedType);
        return { feedType };
    },

    update(id, data) {
        const errors = validateFeedType(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const feedType = feedTypeRepository.update(id, {
            ...buildFeedType(data),
            updatedAt: new Date().toISOString(),
        });

        return { feedType };
    },

    remove(id) {
        return feedTypeRepository.remove(id);
    },
};
