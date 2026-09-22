import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function LanguageToggleButton() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="px-4 py-2 rounded-lg bg-surface border border-border text-text-primary hover:bg-secondary hover:text-white transition-colors"
            aria-label="Toggle language"
        >
            {language === "bn" ? "English" : "বাংলা"}
        </button>
    );
}
