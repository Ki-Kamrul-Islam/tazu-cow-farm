import { useEffect, useState, useCallback } from "react";
import { breedingService } from "../../../services/herd/breedingService.js";

export function useBreedingRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    const load = useCallback(() => {
        setLoading(true);
        setRecords(breedingService.list({ status }));
        setLoading(false);
    }, [status]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteRecord = (id) => {
        breedingService.remove(id);
        load();
    };

    return { records, loading, status, setStatus, deleteRecord };
}
