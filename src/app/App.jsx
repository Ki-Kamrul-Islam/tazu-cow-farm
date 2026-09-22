import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { ThemeToggleButton } from "../components/ui/ThemeToggleButton.jsx";
import { LanguageToggleButton } from "../components/ui/LanguageToggleButton.jsx";
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
                    {t("app.setupSuccess")} — Phase 06
                </p>
                <div className="mt-4 flex gap-3 justify-center">
                    <ThemeToggleButton />
                    <LanguageToggleButton />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default App;
