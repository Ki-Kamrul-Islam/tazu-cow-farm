import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useMaintenanceRecords } from "../hooks/useMaintenanceRecords.js";
import { equipmentService } from "../../../services/equipment/equipmentService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { MAINTENANCE_TYPES } from "../../../constants/equipment.js";
import { EquipmentTabs } from "../components/EquipmentTabs.jsx";

export function MaintenanceListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        equipmentId,
        setEquipmentId,
        type,
        setType,
        totalCost,
        filteredCost,
        deleteRecord,
    } = useMaintenanceRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const equipmentOptions = equipmentService.listActive().map((e) => ({
        value: e.id,
        label: e.name,
    }));

    const columns = [
        {
            key: "equipment",
            header: t("equipmentItem.fields.name"),
            render: (row) => row.equipment?.name ?? "-",
        },
        {
            key: "type",
            header: t("maintenance.fields.type"),
            render: (row) => t(`maintenance.type.${row.type}`),
        },
        { key: "date", header: t("maintenance.fields.date") },
        {
            key: "cost",
            header: t("maintenance.fields.cost"),
            render: (row) => `৳${row.cost.toFixed(2)}`,
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
                            navigate(`/equipment/maintenance/${row.id}/edit`)
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
                title={t("nav.equipment")}
                description={t("maintenance.list.description")}
                action={
                    <Button
                        onClick={() => navigate("/equipment/maintenance/add")}
                    >
                        {t("maintenance.actions.addMaintenance")}
                    </Button>
                }
            />
            <EquipmentTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("maintenance.stats.totalCost")}
                    value={`৳${totalCost.toFixed(2)}`}
                    icon="🔧"
                    variant="info"
                />
                <StatCard
                    label={t("maintenance.stats.filteredCost")}
                    value={`৳${filteredCost.toFixed(2)}`}
                    icon="📊"
                    variant="success"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={equipmentId}
                    onChange={(e) => setEquipmentId(e.target.value)}
                    placeholder={t("maintenance.list.filterByEquipment")}
                    options={equipmentOptions}
                />
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder={t("maintenance.list.filterByType")}
                    options={MAINTENANCE_TYPES.map((value) => ({
                        value,
                        label: t(`maintenance.type.${value}`),
                    }))}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="🔧"
                    title={t("maintenance.list.emptyTitle")}
                    description={t("maintenance.list.emptyDescription")}
                    action={
                        <Button
                            onClick={() =>
                                navigate("/equipment/maintenance/add")
                            }
                        >
                            {t("maintenance.actions.addMaintenance")}
                        </Button>
                    }
                />
            :   <Table columns={columns} data={records} />}

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteRecord(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("maintenance.deleteDialog.title")}
                message={t("maintenance.deleteDialog.message")}
            />
        </div>
    );
}
