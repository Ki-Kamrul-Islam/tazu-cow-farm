const ICON_BG_CLASSES = {
    neutral: "bg-primary/10 text-primary",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    info: "bg-info/10 text-info",
};

export function StatCard({ label, value, icon, trend, variant = "neutral" }) {
    const trendColor =
        trend > 0 ? "text-success"
        : trend < 0 ? "text-danger"
        : "text-text-muted";

    return (
        <div className="bg-card border border-border rounded-2xl p-4 flex items-start justify-between shadow-card hover:shadow-pop transition-shadow">
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
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg
                        ${ICON_BG_CLASSES[variant] ?? ICON_BG_CLASSES.neutral}`}
                >
                    {icon}
                </div>
            )}
        </div>
    );
}
