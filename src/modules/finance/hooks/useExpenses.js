import { useEffect, useState, useCallback } from "react";
import { expenseService } from "../../../services/finance/expenseService.js";

export function useExpenses() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [todayTotal, setTodayTotal] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(expenseService.list({ category, date }));
        setTodayTotal(expenseService.getTodayTotal());
        setLoading(false);
    }, [category, date]);

    useEffect(() => {
        load();
    }, [load]);

    const filteredTotal = records.reduce(
        (sum, r) => sum + Number(r.amount || 0),
        0,
    );

    const deleteRecord = (id) => {
        expenseService.remove(id);
        load();
    };

    return {
        records,
        loading,
        category,
        setCategory,
        date,
        setDate,
        todayTotal,
        filteredTotal,
        deleteRecord,
    };
}
