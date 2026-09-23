import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useCropRecords } from "../hooks/useCropRecords.js";
import { fieldService } from "../../../services/land/fieldService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { CROP_TYPES } from "../../../constants/land.js";
import { LandTabs } from "../components/LandTabs.jsx";

const STATUS_BADGE_VARIANT = { growing: "info", harvested: "success" };

export function CropListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        fieldId,
        setFieldId,
        cropType,
        setCropType,
        totalCost,
        growingCount,
        deleteRecord,
    } = useCropRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const fieldOptions = fieldService.listActive().map((f) => ({
        value: f.id,
        label: f.name,
    }));

    const columns = [
        {
            key: "cropType",
            header: t("crop.fields.cropType"),
            render: (row) => t(`crop.type.${row.cropType}`),
        },
        {
            key: "field",
            header: t("field.fields.name"),
            render: (row) => row.field?.name ?? "-",
        },
        { key: "plantingDate", header: t("crop.fields.plantingDate") },
        {
            key: "status",
            header: t("crop.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status]}>
                    {t(`crop.status.${row.status}`)}
                </Badge>
            ),
        },
        {
            key: "cost",
            header: t("crop.fields.cost"),
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
                        onClick={() => navigate(`/land/crops/${row.id}/edit`)}
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
                title={t("nav.land")}
                description={t("crop.list.description")}
                action={
                    <Button onClick={() => navigate("/land/crops/add")}>
                        {t("crop.actions.addCrop")}
                    </Button>
                }
            />
            <LandTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("crop.stats.totalCost")}
                    value={`৳${totalCost.toFixed(2)}`}
                    icon="🌱"
                    variant="info"
                />
                <StatCard
                    label={t("crop.stats.growingCount")}
                    value={growingCount}
                    icon="🌿"
                    variant="success"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={fieldId}
                    onChange={(e) => setFieldId(e.target.value)}
                    placeholder={t("crop.list.filterByField")}
                    options={fieldOptions}
                />
                <Select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    placeholder={t("crop.list.filterByCropType")}
                    options={CROP_TYPES.map((value) => ({
                        value,
                        label: t(`crop.type.${value}`),
                    }))}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="🌱"
                    title={t("crop.list.emptyTitle")}
                    description={t("crop.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/land/crops/add")}>
                            {t("crop.actions.addCrop")}
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
                title={t("crop.deleteDialog.title")}
                message={t("crop.deleteDialog.message")}
            />
        </div>
    );
}
