import { useEffect, useState } from "react";
import { dashboardService } from "../../../services/dashboard/dashboardService.js";

export function useDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setStats(dashboardService.getStats());
        setLoading(false);
    }, []);

    return { stats, loading };
}
