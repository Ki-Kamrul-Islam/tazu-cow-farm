export function Card({ children, className = "", ...rest }) {
    return (
        <div
            className={`bg-card border border-border rounded-2xl p-4 shadow-card ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
}
