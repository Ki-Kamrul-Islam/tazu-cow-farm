import { expenseRepository } from "../../repositories/finance/expenseRepository.js";
import { getTodayDateString } from "../../utils/date.js";

function generateId() {
    return crypto.randomUUID();
}

function validateRecord(data) {
    const errors = {};

    if (!data.category) errors.category = "expense.validation.categoryRequired";

    if (!data.date) {
        errors.date = "expense.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "expense.validation.dateFuture";
    }

    if (!data.amount || Number(data.amount) <= 0) {
        errors.amount = "expense.validation.amountPositive";
    }

    return errors;
}

function buildRecord(data) {
    return {
        category: data.category,
        date: data.date,
        amount: Number(data.amount),
        paymentMethod: data.paymentMethod || "cash",
        notes: data.notes?.trim() || "",
    };
}

export const expenseService = {
    list({ category = "", date = "" } = {}) {
        let records = expenseRepository.getAll();

        if (category) records = records.filter((r) => r.category === category);
        if (date) records = records.filter((r) => r.date === date);

        return [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getById(id) {
        return expenseRepository.getById(id);
    },

    getTodayTotal() {
        const today = getTodayDateString();
        return expenseRepository
            .getAll()
            .filter((r) => r.date === today)
            .reduce((sum, r) => sum + Number(r.amount || 0), 0);
    },

    getTotal() {
        return expenseRepository
            .getAll()
            .reduce((sum, r) => sum + Number(r.amount || 0), 0);
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

        expenseRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateRecord(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = expenseRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return expenseRepository.remove(id);
    },
};
