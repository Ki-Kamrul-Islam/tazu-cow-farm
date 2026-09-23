import useStockAdjustmentForm from "../hooks/useStockAdjustmentForm.js";

export default function StockAdjustmentForm() {
    const {
        form,
        loading,
        error,
        success,
        items,
        handleChange,
        submit,
    } = useStockAdjustmentForm();

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <label className="block mb-1">Inventory Item</label>

                <select
                    name="inventoryItemId"
                    value={form.inventoryItemId}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                >
                    <option value="">Select Item</option>

                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1">Adjustment Type</label>

                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                >
                    <option value="increase">Increase</option>

                    <option value="decrease">Decrease</option>

                    <option value="damage">Damage</option>

                    <option value="expired">Expired</option>

                    <option value="wastage">Wastage</option>

                    <option value="correction">Correction</option>
                </select>
            </div>

            <div>
                <label className="block mb-1">Quantity</label>

                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    min="0.01"
                    step="0.01"
                    className="w-full rounded-lg border p-3"
                    required
                />
            </div>

            <div>
                <label className="block mb-1">Reason</label>

                <input
                    type="text"
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    placeholder="Why is stock being adjusted?"
                    required
                />
            </div>

            <div>
                <label className="block mb-1">Notes</label>

                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-lg border p-3"
                    placeholder="Optional notes..."
                />
            </div>

            <div>
                <label className="block mb-1">Date</label>

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                />
            </div>

            {error && (
                <div className="rounded-lg bg-red-100 p-3 text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-lg bg-green-100 p-3 text-green-700">
                    {success}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-green-600 px-5 py-3 text-white"
            >
                {loading ? "Saving..." : "Save Adjustment"}
            </button>
        </form>
    );
}
