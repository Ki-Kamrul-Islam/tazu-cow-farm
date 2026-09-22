import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { GlobeIcon } from "./icons.jsx";

export function LanguageToggleButton() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            title={language === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
            aria-label="Toggle language"
            className="h-8 pl-2 pr-2.5 rounded-full flex items-center gap-1
                text-text-primary hover:bg-primary/10 hover:text-primary
                transition-colors text-xs font-semibold"
        >
            <GlobeIcon />
            {language === "bn" ? "EN" : "বা"}
        </button>
    );
}
