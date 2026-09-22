import { useLanguage } from "../../../contexts/LanguageContext.jsx";

export function DashboardPage() {
    const { t } = useLanguage();

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold text-primary">
                {t("app.title")}
            </h1>
            <p className="mt-2 text-text-muted">
                {t("app.setupSuccess")} — Phase 09
            </p>
        </div>
    );
}
