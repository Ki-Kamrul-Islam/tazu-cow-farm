import { useEffect, useState } from "react";

import stockLedgerService from "../services/stockLedgerService";

import StockMovementTable from "../components/StockMovementTable";

export default function StockHistoryPage() {
    const [movements, setMovements] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const data = stockLedgerService.getMovements();

            setMovements(data);
        } catch (error) {
            setError(error.message || "Failed to load stock history.");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">Stock History</h1>

                <p className="text-gray-500">
                    Complete inventory stock movement history.
                </p>
            </div>

            {loading && <div>Loading stock history...</div>}

            {error && (
                <div className="rounded-lg bg-red-100 p-4 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && <StockMovementTable movements={movements} />}
        </div>
    );
}
