import { Button } from "./Button.jsx";

export function ErrorState({
    title = "কিছু একটা সমস্যা হয়েছে",
    description = "দয়া করে আবার চেষ্টা করুন।",
    onRetry,
}) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-14 gap-2">
            <span className="text-4xl">⚠️</span>
            <p className="text-text-primary font-semibold">{title}</p>
            <p className="text-text-muted text-sm max-w-sm">{description}</p>
            {onRetry && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="mt-3"
                >
                    আবার চেষ্টা করুন
                </Button>
            )}
        </div>
    );
}
