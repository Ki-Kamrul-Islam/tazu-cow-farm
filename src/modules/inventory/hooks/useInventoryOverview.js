import { useCallback, useEffect, useState } from "react";
import { inventoryItemService } from "../../../services/inventory/inventoryItemService.js";

export function useInventoryOverview() {
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);

        const items = inventoryItemService.list();

        const activeItems = items.filter((item) => item.status === "active");

        const lowStockItems = activeItems.filter(
            (item) => Number(item.quantity) <= Number(item.reorderLevel),
        );

        const outOfStockItems = activeItems.filter(
            (item) => Number(item.quantity) <= 0,
        );

        const categoryCounts = activeItems.reduce((result, item) => {
            result[item.category] = (result[item.category] || 0) + 1;

            return result;
        }, {});

        const recentItems = [...items]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        setOverview({
            totalItems: items.length,
            activeItems: activeItems.length,
            lowStockItems,
            outOfStockItems,
            categoryCounts,
            recentItems,
        });

        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return {
        overview,
        loading,
        reload: load,
    };
}
