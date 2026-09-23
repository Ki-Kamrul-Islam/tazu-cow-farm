import { useEffect, useState } from "react";

import stockLedgerService from "../services/stockLedgerService";

import CurrentStockTable from "../components/CurrentStockTable";

export default function CurrentStockLedgerPage() {
    const [items, setItems] = useState([]);

    const [summary, setSummary] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const stock = stockLedgerService.getCurrentStock();

            const stockSummary = stockLedgerService.getSummary();

            setItems(stock);

            setSummary(stockSummary);
        } catch (error) {
            setError(error.message || "Failed to load current stock.");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">Current Stock Ledger</h1>

                <p className="text-gray-500">
                    Current inventory stock overview.
                </p>
            </div>

            {summary && (
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-gray-500">Total Items</p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {summary.totalItems}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-gray-500">Current Stock</p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {summary.totalStock}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-gray-500">Stock In</p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {summary.totalStockIn}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-white p-5 shadow">
                        <p className="text-gray-500">Stock Out</p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {summary.totalStockOut}
                        </h2>
                    </div>
                </div>
            )}

            {loading && <div>Loading current stock...</div>}

            {error && (
                <div className="rounded-lg bg-red-100 p-4 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && <CurrentStockTable items={items} />}
        </div>
    );
}
