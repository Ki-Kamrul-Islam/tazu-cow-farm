import { useEffect, useState, useCallback } from "react";
import { animalTransferService } from "../../../services/herd/animalTransferService.js";

export function useAnimalTransfers() {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(() => {
        setLoading(true);
        setTransfers(animalTransferService.list());
        setLoading(false);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const deleteTransfer = (id) => {
        animalTransferService.remove(id);
        load();
    };

    return { transfers, loading, deleteTransfer };
}
