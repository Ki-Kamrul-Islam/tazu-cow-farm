import { useEffect, useState, useCallback } from "react";
import { waterService } from "../../../services/farmOperations/waterService.js";

export function useWaterRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [purpose, setPurpose] = useState("");
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(waterService.list({ purpose }));
        setTotalQuantity(waterService.getTotalQuantity());
        setTotalCost(waterService.getTotalCost());
        setLoading(false);
    }, [purpose]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteRecord = (id) => {
        waterService.remove(id);
        load();
    };

    return {
        records,
        loading,
        purpose,
        setPurpose,
        totalQuantity,
        totalCost,
        deleteRecord,
    };
}
