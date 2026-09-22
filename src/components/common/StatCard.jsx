export function StatCard({ label, value, icon, trend, variant = "neutral" }) {
    const trendColor =
        trend > 0 ? "text-success"
        : trend < 0 ? "text-danger"
        : "text-text-muted";

    return (
        <div className="bg-card border border-border rounded-xl p-4 flex items-start justify-between">
            <div>
                <p className="text-sm text-text-muted">{label}</p>
                <p className="text-2xl font-bold text-text-primary mt-1">
                    {value}
                </p>
                {trend !== undefined && (
                    <p className={`text-xs mt-1 ${trendColor}`}>
                        {trend > 0 ?
                            "▲"
                        : trend < 0 ?
                            "▼"
                        :   "—"}{" "}
                        {Math.abs(trend)}%
                    </p>
                )}
            </div>

            {icon && (
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg
                        ${variant === "neutral" ? "bg-primary/10" : `bg-${variant}/10`}`}
                >
                    {icon}
                </div>
            )}
        </div>
    );
}
