import { useEffect, useState, useCallback } from "react";
import { saleService } from "../../../services/production/saleService.js";

export function useSales() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customerId, setCustomerId] = useState("");
    const [date, setDate] = useState("");
    const [todayRevenue, setTodayRevenue] = useState(0);
    const [totalDue, setTotalDue] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setSales(saleService.list({ customerId, date }));
        setTodayRevenue(saleService.getTodayRevenue());
        setTotalDue(saleService.getTotalDue());
        setLoading(false);
    }, [customerId, date]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteSale = (id) => {
        saleService.remove(id);
        load();
    };

    return {
        sales,
        loading,
        customerId,
        setCustomerId,
        date,
        setDate,
        todayRevenue,
        totalDue,
        deleteSale,
    };
}
