export function Tabs({ tabs, activeTab, onChange }) {
    return (
        <div className="inline-flex gap-1 p-1 bg-surface border border-border rounded-xl overflow-x-auto max-w-full">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors
                        ${
                            activeTab === tab.key ?
                                "bg-primary text-white shadow-card"
                            :   "text-text-muted hover:text-text-primary"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
