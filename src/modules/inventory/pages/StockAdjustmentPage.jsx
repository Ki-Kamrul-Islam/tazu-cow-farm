import StockAdjustmentForm from "../components/StockAdjustmentForm";

export default function StockAdjustmentPage() {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">Stock Adjustment</h1>

                <p className="text-gray-500">
                    Increase or decrease inventory stock.
                </p>
            </div>

            <div className="max-w-3xl rounded-xl bg-white p-6 shadow">
                <StockAdjustmentForm />
            </div>
        </div>
    );
}
