export function Input({ label, error, id, className = "", ...rest }) {
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

            <input
                id={id}
                className={`w-full rounded-lg border px-3 py-2 text-sm bg-surface text-text-primary
                    placeholder:text-text-muted outline-none transition-colors
                    focus:ring-2 focus:ring-primary/40
                    ${error ? "border-danger" : "border-border"} ${className}`}
                {...rest}
            />

            {error && <span className="text-xs text-danger">{error}</span>}
        </div>
    );
}
