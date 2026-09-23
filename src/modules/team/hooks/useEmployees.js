import { useEffect, useState, useCallback, useMemo } from "react";
import { employeeService } from "../../../services/team/employeeService.js";

const PAGE_SIZE = 10;

export function useEmployees() {
    const [employees, setEmployees] = useState([]);
    const [hasAny, setHasAny] = useState(true);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const load = useCallback(() => {
        setLoading(true);
        setEmployees(employeeService.list({ search, status }));
        setHasAny(employeeService.count() > 0);
        setLoading(false);
    }, [search, status]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        setPage(1);
    }, [search, status]);

    const totalPages = Math.max(1, Math.ceil(employees.length / PAGE_SIZE));
    const paged = useMemo(
        () => employees.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [employees, page],
    );

    const deleteEmployee = (id) => {
        employeeService.remove(id);
        load();
    };

    return {
        employees: paged,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteEmployee,
    };
}
