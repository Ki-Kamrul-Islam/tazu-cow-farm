export function Tabs({ tabs, activeTab, onChange }) {
    return (
        <div className="flex gap-1 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                        ${
                            activeTab === tab.key ?
                                "border-primary text-primary"
                            :   "border-transparent text-text-muted hover:text-text-primary"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
