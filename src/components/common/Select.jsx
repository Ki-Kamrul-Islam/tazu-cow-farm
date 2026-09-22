export function Select({
    label,
    error,
    id,
    options = [],
    placeholder,
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

            <select
                id={id}
                className={`w-full rounded-xl border px-3 py-2 text-sm bg-surface text-text-primary
                    outline-none transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary
                    ${error ? "border-danger" : "border-border"} ${className}`}
                {...rest}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {error && <span className="text-xs text-danger">{error}</span>}
        </div>
    );
}
