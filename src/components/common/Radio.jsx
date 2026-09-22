export function Radio({ label, id, name, value, className = "", ...rest }) {
    return (
        <label
            htmlFor={id}
            className={`inline-flex items-center gap-2 text-sm text-text-primary cursor-pointer ${className}`}
        >
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                className="w-4 h-4 border-border accent-primary cursor-pointer"
                {...rest}
            />
            {label}
        </label>
    );
}
