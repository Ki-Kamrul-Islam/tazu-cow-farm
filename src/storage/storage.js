const PREFIX = "tazu:";

export const storage = {
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(PREFIX + key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(PREFIX + key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    update(key, updaterFn, fallback = null) {
        const current = storage.get(key, fallback);
        const next = updaterFn(current);
        return storage.set(key, next);
    },

    remove(key) {
        try {
            localStorage.removeItem(PREFIX + key);
            return true;
        } catch {
            return false;
        }
    },

    clear() {
        try {
            Object.keys(localStorage)
                .filter((k) => k.startsWith(PREFIX))
                .forEach((k) => localStorage.removeItem(k));
            return true;
        } catch {
            return false;
        }
    },
    // Non-mutating — সব data পড়ে একটা plain object হিসেবে ফেরত দেয় (backup export-এর জন্য)
    exportAll() {
        const result = {};
        Object.keys(localStorage)
            .filter((k) => k.startsWith(PREFIX))
            .forEach((k) => {
                try {
                    result[k.slice(PREFIX.length)] = JSON.parse(
                        localStorage.getItem(k),
                    );
                } catch {
                    // corrupt entry হলে skip করা হবে
                }
            });
        return result;
    },

    // Mutating — একটা object থেকে সব key আবার LocalStorage-এ বসিয়ে দেয় (restore-এর জন্য)
    importAll(data) {
        try {
            Object.entries(data).forEach(([key, value]) => {
                localStorage.setItem(PREFIX + key, JSON.stringify(value));
            });
            return true;
        } catch {
            return false;
        }
    },
};
