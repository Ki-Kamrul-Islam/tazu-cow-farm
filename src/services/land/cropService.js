import { cropRecordRepository } from "../../repositories/land/cropRecordRepository.js";
import { fieldRepository } from "../../repositories/land/fieldRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.fieldId) errors.fieldId = "crop.validation.fieldRequired";
    if (!data.cropType) errors.cropType = "crop.validation.cropTypeRequired";

    if (!data.plantingDate) {
        errors.plantingDate = "crop.validation.plantingDateRequired";
    } else if (new Date(data.plantingDate) > new Date()) {
        errors.plantingDate = "crop.validation.plantingDateFuture";
    }

    if (
        data.harvestDate &&
        data.plantingDate &&
        new Date(data.harvestDate) < new Date(data.plantingDate)
    ) {
        errors.harvestDate = "crop.validation.harvestBeforePlanting";
    }

    if (data.cost === "" || Number(data.cost) < 0) {
        errors.cost = "crop.validation.costNonNegative";
    }

    if (data.yieldQuantity && Number(data.yieldQuantity) <= 0) {
        errors.yieldQuantity = "crop.validation.yieldPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        fieldId: data.fieldId,
        cropType: data.cropType,
        plantingDate: data.plantingDate,
        harvestDate: data.harvestDate || "",
        yieldQuantity: data.yieldQuantity ? Number(data.yieldQuantity) : null,
        yieldUnit: data.yieldUnit || "kg",
        cost: Number(data.cost || 0),
        notes: data.notes?.trim() || "",
    };
}

export const cropService = {
    list({ fieldId = "", cropType = "" } = {}) {
        const fields = fieldRepository.getAll();
        let records = cropRecordRepository.getAll();

        if (fieldId) records = records.filter((r) => r.fieldId === fieldId);
        if (cropType) records = records.filter((r) => r.cropType === cropType);

        return [...records]
            .sort((a, b) => new Date(b.plantingDate) - new Date(a.plantingDate))
            .map((record) => ({
                ...record,
                field: fields.find((f) => f.id === record.fieldId) ?? null,
                status: record.harvestDate ? "harvested" : "growing",
            }));
    },

    getById(id) {
        return cropRecordRepository.getById(id);
    },

    getTotalCost() {
        return cropRecordRepository
            .getAll()
            .reduce((sum, r) => sum + Number(r.cost || 0), 0);
    },

    getGrowingCount() {
        return cropRecordRepository.getAll().filter((r) => !r.harvestDate)
            .length;
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

        cropRecordRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = cropRecordRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return cropRecordRepository.remove(id);
    },
};
