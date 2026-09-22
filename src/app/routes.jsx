import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage.jsx";
import { ComingSoonPage } from "../components/common/ComingSoonPage.jsx";
import { navigationConfig } from "../config/navigation.js";
import { AnimalListPage } from "../modules/herd/pages/AnimalListPage.jsx";
import { AnimalFormPage } from "../modules/herd/pages/AnimalFormPage.jsx";

const otherRoutes = navigationConfig
    .filter((item) => item.key !== "dashboard" && item.key !== "herd")
    .map((item) => ({
        path: item.path.replace("/", ""),
        element: <ComingSoonPage titleKey={item.labelKey} />,
    }));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            {
                path: "herd",
                children: [
                    { index: true, element: <AnimalListPage /> },
                    { path: "add", element: <AnimalFormPage /> },
                    { path: ":id/edit", element: <AnimalFormPage /> },
                ],
            },
            ...otherRoutes,
        ],
    },
]);
