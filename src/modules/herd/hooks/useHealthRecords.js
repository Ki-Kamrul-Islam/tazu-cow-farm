import { useEffect, useState, useCallback } from "react";
import { healthService } from "../../../services/herd/healthService.js";

export function useHealthRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("");

    const load = useCallback(() => {
        setLoading(true);
        setRecords(healthService.list({ type }));
        setLoading(false);
    }, [type]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteRecord = (id) => {
        healthService.remove(id);
        load();
    };

    return { records, loading, type, setType, deleteRecord };
}
