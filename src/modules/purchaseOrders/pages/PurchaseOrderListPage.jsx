import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { usePurchaseOrderList } from "../hooks/usePurchaseOrderList.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { Table } from "../../../components/tables/Table.jsx";

export function PurchaseOrderListPage() {
    const navigate = useNavigate();

    const { t } = useLanguage();

    const {
        filteredOrders,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        loading,

        updateStatus,
        remove,
    } = usePurchaseOrderList();

    if (loading) {
        return <LoadingState />;
    }

    const columns = [
        {
            key: "poNumber",
            header: t("purchaseOrder.fields.poNumber"),
        },

        {
            key: "supplierId",
            header: t("purchaseOrder.fields.supplier"),
            render: (row) => row.supplierId,
        },

        {
            key: "orderDate",
            header: t("purchaseOrder.fields.orderDate"),
        },

        {
            key: "expectedDate",
            header: t("purchaseOrder.fields.expectedDate"),
            render: (row) => row.expectedDate || "—",
        },

        {
            key: "total",
            header: t("purchaseOrder.fields.total"),
            render: (row) => `৳${Number(row.total || 0).toFixed(2)}`,
        },

        {
            key: "status",
            header: t("purchaseOrder.fields.status"),
            render: (row) => (
                <Badge
                    variant={
                        row.status === "received" ? "success"
                        : row.status === "cancelled" ?
                            "danger"
                        : row.status === "ordered" ?
                            "info"
                        :   "warning"
                    }
                >
                    {t(`purchaseOrder.status.${row.status}`)}
                </Badge>
            ),
        },

        {
            key: "actions",
            header: t("purchaseOrder.fields.actions"),
            render: (row) => (
                <div className="flex flex-wrap gap-2">
                    {row.status === "draft" && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                navigate(`/purchase-orders/${row.id}/edit`)
                            }
                        >
                            {t("purchaseOrder.actions.edit")}
                        </Button>
                    )}

                    {row.status === "draft" && (
                        <Button
                            size="sm"
                            onClick={() => updateStatus(row.id, "ordered")}
                        >
                            {t("purchaseOrder.actions.markOrdered")}
                        </Button>
                    )}

                    {row.status !== "received" &&
                        row.status !== "cancelled" && (
                            <Button
                                size="sm"
                                variant="danger"
                                onClick={() =>
                                    updateStatus(row.id, "cancelled")
                                }
                            >
                                {t("purchaseOrder.actions.cancel")}
                            </Button>
                        )}

                    {row.status === "draft" && (
                        <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        t("purchaseOrder.confirmDelete"),
                                    )
                                ) {
                                    remove(row.id);
                                }
                            }}
                        >
                            {t("purchaseOrder.actions.delete")}
                        </Button>
                    )}

                    {(row.status === "ordered" ||
                        row.status === "partially_received") && (
                        <Button
                            size="sm"
                            onClick={() =>
                                navigate(`/purchase-orders/${row.id}/receive`)
                            }
                        >
                            {t("purchaseOrder.actions.receive")}
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("purchaseOrder.title")}
                description={t("purchaseOrder.description")}
                action={
                    <Button onClick={() => navigate("/purchase-orders/add")}>
                        {t("purchaseOrder.actions.create")}
                    </Button>
                }
            />

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    <Input
                        value={search}
                        placeholder={t("purchaseOrder.searchPlaceholder")}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                    >
                        <option value="all">
                            {t("purchaseOrder.filters.all")}
                        </option>

                        <option value="draft">
                            {t("purchaseOrder.status.draft")}
                        </option>

                        <option value="ordered">
                            {t("purchaseOrder.status.ordered")}
                        </option>

                        <option value="partially_received">
                            {t("purchaseOrder.status.partially_received")}
                        </option>

                        <option value="received">
                            {t("purchaseOrder.status.received")}
                        </option>

                        <option value="cancelled">
                            {t("purchaseOrder.status.cancelled")}
                        </option>
                    </select>
                </div>

                {filteredOrders.length === 0 ?
                    <EmptyState
                        icon="📋"
                        title={t("purchaseOrder.empty.title")}
                        description={t("purchaseOrder.empty.description")}
                        action={
                            <Button
                                onClick={() => navigate("/purchase-orders/add")}
                            >
                                {t("purchaseOrder.actions.create")}
                            </Button>
                        }
                    />
                :   <Table columns={columns} data={filteredOrders} />}
            </Card>
        </div>
    );
}
