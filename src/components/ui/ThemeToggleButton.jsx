import { useTheme } from "../../contexts/ThemeContext.jsx";

export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-surface border border-border text-text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Toggle dark mode"
        >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
}
