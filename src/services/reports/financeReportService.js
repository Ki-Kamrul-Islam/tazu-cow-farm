import { expenseService } from "../finance/expenseService.js";
import { incomeService } from "../finance/incomeService.js";
import { dashboardRepository } from "../../repositories/dashboard/dashboardRepository.js";

function getLastNDates(days) {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
}

export const financeReportService = {
    getDailyTrend(days = 30) {
        const expenses = expenseService.list();
        const otherIncome = incomeService.list();
        const milkSales = dashboardRepository.getSales();
        const dates = getLastNDates(days);

        return dates.map((date) => {
            const income =
                otherIncome
                    .filter((i) => i.date === date)
                    .reduce((sum, i) => sum + Number(i.amount || 0), 0) +
                milkSales
                    .filter((s) => s.date === date)
                    .reduce((sum, s) => sum + Number(s.amount || 0), 0);

            const expense = expenses
                .filter((e) => e.date === date)
                .reduce((sum, e) => sum + Number(e.amount || 0), 0);

            return { date, income, expense };
        });
    },

    getExpenseByCategory() {
        const expenses = expenseService.list();
        const totals = {};

        expenses.forEach((e) => {
            totals[e.category] =
                (totals[e.category] || 0) + Number(e.amount || 0);
        });

        return Object.entries(totals).map(([category, value]) => ({
            category,
            value,
        }));
    },

    getSummary() {
        const milkSalesTotal = dashboardRepository
            .getSales()
            .reduce((sum, s) => sum + Number(s.amount || 0), 0);

        const totalIncome = incomeService.getTotal() + milkSalesTotal;
        const totalExpense = expenseService.getTotal();

        return {
            totalIncome,
            totalExpense,
            netProfit: totalIncome - totalExpense,
        };
    },
};
