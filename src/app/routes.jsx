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
import { WeightListPage } from "../modules/herd/pages/WeightListPage.jsx";
import { WeightFormPage } from "../modules/herd/pages/WeightFormPage.jsx";
import { ScoreListPage } from "../modules/herd/pages/ScoreListPage.jsx";
import { ScoreFormPage } from "../modules/herd/pages/ScoreFormPage.jsx";
import { MilkListPage } from "../modules/production/pages/MilkListPage.jsx";
import { MilkFormPage } from "../modules/production/pages/MilkFormPage.jsx";
import { CustomerListPage } from "../modules/production/pages/CustomerListPage.jsx";
import { CustomerFormPage } from "../modules/production/pages/CustomerFormPage.jsx";
//
//
const otherRoutes = navigationConfig
    .filter(
        (item) =>
            item.key !== "dashboard" &&
            item.key !== "herd" &&
            item.key !== "production",
    )
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
                    { path: "weight", element: <WeightListPage /> },
                    { path: "weight/add", element: <WeightFormPage /> },
                    { path: "weight/:id/edit", element: <WeightFormPage /> },
                    { path: "scoring", element: <ScoreListPage /> },
                    { path: "scoring/add", element: <ScoreFormPage /> },
                    { path: "scoring/:id/edit", element: <ScoreFormPage /> },
                ],
            },
            {
                path: "production",
                children: [
                    { index: true, element: <MilkListPage /> },
                    { path: "add", element: <MilkFormPage /> },
                    { path: ":id/edit", element: <MilkFormPage /> },
                    { path: "customers", element: <CustomerListPage /> },
                    { path: "customers/add", element: <CustomerFormPage /> },
                    {
                        path: "customers/:id/edit",
                        element: <CustomerFormPage />,
                    },
                ],
            },
            ...otherRoutes,
        ],
    },
]);
