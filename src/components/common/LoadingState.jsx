import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function LoadingState({ message }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-14 gap-3">
            <span className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
            <p className="text-text-muted text-sm">
                {message ?? t("common.loading")}
            </p>
        </div>
    );
}
