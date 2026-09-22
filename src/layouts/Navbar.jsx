import { ThemeToggleButton } from "../components/ui/ThemeToggleButton.jsx";
import { LanguageToggleButton } from "../components/ui/LanguageToggleButton.jsx";

export function Navbar({ onMenuClick }) {
    return (
        <header className="h-16 bg-navbar-bg/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 sm:px-6 gap-3 sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-text-primary hover:bg-surface transition-colors"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    ☰
                </button>
                <span className="text-text-primary font-semibold hidden sm:inline tracking-tight">
                    🐄 Tazu Cow Farm
                </span>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-surface border border-border rounded-full p-1">
                    <ThemeToggleButton />
                    <LanguageToggleButton />
                </div>
                <div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center text-sm font-medium shadow-card"
                    aria-label="User profile placeholder"
                >
                    👤
                </div>
            </div>
        </header>
    );
}
