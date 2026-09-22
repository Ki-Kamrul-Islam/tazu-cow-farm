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
};
