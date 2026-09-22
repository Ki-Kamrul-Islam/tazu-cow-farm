import { useState } from "react";
import { navigationConfig } from "../config/navigation.js";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export function Sidebar({ isOpen, onClose }) {
    const { t } = useLanguage();
    const [activeKey, setActiveKey] = useState("dashboard");

    return (
        <>
            {/* Mobile backdrop — sidebar খোলা থাকলে ক্লিক করে বন্ধ করা যাবে */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-sidebar-bg text-sidebar-text z-40
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="p-4 font-bold border-b border-white/10">
                    🐄 Tazu Cow Farm
                </div>

                <nav className="p-2 overflow-y-auto">
                    {navigationConfig.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => {
                                setActiveKey(item.key);
                                onClose?.();
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left mb-1 transition-colors
                ${activeKey === item.key ? "bg-primary text-white" : "hover:bg-white/10"}`}
                        >
                            <span>{item.icon}</span>
                            <span className="text-sm">{t(item.labelKey)}</span>
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
}
