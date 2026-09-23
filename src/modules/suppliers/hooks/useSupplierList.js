import { useCallback, useEffect, useMemo, useState } from "react";

import { supplierService } from "../../../services/supplier/supplierService.js";

export function useSupplierList() {
    const [suppliers, setSuppliers] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);

        setSuppliers(supplierService.list());

        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const filteredSuppliers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return suppliers.filter((supplier) => {
            const matchesSearch =
                !query ||
                supplier.name.toLowerCase().includes(query) ||
                supplier.phone.toLowerCase().includes(query) ||
                supplier.email.toLowerCase().includes(query) ||
                supplier.contactPerson.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" || supplier.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [suppliers, search, statusFilter]);

    const toggleStatus = (id) => {
        supplierService.toggleStatus(id);
        load();
    };

    const remove = (id) => {
        supplierService.remove(id);
        load();
    };

    return {
        suppliers,
        filteredSuppliers,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        loading,

        toggleStatus,
        remove,

        reload: load,
    };
}
