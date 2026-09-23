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
import { SaleListPage } from "../modules/production/pages/SaleListPage.jsx";
import { SaleFormPage } from "../modules/production/pages/SaleFormPage.jsx";
import { FeedTypeListPage } from "../modules/feed/pages/FeedTypeListPage.jsx";
import { FeedTypeFormPage } from "../modules/feed/pages/FeedTypeFormPage.jsx";

import { FeedListPage } from "../modules/feed/pages/FeedListPage.jsx";
import { FeedFormPage } from "../modules/feed/pages/FeedFormPage.jsx";
import { FieldListPage } from "../modules/land/pages/FieldListPage.jsx";
import { FieldFormPage } from "../modules/land/pages/FieldFormPage.jsx";
import { CropListPage } from "../modules/land/pages/CropListPage.jsx";
import { CropFormPage } from "../modules/land/pages/CropFormPage.jsx";
//
import { InventoryItemListPage } from "../modules/inventory/pages/InventoryItemListPage.jsx";
import { InventoryItemFormPage } from "../modules/inventory/pages/InventoryItemFormPage.jsx";
import { InventoryOverviewPage } from "../modules/inventory/pages/InventoryOverviewPage.jsx";
//
import { InventorySettingsPage } from "../modules/inventory/pages/InventorySettingsPage.jsx";
//

//
const otherRoutes = navigationConfig
    .filter(
        (item) =>
            item.key !== "dashboard" &&
            item.key !== "herd" &&
            item.key !== "production" &&
            item.key !== "feed",
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
                    { path: "sales", element: <SaleListPage /> },
                    { path: "sales/add", element: <SaleFormPage /> },
                    { path: "sales/:id/edit", element: <SaleFormPage /> },
                ],
            },
            {
                path: "feed",
                children: [
                    { index: true, element: <FeedListPage /> },
                    { path: "add", element: <FeedFormPage /> },
                    { path: ":id/edit", element: <FeedFormPage /> },
                    { path: "types", element: <FeedTypeListPage /> },
                    { path: "types/add", element: <FeedTypeFormPage /> },
                    { path: "types/:id/edit", element: <FeedTypeFormPage /> },
                ],
            },

            {
                path: "land",
                children: [
                    { index: true, element: <FieldListPage /> },
                    { path: "add", element: <FieldFormPage /> },
                    { path: ":id/edit", element: <FieldFormPage /> },
                    { path: "crops", element: <CropListPage /> },
                    { path: "crops/add", element: <CropFormPage /> },
                    { path: "crops/:id/edit", element: <CropFormPage /> },
                ],
            },

            {
                path: "inventory",
                children: [
                    {
                        path: "overview",
                        element: <InventoryOverviewPage />,
                    },

                    {
                        path: "settings",
                        element: <InventorySettingsPage />,
                    },

                    { index: true, element: <InventoryItemListPage /> },
                    { path: "add", element: <InventoryItemFormPage /> },
                    {
                        path: ":id/edit",
                        element: <InventoryItemFormPage />,
                    },
                ],
            },
            ...otherRoutes,
        ],
    },
]);
