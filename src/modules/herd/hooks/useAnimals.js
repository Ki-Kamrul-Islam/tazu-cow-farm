import { useEffect, useState, useCallback, useMemo } from "react";
import { animalService } from "../../../services/herd/animalService.js";

const PAGE_SIZE = 10;

export function useAnimals() {
    const [animals, setAnimals] = useState([]);
    const [hasAnyAnimals, setHasAnyAnimals] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const loadAnimals = useCallback(() => {
        setLoading(true);
        setAnimals(animalService.list({ search, type, status }));
        setHasAnyAnimals(animalService.count() > 0);
        setLoading(false);
    }, [search, type, status]);

    useEffect(() => {
        loadAnimals();
    }, [loadAnimals]);

    useEffect(() => {
        setPage(1);
    }, [search, type, status]);

    const totalPages = Math.max(1, Math.ceil(animals.length / PAGE_SIZE));
    const pagedAnimals = useMemo(
        () => animals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [animals, page],
    );

    const deleteAnimal = (id) => {
        animalService.remove(id);
        loadAnimals();
    };

    return {
        animals: pagedAnimals,
        hasAnyAnimals,
        loading,
        search,
        setSearch,
        type,
        setType,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteAnimal,
    };
}
