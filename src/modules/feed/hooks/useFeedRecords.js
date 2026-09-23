import { useEffect, useState, useCallback } from "react";
import { feedService } from "../../../services/feed/feedService.js";

export function useFeedRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedTypeId, setFeedTypeId] = useState("");
    const [date, setDate] = useState("");
    const [todayCost, setTodayCost] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(feedService.list({ feedTypeId, date }));
        setTodayCost(feedService.getTodayCost());
        setLoading(false);
    }, [feedTypeId, date]);

    useEffect(() => {
        load();
    }, [load]);

    const filteredCost = records.reduce((sum, r) => sum + r.cost, 0);

    const deleteRecord = (id) => {
        feedService.remove(id);
        load();
    };

    return {
        records,
        loading,
        feedTypeId,
        setFeedTypeId,
        date,
        setDate,
        todayCost,
        filteredCost,
        deleteRecord,
    };
}
