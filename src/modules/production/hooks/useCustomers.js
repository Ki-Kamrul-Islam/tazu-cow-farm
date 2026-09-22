import { useEffect, useState, useCallback, useMemo } from "react";
import { customerService } from "../../../services/production/customerService.js";

const PAGE_SIZE = 10;

export function useCustomers() {
    const [customers, setCustomers] = useState([]);
    const [hasAnyCustomers, setHasAnyCustomers] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const load = useCallback(() => {
        setLoading(true);
        setCustomers(customerService.list({ search, status }));
        setHasAnyCustomers(customerService.count() > 0);
        setLoading(false);
    }, [search, status]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    const totalPages = Math.max(1, Math.ceil(customers.length / PAGE_SIZE));
    const pagedCustomers = useMemo(
        () => customers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [customers, page],
    );

    const deleteCustomer = (id) => {
        customerService.remove(id);
        load();
    };

    return {
        customers: pagedCustomers,
        hasAnyCustomers,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteCustomer,
    };
}
