import { useState, useEffect } from "react";

export function SearchBox({
    placeholder = "Search...",
    onSearch,
    delay = 300,
}) {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => onSearch(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay, onSearch]);

    return (
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm pointer-events-none">
                🔍
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-border pl-9 pr-3 py-2 text-sm bg-surface
                    text-text-primary placeholder:text-text-muted outline-none
                    transition-shadow focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
        </div>
    );
}
