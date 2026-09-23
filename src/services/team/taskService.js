import { taskRepository } from "../../repositories/team/taskRepository.js";
import { employeeRepository } from "../../repositories/team/employeeRepository.js";

function generateId() {
    return crypto.randomUUID();
}

function validateTask(data) {
    const errors = {};

    if (!data.title?.trim()) errors.title = "task.validation.titleRequired";
    if (!data.assignedTo)
        errors.assignedTo = "task.validation.assignedToRequired";
    if (!data.dueDate) errors.dueDate = "task.validation.dueDateRequired";
    if (!data.priority) errors.priority = "task.validation.priorityRequired";

    return errors;
}

function buildTask(data) {
    return {
        title: data.title.trim(),
        description: data.description?.trim() || "",
        assignedTo: data.assignedTo,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status || "pending",
    };
}

export const taskService = {
    list({ assignedTo = "", status = "", priority = "" } = {}) {
        const employees = employeeRepository.getAll();
        let tasks = taskRepository.getAll();

        if (assignedTo)
            tasks = tasks.filter((t) => t.assignedTo === assignedTo);
        if (status) tasks = tasks.filter((t) => t.status === status);
        if (priority) tasks = tasks.filter((t) => t.priority === priority);

        return [...tasks]
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((task) => ({
                ...task,
                employee:
                    employees.find((e) => e.id === task.assignedTo) ?? null,
            }));
    },

    getById(id) {
        return taskRepository.getById(id);
    },

    count() {
        return taskRepository.getAll().length;
    },

    toggleComplete(id) {
        const task = taskRepository.getById(id);
        if (!task) return null;

        return taskRepository.update(id, {
            status: task.status === "completed" ? "pending" : "completed",
            updatedAt: new Date().toISOString(),
        });
    },

    create(data) {
        const errors = validateTask(data);
        if (Object.keys(errors).length > 0) return { errors };

        const now = new Date().toISOString();
        const task = {
            id: generateId(),
            ...buildTask(data),
            createdAt: now,
            updatedAt: now,
        };

        taskRepository.create(task);
        return { task };
    },

    update(id, data) {
        const errors = validateTask(data);
        if (Object.keys(errors).length > 0) return { errors };

        const task = taskRepository.update(id, {
            ...buildTask(data),
            updatedAt: new Date().toISOString(),
        });

        return { task };
    },

    remove(id) {
        return taskRepository.remove(id);
    },
};
