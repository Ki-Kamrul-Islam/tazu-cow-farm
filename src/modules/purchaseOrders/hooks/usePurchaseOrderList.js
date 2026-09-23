import { useCallback, useEffect, useMemo, useState } from "react";

import { purchaseOrderService } from "../../../services/purchaseOrder/purchaseOrderService.js";

export function usePurchaseOrderList() {
    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);

        setOrders(purchaseOrderService.list());

        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const filteredOrders = useMemo(() => {
        const query = search.trim().toLowerCase();

        return orders.filter((order) => {
            const matchesSearch =
                !query || order.poNumber.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" || order.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, search, statusFilter]);

    const updateStatus = (id, status) => {
        purchaseOrderService.updateStatus(id, status);

        load();
    };

    const remove = (id) => {
        purchaseOrderService.remove(id);

        load();
    };

    return {
        orders,
        filteredOrders,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        loading,

        updateStatus,
        remove,

        reload: load,
    };
}
