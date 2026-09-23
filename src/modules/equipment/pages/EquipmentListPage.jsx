import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useEquipments } from "../hooks/useEquipments.js";
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
import { EQUIPMENT_STATUSES } from "../../../constants/equipment.js";
import { EquipmentTabs } from "../components/EquipmentTabs.jsx";

const STATUS_BADGE_VARIANT = {
    active: "success",
    under_maintenance: "warning",
    retired: "neutral",
};

export function EquipmentListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        equipments,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteEquipment,
    } = useEquipments();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "name", header: t("equipmentItem.fields.name") },
        {
            key: "type",
            header: t("equipmentItem.fields.type"),
            render: (row) => t(`equipmentItem.type.${row.type}`),
        },
        { key: "purchaseDate", header: t("equipmentItem.fields.purchaseDate") },
        {
            key: "purchaseCost",
            header: t("equipmentItem.fields.purchaseCost"),
            render: (row) => `৳${row.purchaseCost.toFixed(2)}`,
        },
        {
            key: "status",
            header: t("equipmentItem.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`equipmentItem.status.${row.status}`)}
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
                        onClick={() => navigate(`/equipment/${row.id}/edit`)}
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
                title={t("nav.equipment")}
                description={t("equipmentItem.list.description")}
                action={
                    <Button onClick={() => navigate("/equipment/add")}>
                        {t("equipmentItem.actions.addEquipment")}
                    </Button>
                }
            />
            <EquipmentTabs />

            {hasAny && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4">
                    <SearchBox
                        placeholder={t("equipmentItem.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...EQUIPMENT_STATUSES.map((value) => ({
                                value,
                                label: t(`equipmentItem.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAny ?
                <EmptyState
                    icon="🚜"
                    title={t("equipmentItem.list.emptyTitle")}
                    description={t("equipmentItem.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/equipment/add")}>
                            {t("equipmentItem.actions.addEquipment")}
                        </Button>
                    }
                />
            :   <>
                    <Table columns={columns} data={equipments} />
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
                    deleteEquipment(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("equipmentItem.deleteDialog.title")}
                message={t("equipmentItem.deleteDialog.message")}
            />
        </div>
    );
}
