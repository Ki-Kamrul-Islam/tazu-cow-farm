import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useInventoryOverview } from "../hooks/useInventoryOverview.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { Badge } from "../../../components/common/Badge.jsx";

export function InventoryOverviewPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const { overview, loading } = useInventoryOverview();

    if (loading) {
        return <LoadingState />;
    }

    const lowStockColumns = [
        {
            key: "name",
            header: t("inventoryItem.fields.name"),
        },
        {
            key: "sku",
            header: t("inventoryItem.fields.sku"),
        },
        {
            key: "quantity",
            header: t("inventoryItem.fields.quantity"),
            render: (row) => (
                <span className="font-semibold text-danger">
                    {row.quantity} {t(`inventoryItem.unit.${row.unit}`)}
                </span>
            ),
        },
        {
            key: "reorderLevel",
            header: t("inventoryItem.fields.reorderLevel"),
            render: (row) =>
                `${row.reorderLevel} ${t(`inventoryItem.unit.${row.unit}`)}`,
        },
    ];

    const recentColumns = [
        {
            key: "name",
            header: t("inventoryItem.fields.name"),
        },
        {
            key: "sku",
            header: t("inventoryItem.fields.sku"),
        },
        {
            key: "category",
            header: t("inventoryItem.fields.category"),
            render: (row) => t(`inventoryItem.category.${row.category}`),
        },
        {
            key: "status",
            header: t("inventoryItem.fields.status"),
            render: (row) => (
                <Badge
                    variant={row.status === "active" ? "success" : "neutral"}
                >
                    {t(`inventoryItem.status.${row.status}`)}
                </Badge>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("inventoryOverview.title")}
                description={t("inventoryOverview.description")}
                action={
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/inventory")}
                        >
                            {t("inventoryOverview.actions.viewItems")}
                        </Button>

                        <Button onClick={() => navigate("/inventory/add")}>
                            {t("inventoryItem.actions.addItem")}
                        </Button>
                    </div>
                }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <StatCard
                    label={t("inventoryOverview.stats.totalItems")}
                    value={overview.totalItems}
                    icon="📦"
                    variant="info"
                />

                <StatCard
                    label={t("inventoryOverview.stats.activeItems")}
                    value={overview.activeItems}
                    icon="✅"
                    variant="success"
                />

                <StatCard
                    label={t("inventoryOverview.stats.lowStock")}
                    value={overview.lowStockItems.length}
                    icon="⚠️"
                    variant="warning"
                />

                <StatCard
                    label={t("inventoryOverview.stats.outOfStock")}
                    value={overview.outOfStockItems.length}
                    icon="🚫"
                    variant="danger"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
                <Card>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">
                        {t("inventoryOverview.categoryTitle")}
                    </h2>

                    {Object.keys(overview.categoryCounts).length === 0 ?
                        <p className="text-sm text-text-muted">
                            {t("inventoryOverview.noCategoryData")}
                        </p>
                    :   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {Object.entries(overview.categoryCounts).map(
                                ([category, count]) => (
                                    <div
                                        key={category}
                                        className="border border-border rounded-xl p-3"
                                    >
                                        <p className="text-sm text-text-muted">
                                            {t(
                                                `inventoryItem.category.${category}`,
                                            )}
                                        </p>

                                        <p className="text-xl font-bold text-text-primary mt-1">
                                            {count}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>
                    }
                </Card>

                <Card>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">
                        {t("inventoryOverview.lowStockTitle")}
                    </h2>

                    {overview.lowStockItems.length === 0 ?
                        <EmptyState
                            icon="✅"
                            title={t("inventoryOverview.noLowStockTitle")}
                            description={t(
                                "inventoryOverview.noLowStockDescription",
                            )}
                        />
                    :   <Table
                            columns={lowStockColumns}
                            data={overview.lowStockItems.slice(0, 5)}
                        />
                    }
                </Card>
            </div>

            <Card>
                <div className="flex items-center justify-between gap-3 mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">
                        {t("inventoryOverview.recentTitle")}
                    </h2>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/inventory")}
                    >
                        {t("inventoryOverview.actions.viewItems")}
                    </Button>
                </div>

                {overview.recentItems.length === 0 ?
                    <EmptyState
                        icon="📦"
                        title={t("inventoryOverview.noItemsTitle")}
                        description={t("inventoryOverview.noItemsDescription")}
                        action={
                            <Button onClick={() => navigate("/inventory/add")}>
                                {t("inventoryItem.actions.addItem")}
                            </Button>
                        }
                    />
                :   <Table
                        columns={recentColumns}
                        data={overview.recentItems}
                    />
                }
            </Card>
        </div>
    );
}
