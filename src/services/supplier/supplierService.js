import { supplierRepository } from "../../repositories/supplier/supplierRepository.js";

function generateId() {
    return `supplier_${crypto.randomUUID()}`;
}

function now() {
    return new Date().toISOString();
}

function normalize(value) {
    return String(value ?? "").trim();
}

function validate(data) {
    const errors = {};

    if (!normalize(data.name)) {
        errors.name = "supplier.validation.nameRequired";
    }

    if (!normalize(data.phone)) {
        errors.phone = "supplier.validation.phoneRequired";
    }

    return errors;
}

function hasDuplicateName(suppliers, name, excludeId = null) {
    return suppliers.some(
        (supplier) =>
            supplier.id !== excludeId &&
            supplier.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
}

export const supplierService = {
    list() {
        return supplierRepository.getAll();
    },

    getById(id) {
        return supplierRepository.getById(id);
    },

    create(data) {
        const errors = validate(data);

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const suppliers = supplierRepository.getAll();

        if (hasDuplicateName(suppliers, data.name)) {
            return {
                errors: {
                    name: "supplier.validation.duplicateName",
                },
            };
        }

        const timestamp = now();

        const supplier = {
            id: generateId(),
            name: normalize(data.name),
            phone: normalize(data.phone),
            email: normalize(data.email),
            address: normalize(data.address),
            contactPerson: normalize(data.contactPerson),
            status: "active",
            notes: normalize(data.notes),
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        supplierRepository.saveAll([...suppliers, supplier]);

        return {
            supplier,
        };
    },

    update(id, data) {
        const errors = validate(data);

        if (Object.keys(errors).length > 0) {
            return { errors };
        }

        const suppliers = supplierRepository.getAll();

        const existing = suppliers.find((supplier) => supplier.id === id);

        if (!existing) {
            return {
                errors: {
                    form: "supplier.validation.notFound",
                },
            };
        }

        if (hasDuplicateName(suppliers, data.name, id)) {
            return {
                errors: {
                    name: "supplier.validation.duplicateName",
                },
            };
        }

        const updatedSupplier = {
            ...existing,
            name: normalize(data.name),
            phone: normalize(data.phone),
            email: normalize(data.email),
            address: normalize(data.address),
            contactPerson: normalize(data.contactPerson),
            notes: normalize(data.notes),
            updatedAt: now(),
        };

        const updated = suppliers.map((supplier) =>
            supplier.id === id ? updatedSupplier : supplier,
        );

        supplierRepository.saveAll(updated);

        return {
            supplier: updatedSupplier,
        };
    },

    toggleStatus(id) {
        const suppliers = supplierRepository.getAll();

        const updated = suppliers.map((supplier) =>
            supplier.id === id ?
                {
                    ...supplier,
                    status:
                        supplier.status === "active" ? "inactive" : "active",
                    updatedAt: now(),
                }
            :   supplier,
        );

        supplierRepository.saveAll(updated);

        return updated.find((supplier) => supplier.id === id);
    },

    remove(id) {
        const suppliers = supplierRepository.getAll();

        const filtered = suppliers.filter((supplier) => supplier.id !== id);

        supplierRepository.saveAll(filtered);

        return true;
    },
};
