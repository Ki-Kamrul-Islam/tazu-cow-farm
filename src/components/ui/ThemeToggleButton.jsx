import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { SunIcon, MoonIcon } from "./icons.jsx";

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            title={isDark ? t("common.lightMode") : t("common.darkMode")}
            aria-label={isDark ? t("common.lightMode") : t("common.darkMode")}
            className="w-8 h-8 rounded-full flex items-center justify-center
                text-text-primary hover:bg-primary/10 hover:text-primary
                transition-colors"
        >
            {isDark ?
                <SunIcon />
            :   <MoonIcon />}
        </button>
    );
}
