import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useManureRecords } from "../hooks/useManureRecords.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { MANURE_TYPES } from "../../../constants/farmOperations.js";
import { FarmOperationsTabs } from "../components/FarmOperationsTabs.jsx";

export function ManureListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        type,
        setType,
        totalQuantity,
        filteredQuantity,
        deleteRecord,
    } = useManureRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "type",
            header: t("manure.fields.type"),
            render: (row) => t(`manure.type.${row.type}`),
        },
        { key: "date", header: t("manure.fields.date") },
        {
            key: "quantity",
            header: t("manure.fields.quantity"),
            render: (row) => `${row.quantity} কেজি`,
        },
        {
            key: "actions",
            header: t("manure.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            navigate(`/farm-operations/${row.id}/edit`)
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
                description={t("manure.list.description")}
                action={
                    <Button onClick={() => navigate("/farm-operations/add")}>
                        {t("manure.actions.addManure")}
                    </Button>
                }
            />
            <FarmOperationsTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("manure.stats.totalQuantity")}
                    value={`${totalQuantity} কেজি`}
                    icon="♻️"
                    variant="success"
                />
                <StatCard
                    label={t("manure.stats.filteredQuantity")}
                    value={`${filteredQuantity} কেজি`}
                    icon="📊"
                    variant="info"
                />
            </div>

            <div className="mb-4 max-w-xs">
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder={t("manure.list.filterByType")}
                    options={MANURE_TYPES.map((value) => ({
                        value,
                        label: t(`manure.type.${value}`),
                    }))}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="♻️"
                    title={t("manure.list.emptyTitle")}
                    description={t("manure.list.emptyDescription")}
                    action={
                        <Button
                            onClick={() => navigate("/farm-operations/add")}
                        >
                            {t("manure.actions.addManure")}
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
                title={t("manure.deleteDialog.title")}
                message={t("manure.deleteDialog.message")}
            />
        </div>
    );
}
