import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext(null);

const VARIANT_CLASSES = {
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-white",
    info: "bg-info text-white",
};

let idCounter = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        (message, variant = "info", duration = 3000) => {
            const id = ++idCounter;
            setToasts((prev) => [...prev, { id, message, variant }]);
            setTimeout(() => removeToast(id), duration);
        },
        [removeToast],
    );

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {createPortal(
                <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-full max-w-xs">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg text-sm ${VARIANT_CLASSES[toast.variant]}`}
                        >
                            <span>{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                aria-label="Close notification"
                                className="opacity-80 hover:opacity-100 leading-none"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>,
                document.body,
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used inside a ToastProvider");
    }
    return context;
}
