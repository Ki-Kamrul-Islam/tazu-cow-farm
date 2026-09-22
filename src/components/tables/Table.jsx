export function Table({
    columns,
    data,
    keyField = "id",
    onRowClick,
    emptyMessage = "No data found",
}) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-10 text-text-muted border border-border rounded-xl bg-card">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-border rounded-xl bg-card">
            <table className="w-full text-sm min-w-max">
                <thead>
                    <tr className="border-b border-border text-left">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-3 font-medium text-text-muted whitespace-nowrap"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row[keyField]}
                            onClick={() => onRowClick?.(row)}
                            className={`border-b border-border last:border-0 ${
                                onRowClick ?
                                    "cursor-pointer hover:bg-surface"
                                :   ""
                            }`}
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className="px-4 py-3 text-text-primary whitespace-nowrap"
                                >
                                    {col.render ?
                                        col.render(row)
                                    :   row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
