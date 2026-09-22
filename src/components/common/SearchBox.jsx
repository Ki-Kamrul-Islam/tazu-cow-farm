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
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-surface
                text-text-primary placeholder:text-text-muted outline-none
                focus:ring-2 focus:ring-primary/40"
        />
    );
}
