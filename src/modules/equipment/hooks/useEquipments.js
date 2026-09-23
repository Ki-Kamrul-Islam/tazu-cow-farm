import { useEffect, useState, useCallback, useMemo } from "react";
import { equipmentService } from "../../../services/equipment/equipmentService.js";

const PAGE_SIZE = 10;

export function useEquipments() {
    const [equipments, setEquipments] = useState([]);
    const [hasAny, setHasAny] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const load = useCallback(() => {
        setLoading(true);
        setEquipments(equipmentService.list({ search, status }));
        setHasAny(equipmentService.count() > 0);
        setLoading(false);
    }, [search, status]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    const totalPages = Math.max(1, Math.ceil(equipments.length / PAGE_SIZE));
    const paged = useMemo(
        () => equipments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [equipments, page],
    );

    const deleteEquipment = (id) => {
        equipmentService.remove(id);
        load();
    };

    return {
        equipments: paged,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteEquipment,
    };
}
