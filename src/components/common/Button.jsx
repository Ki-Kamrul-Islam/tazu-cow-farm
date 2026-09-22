const VARIANT_CLASSES = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:opacity-90",
    outline:
        "bg-transparent border border-border text-text-primary hover:bg-surface",
    danger: "bg-danger text-white hover:opacity-90",
    ghost: "bg-transparent text-text-primary hover:bg-surface",
};

const SIZE_CLASSES = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    type = "button",
    className = "",
    ...rest
}) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
            {...rest}
        >
            {isLoading && (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {children}
        </button>
    );
}
