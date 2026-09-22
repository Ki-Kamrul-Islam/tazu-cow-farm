import { useEffect, useState, useCallback } from "react";
import { scoreService } from "../../../services/herd/scoreService.js";

export function useScores() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animalId, setAnimalId] = useState("");

    const load = useCallback(() => {
        setLoading(true);
        setRecords(scoreService.list({ animalId }));
        setLoading(false);
    }, [animalId]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteRecord = (id) => {
        scoreService.remove(id);
        load();
    };

    return { records, loading, animalId, setAnimalId, deleteRecord };
}
