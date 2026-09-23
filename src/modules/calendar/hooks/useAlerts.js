import { useState, useEffect } from "react";
import { alertService } from "../../../services/alerts/alertService.js";

export function useAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setAlerts(alertService.getAlerts(7));
        setLoading(false);
    }, []);

    return { alerts, loading };
}
