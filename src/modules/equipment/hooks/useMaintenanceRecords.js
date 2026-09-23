import { useEffect, useState, useCallback } from "react";
import { maintenanceService } from "../../../services/equipment/maintenanceService.js";

export function useMaintenanceRecords() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [equipmentId, setEquipmentId] = useState("");
    const [type, setType] = useState("");
    const [totalCost, setTotalCost] = useState(0);

    const load = useCallback(() => {
        setLoading(true);
        setRecords(maintenanceService.list({ equipmentId, type }));
        setTotalCost(maintenanceService.getTotalCost());
        setLoading(false);
    }, [equipmentId, type]);

    useEffect(() => {
        load();
    }, [load]);

    const filteredCost = records.reduce(
        (sum, r) => sum + Number(r.cost || 0),
        0,
    );

    const deleteRecord = (id) => {
        maintenanceService.remove(id);
        load();
    };

    return {
        records,
        loading,
        equipmentId,
        setEquipmentId,
        type,
        setType,
        totalCost,
        filteredCost,
        deleteRecord,
    };
}
