import { NavLink } from "react-router-dom";
import { navigationConfig } from "../config/navigation.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export function Sidebar({ isOpen, onClose }) {
    const { t } = useLanguage();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-sidebar-bg text-sidebar-text
                    border-r border-sidebar-border z-40 flex flex-col
                    transform transition-transform duration-200
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                        🐄
                    </span>
                    <span className="font-semibold tracking-tight">
                        Tazu Cow Farm
                    </span>
                </div>

                <nav className="flex-1 p-3 overflow-y-auto space-y-0.5">
                    {navigationConfig.map((item) => (
                        <NavLink
                            key={item.key}
                            to={item.path}
                            end={item.path === "/"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                    isActive ?
                                        "bg-primary-light text-primary font-medium"
                                    :   "hover:bg-sidebar-hover"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-primary" />
                                    )}
                                    <span className="text-base">
                                        {item.icon}
                                    </span>
                                    <span>{t(item.labelKey)}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
