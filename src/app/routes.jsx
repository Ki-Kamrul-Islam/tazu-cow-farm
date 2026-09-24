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
import { SupplierListPage } from "../modules/suppliers/pages/SupplierListPage.jsx";
import { SupplierFormPage } from "../modules/suppliers/pages/SupplierFormPage.jsx";
//
import { PurchaseOrderListPage } from "../modules/purchaseOrders/pages/PurchaseOrderListPage.jsx";
import { PurchaseOrderFormPage } from "../modules/purchaseOrders/pages/PurchaseOrderFormPage.jsx";
//
import { GoodsReceivedPage } from "../modules/goodsReceived/pages/GoodsReceivedPage.jsx";
//
import StockAdjustmentPage from "../modules/inventory/pages/StockAdjustmentPage";
import StockHistoryPage from "../modules/inventory/pages/StockHistoryPage";
import CurrentStockLedgerPage from "../modules/inventory/pages/CurrentStockLedgerPage";
//
import { EquipmentListPage } from "../modules/equipment/pages/EquipmentListPage.jsx";
import { EquipmentFormPage } from "../modules/equipment/pages/EquipmentFormPage.jsx";
//
import { MaintenanceListPage } from "../modules/equipment/pages/MaintenanceListPage.jsx";
import { MaintenanceFormPage } from "../modules/equipment/pages/MaintenanceFormPage.jsx";
//
import { ExpenseListPage } from "../modules/finance/pages/ExpenseListPage.jsx";
import { ExpenseFormPage } from "../modules/finance/pages/ExpenseFormPage.jsx";
//
import { IncomeListPage } from "../modules/finance/pages/IncomeListPage.jsx";
import { IncomeFormPage } from "../modules/finance/pages/IncomeFormPage.jsx";
//
import { EmployeeListPage } from "../modules/team/pages/EmployeeListPage.jsx";
import { EmployeeFormPage } from "../modules/team/pages/EmployeeFormPage.jsx";
//
import { TaskListPage } from "../modules/team/pages/TaskListPage.jsx";
import { TaskFormPage } from "../modules/team/pages/TaskFormPage.jsx";
//
import { FinancialReportPage } from "../modules/reports/pages/FinancialReportPage.jsx";
//
import { FarmReportPage } from "../modules/reports/pages/FarmReportPage.jsx";
//
import { AlertsListPage } from "../modules/calendar/pages/AlertsListPage.jsx";
//
import { CalendarViewPage } from "../modules/calendar/pages/CalendarViewPage.jsx";
//
import { ManureListPage } from "../modules/farm-operations/pages/ManureListPage.jsx";
import { ManureFormPage } from "../modules/farm-operations/pages/ManureFormPage.jsx";
import { WaterListPage } from "../modules/farm-operations/pages/WaterListPage.jsx";
import { WaterFormPage } from "../modules/farm-operations/pages/WaterFormPage.jsx";
//
import { FarmSettingsPage } from "../modules/system/pages/FarmSettingsPage.jsx";
import { DataManagementPage } from "../modules/system/pages/DataManagementPage.jsx";
//
import { AnimalGroupListPage } from "../modules/herd/pages/AnimalGroupListPage.jsx";
import { AnimalGroupFormPage } from "../modules/herd/pages/AnimalGroupFormPage.jsx";
import { AnimalTransferListPage } from "../modules/herd/pages/AnimalTransferListPage.jsx";
import { AnimalTransferFormPage } from "../modules/herd/pages/AnimalTransferFormPage.jsx";
//
//
const implementedRouteKeys = new Set([
    "dashboard",
    "herd",
    "production",
    "feed",
    "land",
    "inventory",
    "equipment",
    "finance",
    "team",
    "reports",
    "calendar",
]);

const otherRoutes = navigationConfig
    .filter((item) => !implementedRouteKeys.has(item.key))
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
                    { path: "groups", element: <AnimalGroupListPage /> },
                    { path: "groups/add", element: <AnimalGroupFormPage /> },
                    {
                        path: "groups/:id/edit",
                        element: <AnimalGroupFormPage />,
                    },
                    { path: "transfers", element: <AnimalTransferListPage /> },
                    {
                        path: "transfers/add",
                        element: <AnimalTransferFormPage />,
                    },
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

            {
                path: "suppliers",
                children: [
                    {
                        index: true,
                        element: <SupplierListPage />,
                    },
                    {
                        path: "add",
                        element: <SupplierFormPage />,
                    },
                    {
                        path: ":id/edit",
                        element: <SupplierFormPage />,
                    },
                ],
            },

            {
                path: "purchase-orders",
                children: [
                    {
                        index: true,
                        element: <PurchaseOrderListPage />,
                    },

                    {
                        path: "add",
                        element: <PurchaseOrderFormPage />,
                    },

                    {
                        path: ":id/edit",
                        element: <PurchaseOrderFormPage />,
                    },

                    {
                        path: ":id/receive",
                        element: <GoodsReceivedPage />,
                    },
                ],
            },

            {
                path: "inventory/stock-adjustment",
                element: <StockAdjustmentPage />,
            },

            {
                path: "inventory/stock-history",
                element: <StockHistoryPage />,
            },

            {
                path: "inventory/current-stock",
                element: <CurrentStockLedgerPage />,
            },

            {
                path: "equipment",
                children: [
                    { index: true, element: <EquipmentListPage /> },
                    { path: "add", element: <EquipmentFormPage /> },
                    { path: ":id/edit", element: <EquipmentFormPage /> },
                    {
                        path: "maintenance",
                        element: <MaintenanceListPage />,
                    },
                    {
                        path: "maintenance/add",
                        element: <MaintenanceFormPage />,
                    },
                    {
                        path: "maintenance/:id/edit",
                        element: <MaintenanceFormPage />,
                    },
                ],
            },

            {
                path: "finance",
                children: [
                    { index: true, element: <ExpenseListPage /> },
                    { path: "add", element: <ExpenseFormPage /> },
                    { path: ":id/edit", element: <ExpenseFormPage /> },
                    { path: "income", element: <IncomeListPage /> },
                    { path: "income/add", element: <IncomeFormPage /> },
                    {
                        path: "income/:id/edit",
                        element: <IncomeFormPage />,
                    },
                ],
            },

            {
                path: "team",
                children: [
                    { index: true, element: <EmployeeListPage /> },
                    { path: "add", element: <EmployeeFormPage /> },
                    { path: ":id/edit", element: <EmployeeFormPage /> },
                    { path: "tasks", element: <TaskListPage /> },
                    { path: "tasks/add", element: <TaskFormPage /> },
                    { path: "tasks/:id/edit", element: <TaskFormPage /> },
                ],
            },

            {
                path: "reports",
                children: [
                    { index: true, element: <FinancialReportPage /> },
                    { path: "farm", element: <FarmReportPage /> },
                ],
            },

            {
                path: "calendar",
                children: [
                    { index: true, element: <AlertsListPage /> },
                    { path: "view", element: <CalendarViewPage /> },
                ],
            },

            {
                path: "farm-operations",
                children: [
                    { index: true, element: <ManureListPage /> },
                    { path: "add", element: <ManureFormPage /> },
                    { path: ":id/edit", element: <ManureFormPage /> },
                    { path: "water", element: <WaterListPage /> },
                    { path: "water/add", element: <WaterFormPage /> },
                    { path: "water/:id/edit", element: <WaterFormPage /> },
                ],
            },

            {
                path: "system",
                children: [
                    { index: true, element: <FarmSettingsPage /> },
                    { path: "data", element: <DataManagementPage /> },
                ],
            },

            ...otherRoutes,
        ],
    },
]);
