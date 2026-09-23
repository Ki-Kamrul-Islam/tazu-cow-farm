import { employeeRepository } from "../../repositories/team/employeeRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateEmployee(data, { excludeId } = {}) {
    const errors = {};

    if (!data.name?.trim()) {
        errors.name = "employee.validation.nameRequired";
    }

    if (!data.phone?.trim()) {
        errors.phone = "employee.validation.phoneRequired";
    } else {
        const isDuplicate = employeeRepository
            .getAll()
            .some(
                (e) =>
                    e.phone.trim() === data.phone.trim() && e.id !== excludeId,
            );
        if (isDuplicate) errors.phone = "employee.validation.phoneDuplicate";
    }

    if (!data.role) errors.role = "employee.validation.roleRequired";

    if (!data.joinDate) {
        errors.joinDate = "employee.validation.joinDateRequired";
    } else if (new Date(data.joinDate) > new Date()) {
        errors.joinDate = "employee.validation.joinDateFuture";
    }

    if (data.salary !== "" && Number(data.salary) < 0) {
        errors.salary = "employee.validation.salaryNonNegative";
    }

    return errors;
}

function buildEmployee(data) {
    return {
        name: data.name.trim(),
        phone: data.phone.trim(),
        role: data.role,
        salary: Number(data.salary || 0),
        joinDate: data.joinDate,
        status: data.status || "active",
        notes: data.notes?.trim() || "",
    };
}

export const employeeService = {
    list({ search = "", status = "" } = {}) {
        let items = employeeRepository.getAll();

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            items = items.filter(
                (e) =>
                    e.name?.toLowerCase().includes(q) || e.phone?.includes(q),
            );
        }
        if (status) items = items.filter((e) => e.status === status);

        return [...items].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    },

    listActive() {
        return employeeRepository.getAll().filter((e) => e.status === "active");
    },

    count() {
        return employeeRepository.getAll().length;
    },

    getById(id) {
        return employeeRepository.getById(id);
    },

    create(data) {
        const errors = validateEmployee(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const employee = {
            id: generateId(),
            ...buildEmployee(data),
            createdAt: now,
            updatedAt: now,
        };

        employeeRepository.create(employee);
        return { employee };
    },

    update(id, data) {
        const errors = validateEmployee(data, { excludeId: id });
        if (Object.keys(errors).length > 0) return { errors };

        const employee = employeeRepository.update(id, {
            ...buildEmployee(data),
            updatedAt: new Date().toISOString(),
        });

        return { employee };
    },

    remove(id) {
        return employeeRepository.remove(id);
    },
};
