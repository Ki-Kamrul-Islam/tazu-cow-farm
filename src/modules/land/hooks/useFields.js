import { useEffect, useState, useCallback, useMemo } from "react";
import { fieldService } from "../../../services/land/fieldService.js";

const PAGE_SIZE = 10;

export function useFields() {
    const [fields, setFields] = useState([]);
    const [hasAny, setHasAny] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const load = useCallback(() => {
        setLoading(true);
        setFields(fieldService.list({ search, status }));
        setHasAny(fieldService.count() > 0);
        setLoading(false);
    }, [search, status]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    const totalPages = Math.max(1, Math.ceil(fields.length / PAGE_SIZE));
    const paged = useMemo(
        () => fields.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [fields, page],
    );

    const deleteField = (id) => {
        fieldService.remove(id);
        load();
    };

    return {
        fields: paged,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteField,
    };
}
