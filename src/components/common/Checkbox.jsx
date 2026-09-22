export function Checkbox({ label, id, className = "", ...rest }) {
    return (
        <label
            htmlFor={id}
            className={`inline-flex items-center gap-2 text-sm text-text-primary cursor-pointer ${className}`}
        >
            <input
                id={id}
                type="checkbox"
                className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                {...rest}
            />
            {label}
        </label>
    );
}
