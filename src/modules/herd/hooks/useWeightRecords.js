import { useEffect, useState, useCallback } from "react";
import { weightService } from "../../../services/herd/weightService.js";

export function useWeightRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animalId, setAnimalId] = useState("");
    const [adg, setAdg] = useState(null);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(weightService.list({ animalId }));
        setAdg(animalId ? weightService.calculateADG(animalId) : null);
        setLoading(false);
    }, [animalId]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteRecord = (id) => {
        weightService.remove(id);
        load();
    };

    return { records, loading, animalId, setAnimalId, adg, deleteRecord };
}
