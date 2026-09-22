import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <LanguageProvider>
                <ToastProvider>
                    <RouterProvider router={router} />
                </ToastProvider>
            </LanguageProvider>
        </ThemeProvider>
    </StrictMode>,
);
