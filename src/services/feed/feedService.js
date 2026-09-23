import { feedRecordRepository } from "../../repositories/feed/feedRecordRepository.js";
import { feedTypeRepository } from "../../repositories/feed/feedTypeRepository.js";
import { getTodayDateString } from "../../utils/date.js";

function generateId() {
    return crypto.randomUUID();
}

function calculateCost(record, feedTypes) {
    const feedType = feedTypes.find((f) => f.id === record.feedTypeId);
    if (!feedType) return 0;
    return Number(record.quantity || 0) * Number(feedType.pricePerUnit || 0);
}

function validateRecord(data) {
    const errors = {};

    if (!data.feedTypeId)
        errors.feedTypeId = "feeding.validation.feedTypeRequired";

    if (!data.date) {
        errors.date = "feeding.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "feeding.validation.dateFuture";
    }

    if (!data.quantity || Number(data.quantity) <= 0) {
        errors.quantity = "feeding.validation.quantityPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        feedTypeId: data.feedTypeId,
        date: data.date,
        group: data.group?.trim() || "",
        quantity: Number(data.quantity),
        notes: data.notes?.trim() || "",
    };
}

export const feedService = {
    list({ feedTypeId = "", date = "" } = {}) {
        const feedTypes = feedTypeRepository.getAll();
        let records = feedRecordRepository.getAll();

        if (feedTypeId)
            records = records.filter((r) => r.feedTypeId === feedTypeId);
        if (date) records = records.filter((r) => r.date === date);

        return [...records]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record) => ({
                ...record,
                feedType:
                    feedTypes.find((f) => f.id === record.feedTypeId) ?? null,
                cost: calculateCost(record, feedTypes),
            }));
    },

    getById(id) {
        return feedRecordRepository.getById(id);
    },

    getActiveFeedTypes() {
        return feedTypeRepository.getAll().filter((f) => f.status === "active");
    },

    getTodayCost() {
        const today = getTodayDateString();
        const feedTypes = feedTypeRepository.getAll();
        return feedRecordRepository
            .getAll()
            .filter((r) => r.date === today)
            .reduce((sum, r) => sum + calculateCost(r, feedTypes), 0);
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

        feedRecordRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = feedRecordRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return feedRecordRepository.remove(id);
    },
};
