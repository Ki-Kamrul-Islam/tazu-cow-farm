import { Button } from "./Button.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function ErrorState({ title, description, onRetry }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center text-center py-14 gap-2">
            <span className="text-4xl">⚠️</span>
            <p className="text-text-primary font-semibold">
                {title ?? t("errorState.title")}
            </p>
            <p className="text-text-muted text-sm max-w-sm">
                {description ?? t("errorState.description")}
            </p>
            {onRetry && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="mt-3"
                >
                    {t("errorState.retry")}
                </Button>
            )}
        </div>
    );
}
