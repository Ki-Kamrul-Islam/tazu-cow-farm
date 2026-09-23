import { dashboardRepository } from "../../repositories/dashboard/dashboardRepository.js";
import { isToday, isThisMonth, isWithinNextDays } from "../../utils/date.js";

function calculateTotalCows(animals) {
    return animals.filter(
        (a) =>
            a.type === "cow" && a.status !== "deceased" && a.status !== "sold",
    ).length;
}

function calculateTotalCalves(animals) {
    return animals.filter(
        (a) =>
            a.type === "calf" && a.status !== "deceased" && a.status !== "sold",
    ).length;
}

function calculateMilkToday(milkRecords) {
    return milkRecords
        .filter((r) => isToday(r.date))
        .reduce((sum, r) => sum + Number(r.quantity || 0), 0);
}

function calculateMilkThisMonth(milkRecords) {
    return milkRecords
        .filter((r) => isThisMonth(r.date))
        .reduce((sum, r) => sum + Number(r.quantity || 0), 0);
}

function calculateTodayRevenue(sales, otherIncome) {
    const salesRevenue = sales
        .filter((s) => isToday(s.date))
        .reduce((sum, s) => sum + Number(s.amount || 0), 0);

    const incomeRevenue = otherIncome
        .filter((i) => isToday(i.date))
        .reduce((sum, i) => sum + Number(i.amount || 0), 0);

    return salesRevenue + incomeRevenue;
}

function calculateTodayExpense(expenses) {
    return expenses
        .filter((e) => isToday(e.date))
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);
}

function calculateFeedStock(inventoryItems) {
    return inventoryItems
        .filter((i) => i.category === "feed")
        .reduce((sum, i) => sum + Number(i.quantity || 0), 0);
}

function calculateMedicineStock(inventoryItems) {
    return inventoryItems
        .filter((i) => i.category === "medicine")
        .reduce((sum, i) => sum + Number(i.quantity || 0), 0);
}

function calculatePregnantCows(breedingRecords) {
    return breedingRecords.filter((b) => b.status === "pregnant").length;
}

function calculateExpectedCalvingSoon(breedingRecords, days = 30) {
    return breedingRecords.filter(
        (b) =>
            b.status === "pregnant" &&
            isWithinNextDays(b.expectedCalvingDate, days),
    ).length;
}

function calculateVaccinationDueSoon(healthRecords, days = 7) {
    return healthRecords.filter(
        (h) =>
            h.type === "vaccination" && isWithinNextDays(h.nextDueDate, days),
    ).length;
}

function calculateTasksToday(tasks) {
    return tasks.filter((t) => isToday(t.dueDate) && t.status !== "completed")
        .length;
}

export const dashboardService = {
    getStats() {
        const animals = dashboardRepository.getAnimals();
        const breedingRecords = dashboardRepository.getBreedingRecords();
        const healthRecords = dashboardRepository.getHealthRecords();
        const milkRecords = dashboardRepository.getMilkRecords();
        const sales = dashboardRepository.getSales();
        const otherIncome = dashboardRepository.getOtherIncome();
        const expenses = dashboardRepository.getExpenses();
        const inventoryItems = dashboardRepository.getInventoryItems();
        const tasks = dashboardRepository.getTasks();

        const todayRevenue = calculateTodayRevenue(sales, otherIncome);
        const todayExpense = calculateTodayExpense(expenses);

        return {
            totalCows: calculateTotalCows(animals),
            totalCalves: calculateTotalCalves(animals),
            milkToday: calculateMilkToday(milkRecords),
            milkThisMonth: calculateMilkThisMonth(milkRecords),
            todayRevenue,
            todayExpense,
            netProfitToday: todayRevenue - todayExpense,
            feedStock: calculateFeedStock(inventoryItems),
            medicineStock: calculateMedicineStock(inventoryItems),
            pregnantCows: calculatePregnantCows(breedingRecords),
            expectedCalvingSoon: calculateExpectedCalvingSoon(breedingRecords),
            vaccinationDueSoon: calculateVaccinationDueSoon(healthRecords),
            tasksToday: calculateTasksToday(tasks),
        };
    },
};
