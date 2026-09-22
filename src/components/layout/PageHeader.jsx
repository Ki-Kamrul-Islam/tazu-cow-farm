export function PageHeader({ title, description, action }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-border">
            <div>
                <h1 className="text-xl font-bold text-text-primary tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-text-muted mt-1">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="flex gap-2">{action}</div>}
        </div>
    );
}
