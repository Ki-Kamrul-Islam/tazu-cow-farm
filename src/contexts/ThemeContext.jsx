import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../storage/storage.js";
import { STORAGE_KEYS } from "../storage/storageKeys.js";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() =>
        storage.get(STORAGE_KEYS.THEME, "light"),
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        storage.set(STORAGE_KEYS.THEME, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside a ThemeProvider");
    }
    return context;
}
