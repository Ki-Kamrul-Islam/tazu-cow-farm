import { useState, useEffect } from "react";
import { financeReportService } from "../../../services/reports/financeReportService.js";

export function useFinancialReport() {
    const [trend, setTrend] = useState([]);
    const [categoryBreakdown, setCategoryBreakdown] = useState([]);
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        netProfit: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTrend(financeReportService.getDailyTrend(30));
        setCategoryBreakdown(financeReportService.getExpenseByCategory());
        setSummary(financeReportService.getSummary());
        setLoading(false);
    }, []);

    return { trend, categoryBreakdown, summary, loading };
}
