import { dashboardRepository } from "../../repositories/dashboard/dashboardRepository.js";
import { ANIMAL_TYPES } from "../../constants/animal.js";

function getLastNDates(days) {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
}

export const farmReportService = {
    getHerdDistribution() {
        const animals = dashboardRepository
            .getAnimals()
            .filter((a) => a.status === "active");

        return ANIMAL_TYPES.map((type) => ({
            type,
            count: animals.filter((a) => a.type === type).length,
        })).filter((row) => row.count > 0);
    },

    getMilkTrend(days = 30) {
        const milkRecords = dashboardRepository.getMilkRecords();
        const dates = getLastNDates(days);

        return dates.map((date) => ({
            date,
            quantity: milkRecords
                .filter((r) => r.date === date)
                .reduce((sum, r) => sum + Number(r.quantity || 0), 0),
        }));
    },
};
