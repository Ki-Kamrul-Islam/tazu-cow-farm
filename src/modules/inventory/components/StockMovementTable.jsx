export default function StockMovementTable({ movements = [] }) {
    if (movements.length === 0) {
        return (
            <div className="rounded-lg border p-6 text-center text-gray-500">
                No stock movement found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="px-4 py-3 text-left">Date</th>

                        <th className="px-4 py-3 text-left">Item</th>

                        <th className="px-4 py-3 text-left">Type</th>

                        <th className="px-4 py-3 text-left">Quantity</th>

                        <th className="px-4 py-3 text-left">Previous</th>

                        <th className="px-4 py-3 text-left">New Stock</th>
                    </tr>
                </thead>

                <tbody>
                    {movements.map((movement) => (
                        <tr key={movement.id} className="border-b">
                            <td className="px-4 py-3">{movement.date}</td>

                            <td className="px-4 py-3">
                                {movement.inventoryItemId}
                            </td>

                            <td className="px-4 py-3">{movement.type}</td>

                            <td
                                className={`px-4 py-3 font-semibold ${
                                    movement.quantity >= 0 ?
                                        "text-green-600"
                                    :   "text-red-600"
                                }`}
                            >
                                {movement.quantity > 0 ?
                                    `+${movement.quantity}`
                                :   movement.quantity}
                            </td>

                            <td className="px-4 py-3">
                                {movement.previousStock}
                            </td>

                            <td className="px-4 py-3">{movement.newStock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
