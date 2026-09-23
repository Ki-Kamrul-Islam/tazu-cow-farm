import { useState, useEffect } from "react";
import { farmReportService } from "../../../services/reports/farmReportService.js";

export function useFarmReport() {
    const [herdDistribution, setHerdDistribution] = useState([]);
    const [milkTrend, setMilkTrend] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setHerdDistribution(farmReportService.getHerdDistribution());
        setMilkTrend(farmReportService.getMilkTrend(30));
        setLoading(false);
    }, []);

    return { herdDistribution, milkTrend, loading };
}
