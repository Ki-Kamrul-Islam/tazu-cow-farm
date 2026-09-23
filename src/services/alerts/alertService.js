import { dashboardRepository } from "../../repositories/dashboard/dashboardRepository.js";
import { animalRepository } from "../../repositories/herd/animalRepository.js";
import { taskRepository } from "../../repositories/team/taskRepository.js";
import { employeeRepository } from "../../repositories/team/employeeRepository.js";
import { isWithinNextDays, getTodayDateString } from "../../utils/date.js";

function isOverdue(dateString) {
    if (!dateString) return false;
    return dateString < getTodayDateString();
}

function severityFor(dateString) {
    return isOverdue(dateString) ? "overdue" : "upcoming";
}

function collectEvents() {
    const events = [];
    const animals = animalRepository.getAll();
    const employees = employeeRepository.getAll();

    dashboardRepository.getHealthRecords().forEach((r) => {
        if (r.type === "vaccination" && r.nextDueDate) {
            events.push({
                id: `vaccination_${r.id}`,
                type: "vaccination",
                date: r.nextDueDate,
                severity: severityFor(r.nextDueDate),
                subject: animals.find((a) => a.id === r.animalId)?.name ?? "-",
            });
        }
    });

    dashboardRepository.getBreedingRecords().forEach((r) => {
        if (r.status === "pregnant" && r.expectedCalvingDate) {
            events.push({
                id: `calving_${r.id}`,
                type: "calving",
                date: r.expectedCalvingDate,
                severity: severityFor(r.expectedCalvingDate),
                subject: animals.find((a) => a.id === r.animalId)?.name ?? "-",
            });
        }
    });

    taskRepository.getAll().forEach((t) => {
        if (t.status !== "completed" && t.dueDate) {
            events.push({
                id: `task_${t.id}`,
                type: "task",
                date: t.dueDate,
                severity: severityFor(t.dueDate),
                subject:
                    t.title +
                    (employees.find((e) => e.id === t.assignedTo) ?
                        ` (${employees.find((e) => e.id === t.assignedTo).name})`
                    :   ""),
            });
        }
    });

    return events;
}

export const alertService = {
    getAlerts(days = 7) {
        return collectEvents()
            .filter(
                (event) =>
                    isWithinNextDays(event.date, days) || isOverdue(event.date),
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    },

    getAllEvents() {
        return collectEvents();
    },
};
