export default function CurrentStockTable({ items = [] }) {
    if (items.length === 0) {
        return (
            <div className="rounded-lg border p-6 text-center text-gray-500">
                No inventory items found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="px-4 py-3 text-left">Item</th>

                        <th className="px-4 py-3 text-left">Category</th>

                        <th className="px-4 py-3 text-left">Current Stock</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="px-4 py-3 font-medium">
                                {item.name}
                            </td>

                            <td className="px-4 py-3">
                                {item.category || "-"}
                            </td>

                            <td className="px-4 py-3 font-semibold">
                                {item.quantity ?? 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
