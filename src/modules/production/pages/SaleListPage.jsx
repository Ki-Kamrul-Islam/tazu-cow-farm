import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useSales } from "../hooks/useSales.js";
import { saleService } from "../../../services/production/saleService.js";
import { ProductionTabs } from "../components/ProductionTabs.jsx";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";

const STATUS_BADGE_VARIANT = {
    paid: "success",
    partial: "warning",
    due: "danger",
};

export function SaleListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        sales,
        loading,
        customerId,
        setCustomerId,
        date,
        setDate,
        todayRevenue,
        totalDue,
        deleteSale,
    } = useSales();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const customerOptions = saleService.getCustomers().map((c) => ({
        value: c.id,
        label: `${c.name} — ${c.phone}`,
    }));

    const columns = [
        {
            key: "customer",
            header: t("sales.fields.customer"),
            render: (row) => row.customer?.name ?? "-",
        },
        { key: "date", header: t("sales.fields.date") },
        {
            key: "quantity",
            header: t("sales.fields.quantity"),
            render: (row) => `${row.quantity} ${t("milk.units.liters")}`,
        },
        {
            key: "totalAmount",
            header: t("sales.fields.totalAmount"),
            render: (row) =>
                `${t("dashboard.units.currency")} ${row.totalAmount}`,
        },
        {
            key: "dueAmount",
            header: t("sales.fields.dueAmount"),
            render: (row) =>
                `${t("dashboard.units.currency")} ${row.dueAmount}`,
        },
        {
            key: "status",
            header: t("sales.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`sales.status.${row.status}`)}
                </Badge>
            ),
        },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            navigate(`/production/sales/${row.id}/edit`)
                        }
                    >
                        {t("herd.actions.edit")}
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setPendingDeleteId(row.id)}
                    >
                        {t("herd.actions.delete")}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("nav.production")}
                description={t("sales.list.description")}
                action={
                    <Button onClick={() => navigate("/production/sales/add")}>
                        {t("sales.actions.addSale")}
                    </Button>
                }
            />
            <ProductionTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 max-w-xl">
                <StatCard
                    label={t("sales.stats.todayRevenue")}
                    value={`${t("dashboard.units.currency")} ${todayRevenue}`}
                    icon="💰"
                    variant="success"
                />
                <StatCard
                    label={t("sales.stats.totalDue")}
                    value={`${t("dashboard.units.currency")} ${totalDue}`}
                    icon="⚠️"
                    variant="danger"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder={t("sales.list.filterByCustomer")}
                    options={customerOptions}
                />
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {loading ?
                <LoadingState />
            : sales.length === 0 ?
                <EmptyState
                    icon="🧾"
                    title={t("sales.list.emptyTitle")}
                    description={t("sales.list.emptyDescription")}
                    action={
                        <Button
                            onClick={() => navigate("/production/sales/add")}
                        >
                            {t("sales.actions.addSale")}
                        </Button>
                    }
                />
            :   <Table
                    columns={columns}
                    data={sales}
                    emptyMessage={t("herd.list.noResults")}
                />
            }

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteSale(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("sales.deleteDialog.title")}
                message={t("sales.deleteDialog.message")}
            />
        </div>
    );
}
