import { useEffect, useState, useCallback } from "react";
import { animalGroupService } from "../../../services/herd/animalGroupService.js";

export function useAnimalGroups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);
        setGroups(animalGroupService.list());
        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const deleteGroup = (id) => {
        animalGroupService.remove(id);
        load();
    };

    return { groups, loading, deleteGroup };
}
