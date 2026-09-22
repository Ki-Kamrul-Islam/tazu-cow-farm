import { useEffect, useState, useCallback, useMemo } from "react";
import { feedTypeService } from "../../../services/feed/feedTypeService.js";

const PAGE_SIZE = 10;

export function useFeedTypes() {
    const [feedTypes, setFeedTypes] = useState([]);
    const [hasAny, setHasAny] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const load = useCallback(() => {
        setLoading(true);
        setFeedTypes(feedTypeService.list({ search, status }));
        setHasAny(feedTypeService.count() > 0);
        setLoading(false);
    }, [search, status]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    const totalPages = Math.max(1, Math.ceil(feedTypes.length / PAGE_SIZE));
    const paged = useMemo(
        () => feedTypes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [feedTypes, page],
    );

    const deleteFeedType = (id) => {
        feedTypeService.remove(id);
        load();
    };

    return {
        feedTypes: paged,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteFeedType,
    };
}
