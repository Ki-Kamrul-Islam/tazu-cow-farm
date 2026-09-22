import { customerRepository } from "../../repositories/production/customerRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateCustomer(data, { excludeId } = {}) {
    const errors = {};

    if (!data.name?.trim()) errors.name = "customers.validation.nameRequired";

    if (!data.phone?.trim()) {
        errors.phone = "customers.validation.phoneRequired";
    } else {
        const isDuplicate = customerRepository
            .getAll()
            .some((c) => c.phone === data.phone.trim() && c.id !== excludeId);
        if (isDuplicate) errors.phone = "customers.validation.phoneDuplicate";
    }

    return errors;
}

function buildCustomer(data) {
    return {
        name: data.name.trim(),
        phone: data.phone.trim(),
        address: data.address?.trim() || "",
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const customerService = {
    list({ search = "", status = "" } = {}) {
        let customers = customerRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            customers = customers.filter(
                (c) =>
                    c.name?.toLowerCase().includes(q) ||
                    c.phone?.toLowerCase().includes(q),
            );
        }

        if (status) customers = customers.filter((c) => c.status === status);

        return [...customers].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    count() {
        return customerRepository.getAll().length;
    },

    getById(id) {
        return customerRepository.getById(id);
    },

    create(data) {
        const errors = validateCustomer(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const customer = {
            id: generateId(),
            ...buildCustomer(data),
            createdAt: now,
            updatedAt: now,
        };

        customerRepository.create(customer);
        return { customer };
    },

    update(id, data) {
        const errors = validateCustomer(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const customer = customerRepository.update(id, {
            ...buildCustomer(data),
            updatedAt: new Date().toISOString(),
        });

        return { customer };
    },

    remove(id) {
        return customerRepository.remove(id);
    },
};
