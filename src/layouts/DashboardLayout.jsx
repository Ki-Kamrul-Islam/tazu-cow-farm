import { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";

export function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-background">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-navbar-bg border-b border-border flex items-center px-4 gap-3">
                    <button
                        className="md:hidden text-text-primary text-xl"
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>
                    <span className="text-text-primary font-medium">
                        Navbar
                    </span>
                </header>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
