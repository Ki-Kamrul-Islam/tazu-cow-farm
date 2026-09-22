const BADGE_CLASSES = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    info: "bg-info/10 text-info",
    neutral: "bg-text-muted/10 text-text-muted",
};

export function Badge({ children, variant = "neutral" }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_CLASSES[variant]}`}
        >
            {children}
        </span>
    );
}
