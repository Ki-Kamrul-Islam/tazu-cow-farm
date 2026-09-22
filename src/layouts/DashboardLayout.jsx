export function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar placeholder — আসল কাজ Phase 07-এ */}
            <aside className="w-64 bg-sidebar-bg text-sidebar-text hidden md:block">
                <div className="p-4 font-bold">🐄 Tazu Cow Farm</div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar placeholder — আসল কাজ Phase 08-এ */}
                <header className="h-16 bg-navbar-bg border-b border-border flex items-center px-4">
                    <span className="text-text-primary font-medium">
                        Navbar
                    </span>
                </header>

                {/* মূল content — প্রতিটি page এখানে বসবে */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
