import { useEffect, useState, useCallback } from "react";
import { incomeService } from "../../../services/finance/incomeService.js";

export function useIncomes() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [todayTotal, setTodayTotal] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(incomeService.list({ category, date }));
        setTodayTotal(incomeService.getTodayTotal());
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
        incomeService.remove(id);
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
