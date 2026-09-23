import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useInventoryItems } from "../hooks/useInventoryItems.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { SearchBox } from "../../../components/common/SearchBox.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Pagination } from "../../../components/tables/Pagination.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";

import {
    INVENTORY_CATEGORIES,
    INVENTORY_STATUSES,
} from "../../../constants/inventory.js";

const STATUS_BADGE_VARIANT = {
    active: "success",
    inactive: "neutral",
};

export function InventoryItemListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const {
        items,
        hasAny,
        loading,

        search,
        setSearch,

        category,
        setCategory,

        status,
        setStatus,

        page,
        totalPages,
        setPage,

        deleteItem,
    } = useInventoryItems();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
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
            key: "quantity",
            header: t("inventoryItem.fields.quantity"),
            render: (row) => {
                const isLowStock =
                    Number(row.quantity) <= Number(row.reorderLevel);

                return (
                    <span
                        className={
                            isLowStock ? "font-semibold text-danger" : ""
                        }
                    >
                        {row.quantity} {t(`inventoryItem.unit.${row.unit}`)}
                    </span>
                );
            },
        },
        {
            key: "reorderLevel",
            header: t("inventoryItem.fields.reorderLevel"),
            render: (row) =>
                `${row.reorderLevel} ${t(`inventoryItem.unit.${row.unit}`)}`,
        },
        {
            key: "status",
            header: t("inventoryItem.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`inventoryItem.status.${row.status}`)}
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
                        onClick={() => navigate(`/inventory/${row.id}/edit`)}
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
                title={t("nav.inventory")}
                description={t("inventoryItem.list.description")}
                action={
                    <Button onClick={() => navigate("/inventory/add")}>
                        {t("inventoryItem.actions.addItem")}
                    </Button>
                }
            />

            {hasAny && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                    <SearchBox
                        placeholder={t("inventoryItem.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />

                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        options={[
                            {
                                value: "",
                                label: t("common.all"),
                            },
                            ...INVENTORY_CATEGORIES.map((value) => ({
                                value,
                                label: t(`inventoryItem.category.${value}`),
                            })),
                        ]}
                    />

                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            {
                                value: "",
                                label: t("common.all"),
                            },
                            ...INVENTORY_STATUSES.map((value) => ({
                                value,
                                label: t(`inventoryItem.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAny ?
                <EmptyState
                    icon="📦"
                    title={t("inventoryItem.list.emptyTitle")}
                    description={t("inventoryItem.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/inventory/add")}>
                            {t("inventoryItem.actions.addItem")}
                        </Button>
                    }
                />
            :   <>
                    <Table
                        columns={columns}
                        data={items}
                        emptyMessage={t("inventoryItem.list.noResults")}
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            }

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteItem(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("inventoryItem.deleteDialog.title")}
                message={t("inventoryItem.deleteDialog.message")}
            />
        </div>
    );
}
