import { useCallback, useEffect, useMemo, useState } from "react";
import { inventoryItemService } from "../../../services/inventory/inventoryItemService.js";

const PAGE_SIZE = 10;

export function useInventoryItems() {
    const [items, setItems] = useState([]);
    const [hasAny, setHasAny] = useState(true);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);

    const load = useCallback(() => {
        setLoading(true);

        setItems(
            inventoryItemService.list({
                search,
                category,
                status,
            }),
        );

        setHasAny(inventoryItemService.count() > 0);

        setLoading(false);
    }, [search, category, status]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        setPage(1);
    }, [search, category, status]);

    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

    const pagedItems = useMemo(
        () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [items, page],
    );

    const deleteItem = (id) => {
        inventoryItemService.remove(id);
        load();
    };

    return {
        items: pagedItems,
        hasAny,
        loading,

        search,
        setSearch,

        category,
        setCategory,

        status,
        setStatus,

        page,
        totalPages,
        setPage,

        deleteItem,
    };
}
