import { useEffect, useState, useCallback } from "react";
import { milkService } from "../../../services/production/milkService.js";

export function useMilkRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animalId, setAnimalId] = useState("");
    const [date, setDate] = useState("");
    const [todayTotal, setTodayTotal] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(milkService.list({ animalId, date }));
        setTodayTotal(milkService.getTodayTotal());
        setLoading(false);
    }, [animalId, date]);

    useEffect(() => {
        load();
    }, [load]);

    const filteredTotal = records.reduce(
        (sum, r) => sum + Number(r.quantity || 0),
        0,
    );

    const deleteRecord = (id) => {
        milkService.remove(id);
        load();
    };

    return {
        records,
        loading,
        animalId,
        setAnimalId,
        date,
        setDate,
        todayTotal,
        filteredTotal,
        deleteRecord,
    };
}
