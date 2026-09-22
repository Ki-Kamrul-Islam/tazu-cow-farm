export function LoadingState({ message = "লোড হচ্ছে..." }) {
    return (
        <div className="flex flex-col items-center justify-center py-14 gap-3">
            <span className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
            <p className="text-text-muted text-sm">{message}</p>
        </div>
    );
}
