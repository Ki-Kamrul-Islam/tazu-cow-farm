import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useWaterRecords } from "../hooks/useWaterRecords.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { WATER_PURPOSES } from "../../../constants/farmOperations.js";
import { FarmOperationsTabs } from "../components/FarmOperationsTabs.jsx";

export function WaterListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        purpose,
        setPurpose,
        totalQuantity,
        totalCost,
        deleteRecord,
    } = useWaterRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "purpose",
            header: t("water.fields.purpose"),
            render: (row) => t(`water.purpose.${row.purpose}`),
        },
        { key: "date", header: t("water.fields.date") },
        {
            key: "quantity",
            header: t("water.fields.quantity"),
            render: (row) => `${row.quantity} লিটার`,
        },
        {
            key: "cost",
            header: t("water.fields.cost"),
            render: (row) => `৳${row.cost.toFixed(2)}`,
        },
        {
            key: "actions",
            header: t("water.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            navigate(`/farm-operations/water/${row.id}/edit`)
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
                title={t("nav.farmOperations")}
                description={t("water.list.description")}
                action={
                    <Button
                        onClick={() => navigate("/farm-operations/water/add")}
                    >
                        {t("water.actions.addWater")}
                    </Button>
                }
            />
            <FarmOperationsTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("water.stats.totalQuantity")}
                    value={`${totalQuantity} লিটার`}
                    icon="💧"
                    variant="info"
                />
                <StatCard
                    label={t("water.stats.totalCost")}
                    value={`৳${totalCost.toFixed(2)}`}
                    icon="💰"
                    variant="success"
                />
            </div>

            <div className="mb-4 max-w-xs">
                <Select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder={t("water.list.filterByPurpose")}
                    options={WATER_PURPOSES.map((value) => ({
                        value,
                        label: t(`water.purpose.${value}`),
                    }))}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="💧"
                    title={t("water.list.emptyTitle")}
                    description={t("water.list.emptyDescription")}
                    action={
                        <Button
                            onClick={() =>
                                navigate("/farm-operations/water/add")
                            }
                        >
                            {t("water.actions.addWater")}
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
                title={t("water.deleteDialog.title")}
                message={t("water.deleteDialog.message")}
            />
        </div>
    );
}
