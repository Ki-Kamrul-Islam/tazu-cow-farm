export function Textarea({
    label,
    error,
    id,
    rows = 4,
    className = "",
    ...rest
}) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-text-primary"
                >
                    {label}
                </label>
            )}

            <textarea
                id={id}
                rows={rows}
                className={`w-full rounded-xl border px-3 py-2 text-sm bg-surface text-text-primary
                    placeholder:text-text-muted outline-none transition-colors resize-y
                    focus:ring-2 focus:ring-primary/30 focus:border-primary
                    ${error ? "border-danger" : "border-border"} ${className}`}
                {...rest}
            />

            {error && <span className="text-xs text-danger">{error}</span>}
        </div>
    );
}
