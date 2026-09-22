import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage.jsx";
import { ComingSoonPage } from "../components/common/ComingSoonPage.jsx";
import { navigationConfig } from "../config/navigation.js";

const otherRoutes = navigationConfig
    .filter((item) => item.key !== "dashboard")
    .map((item) => ({
        path: item.path.replace("/", ""),
        element: <ComingSoonPage titleKey={item.labelKey} />,
    }));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [{ index: true, element: <DashboardPage /> }, ...otherRoutes],
    },
]);
