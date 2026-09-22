import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

function App() {
    const { t } = useLanguage();

    return (
        <DashboardLayout>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-primary">
                    {t("app.title")}
                </h1>
                <p className="mt-2 text-text-muted">
                    {t("app.setupSuccess")} — Phase 08
                </p>
            </div>
        </DashboardLayout>
    );
}

export default App;
