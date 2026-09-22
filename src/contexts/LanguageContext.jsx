import { createContext, useContext, useState } from "react";
import { storage } from "../storage/storage.js";
import { STORAGE_KEYS } from "../storage/storageKeys.js";
import { bn } from "../i18n/bn.js";
import { en } from "../i18n/en.js";

const dictionaries = { bn, en };

const LanguageContext = createContext(null);

function getNestedValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() =>
        storage.get(STORAGE_KEYS.LANGUAGE, "bn"),
    );

    const changeLanguage = (lang) => {
        setLanguage(lang);
        storage.set(STORAGE_KEYS.LANGUAGE, lang);
    };

    const toggleLanguage = () => {
        changeLanguage(language === "bn" ? "en" : "bn");
    };

    const t = (key, params) => {
        const value = getNestedValue(dictionaries[language], key);
        const text = value ?? key;

        if (!params) return text;

        return Object.keys(params).reduce(
            (result, paramKey) =>
                result.replaceAll(`{${paramKey}}`, params[paramKey]),
            text,
        );
    };

    return (
        <LanguageContext.Provider
            value={{ language, changeLanguage, toggleLanguage, t }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used inside a LanguageProvider");
    }
    return context;
}
