import { useEffect, useState, useCallback } from "react";
import { manureService } from "../../../services/farmOperations/manureService.js";

export function useManureRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("");
    const [totalQuantity, setTotalQuantity] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(manureService.list({ type }));
        setTotalQuantity(manureService.getTotalQuantity());
        setLoading(false);
    }, [type]);

    useEffect(() => {
        load();
    }, [load]);

    const filteredQuantity = records.reduce(
        (sum, r) => sum + Number(r.quantity || 0),
        0,
    );

    const deleteRecord = (id) => {
        manureService.remove(id);
        load();
    };

    return {
        records,
        loading,
        type,
        setType,
        totalQuantity,
        filteredQuantity,
        deleteRecord,
    };
}
