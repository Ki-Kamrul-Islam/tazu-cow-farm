export function Card({ children, className = "", ...rest }) {
    return (
        <div
            className={`bg-card border border-border rounded-xl p-4 shadow-sm ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
}
