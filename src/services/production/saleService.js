import { saleRepository } from "../../repositories/production/saleRepository.js";
import { customerRepository } from "../../repositories/production/customerRepository.js";
import { getTodayDateString } from "../../utils/date.js";

function generateId() {
    return crypto.randomUUID();
}

function computeTotals(data) {
    const quantity = Number(data.quantity) || 0;
    const pricePerLiter = Number(data.pricePerLiter) || 0;
    const paidAmount = Number(data.paidAmount) || 0;
    const totalAmount = quantity * pricePerLiter;
    const dueAmount = Math.max(totalAmount - paidAmount, 0);

    let status = "due";
    if (totalAmount > 0 && paidAmount >= totalAmount) status = "paid";
    else if (paidAmount > 0) status = "partial";

    return { totalAmount, dueAmount, status };
}

function validateSale(data) {
    const errors = {};

    if (!data.customerId)
        errors.customerId = "sales.validation.customerRequired";

    if (!data.date) {
        errors.date = "sales.validation.dateRequired";
    } else if (new Date(data.date) > new Date()) {
        errors.date = "sales.validation.dateFuture";
    }

    if (!data.quantity || Number(data.quantity) <= 0) {
        errors.quantity = "sales.validation.quantityPositive";
    }

    if (!data.pricePerLiter || Number(data.pricePerLiter) <= 0) {
        errors.pricePerLiter = "sales.validation.pricePositive";
    }

    const { totalAmount } = computeTotals(data);
    if (Number(data.paidAmount) < 0) {
        errors.paidAmount = "sales.validation.paidNegative";
    } else if (Number(data.paidAmount) > totalAmount) {
        errors.paidAmount = "sales.validation.paidExceedsTotal";
    }

    return errors;
}

function buildRecord(data) {
    return {
        customerId: data.customerId,
        date: data.date,
        quantity: Number(data.quantity),
        pricePerLiter: Number(data.pricePerLiter),
        paidAmount: Number(data.paidAmount) || 0,
        notes: data.notes?.trim() || "",
    };
}

export const saleService = {
    list({ customerId = "", date = "" } = {}) {
        const customers = customerRepository.getAll();
        let sales = saleRepository.getAll();

        if (customerId)
            sales = sales.filter((s) => s.customerId === customerId);
        if (date) sales = sales.filter((s) => s.date === date);

        return [...sales]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((sale) => ({
                ...sale,
                ...computeTotals(sale),
                customer:
                    customers.find((c) => c.id === sale.customerId) ?? null,
            }));
    },

    getById(id) {
        return saleRepository.getById(id);
    },

    getCustomers() {
        return customerRepository.getAll().filter((c) => c.status === "active");
    },

    getTodayRevenue() {
        const today = getTodayDateString();
        return saleRepository
            .getAll()
            .filter((s) => s.date === today)
            .reduce((sum, s) => sum + computeTotals(s).totalAmount, 0);
    },

    getTotalDue() {
        return saleRepository
            .getAll()
            .reduce((sum, s) => sum + computeTotals(s).dueAmount, 0);
    },

    create(data) {
        const errors = validateSale(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const record = {
            id: generateId(),
            ...buildRecord(data),
            createdAt: now,
            updatedAt: now,
        };

        saleRepository.create(record);
        return { record };
    },

    update(id, data) {
        const errors = validateSale(data);
        if (Object.keys(errors).length > 0) return { errors };

        const record = saleRepository.update(id, {
            ...buildRecord(data),
            updatedAt: new Date().toISOString(),
        });

        return { record };
    },

    remove(id) {
        return saleRepository.remove(id);
    },
};
