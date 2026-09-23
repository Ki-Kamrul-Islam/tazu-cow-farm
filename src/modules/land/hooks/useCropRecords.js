import { useEffect, useState, useCallback } from "react";
import { cropService } from "../../../services/land/cropService.js";

export function useCropRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fieldId, setFieldId] = useState("");
    const [cropType, setCropType] = useState("");
    const [totalCost, setTotalCost] = useState(0);
    const [growingCount, setGrowingCount] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(cropService.list({ fieldId, cropType }));
        setTotalCost(cropService.getTotalCost());
        setGrowingCount(cropService.getGrowingCount());
        setLoading(false);
    }, [fieldId, cropType]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteRecord = (id) => {
        cropService.remove(id);
        load();
    };

    return {
        records,
        loading,
        fieldId,
        setFieldId,
        cropType,
        setCropType,
        totalCost,
        growingCount,
        deleteRecord,
    };
}
