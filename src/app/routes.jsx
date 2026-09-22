import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { DashboardPage } from "../modules/dashboard/pages/DashboardPage.jsx";
import { ComingSoonPage } from "../components/common/ComingSoonPage.jsx";
import { navigationConfig } from "../config/navigation.js";
import { AnimalListPage } from "../modules/herd/pages/AnimalListPage.jsx";
import { AnimalFormPage } from "../modules/herd/pages/AnimalFormPage.jsx";
//
import { BreedingListPage } from "../modules/herd/pages/BreedingListPage.jsx";
import { BreedingFormPage } from "../modules/herd/pages/BreedingFormPage.jsx";
import { HealthListPage } from "../modules/herd/pages/HealthListPage.jsx";
import { HealthFormPage } from "../modules/herd/pages/HealthFormPage.jsx";
//
//
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
                    { path: "breeding", element: <BreedingListPage /> },
                    { path: "breeding/add", element: <BreedingFormPage /> },
                    {
                        path: "breeding/:id/edit",
                        element: <BreedingFormPage />,
                    },
                    { path: "health", element: <HealthListPage /> },
                    { path: "health/add", element: <HealthFormPage /> },
                    { path: "health/:id/edit", element: <HealthFormPage /> },
                ],
            },
            ...otherRoutes,
        ],
    },
]);
