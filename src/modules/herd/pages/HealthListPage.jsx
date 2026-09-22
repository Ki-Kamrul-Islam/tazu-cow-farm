import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useHealthRecords } from "../hooks/useHealthRecords.js";
import { HerdTabs } from "../components/HerdTabs.jsx";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { HEALTH_RECORD_TYPES } from "../../../constants/health.js";
import { isWithinNextDays } from "../../../utils/date.js";

const TYPE_BADGE_VARIANT = {
    vaccination: "success",
    deworming: "info",
    treatment: "warning",
    checkup: "neutral",
};

export function HealthListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { records, loading, type, setType, deleteRecord } =
        useHealthRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "animal",
            header: t("health.fields.animal"),
            render: (row) => row.animal?.name ?? row.animal?.animalId ?? "-",
        },
        {
            key: "type",
            header: t("health.fields.type"),
            render: (row) => (
                <Badge variant={TYPE_BADGE_VARIANT[row.type] ?? "neutral"}>
                    {t(`health.type.${row.type}`)}
                </Badge>
            ),
        },
        { key: "date", header: t("health.fields.date") },
        { key: "medicine", header: t("health.fields.medicine") },
        {
            key: "nextDueDate",
            header: t("health.fields.nextDueDate"),
            render: (row) =>
                row.nextDueDate ?
                    <span
                        className={
                            isWithinNextDays(row.nextDueDate, 7) ?
                                "text-danger font-medium"
                            :   ""
                        }
                    >
                        {row.nextDueDate}
                    </span>
                :   "-",
        },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/herd/health/${row.id}/edit`)}
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
                title={t("nav.herd")}
                description={t("health.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/health/add")}>
                        {t("health.actions.addRecord")}
                    </Button>
                }
            />

            <HerdTabs />

            <div className="my-4 max-w-xs">
                <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    options={[
                        { value: "", label: t("common.all") },
                        ...HEALTH_RECORD_TYPES.map((value) => ({
                            value,
                            label: t(`health.type.${value}`),
                        })),
                    ]}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="💉"
                    title={t("health.list.emptyTitle")}
                    description={t("health.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/health/add")}>
                            {t("health.actions.addRecord")}
                        </Button>
                    }
                />
            :   <Table
                    columns={columns}
                    data={records}
                    emptyMessage={t("herd.list.noResults")}
                />
            }

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteRecord(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("health.deleteDialog.title")}
                message={t("health.deleteDialog.message")}
            />
        </div>
    );
}
