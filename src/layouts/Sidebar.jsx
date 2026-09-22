import { NavLink } from "react-router-dom";
import { navigationConfig } from "../config/navigation.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export function Sidebar({ isOpen, onClose }) {
    const { t } = useLanguage();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-sidebar-bg text-sidebar-text
          border-r border-sidebar-border z-40
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="p-4 font-bold border-b border-sidebar-border">
                    🐄 Tazu Cow Farm
                </div>

                <nav className="p-2 overflow-y-auto">
                    {navigationConfig.map((item) => (
                        <NavLink
                            key={item.key}
                            to={item.path}
                            end={item.path === "/"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                                    isActive ?
                                        "bg-primary text-white"
                                    :   "hover:bg-sidebar-hover"
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            <span className="text-sm">{t(item.labelKey)}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
