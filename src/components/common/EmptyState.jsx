export function EmptyState({ icon = "📭", title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-14 gap-2">
            <span className="text-4xl">{icon}</span>
            <p className="text-text-primary font-semibold">{title}</p>
            {description && (
                <p className="text-text-muted text-sm max-w-sm">
                    {description}
                </p>
            )}
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}
