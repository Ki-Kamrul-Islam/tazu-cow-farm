import { maintenanceRepository } from "../../repositories/equipment/maintenanceRepository.js";
import { equipmentRepository } from "../../repositories/equipment/equipmentRepository.js";
import { getTodayDateString } from "../../utils/date.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.equipmentId)
        errors.equipmentId = "maintenance.validation.equipmentRequired";
    if (!data.type) errors.type = "maintenance.validation.typeRequired";

    if (!data.date) {
        errors.date = "maintenance.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "maintenance.validation.dateFuture";
    }

    if (!data.cost || Number(data.cost) < 0) {
        errors.cost = "maintenance.validation.costNonNegative";
    }

    return errors;
}

function buildRecord(data) {
    return {
        equipmentId: data.equipmentId,
        type: data.type,
        date: data.date,
        cost: Number(data.cost || 0),
        notes: data.notes?.trim() || "",
    };
}

export const maintenanceService = {
    list({ equipmentId = "", type = "" } = {}) {
        const equipments = equipmentRepository.getAll();
        let records = maintenanceRepository.getAll();

        if (equipmentId)
            records = records.filter((r) => r.equipmentId === equipmentId);
        if (type) records = records.filter((r) => r.type === type);

        return [...records]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record) => ({
                ...record,
                equipment:
                    equipments.find((e) => e.id === record.equipmentId) ?? null,
            }));
    },

    getById(id) {
        return maintenanceRepository.getById(id);
    },

    getTodayCost() {
        const today = getTodayDateString();
        return maintenanceRepository
            .getAll()
            .filter((r) => r.date === today)
            .reduce((sum, r) => sum + Number(r.cost || 0), 0);
    },

    getTotalCost() {
        return maintenanceRepository
            .getAll()
            .reduce((sum, r) => sum + Number(r.cost || 0), 0);
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

        maintenanceRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = maintenanceRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return maintenanceRepository.remove(id);
    },
};
