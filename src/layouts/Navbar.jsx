import { ThemeToggleButton } from "../components/ui/ThemeToggleButton.jsx";
import { LanguageToggleButton } from "../components/ui/LanguageToggleButton.jsx";

export function Navbar({ onMenuClick }) {
    return (
        <header className="h-16 bg-navbar-bg border-b border-border flex items-center justify-between px-4 gap-3">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden text-text-primary text-xl"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    ☰
                </button>
                <span className="text-text-primary font-semibold hidden sm:inline">
                    🐄 Tazu Cow Farm
                </span>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <LanguageToggleButton />
                <div
                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium"
                    aria-label="User profile placeholder"
                >
                    👤
                </div>
            </div>
        </header>
    );
}
