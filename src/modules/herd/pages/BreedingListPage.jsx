import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useBreedingRecords } from "../hooks/useBreedingRecords.js";
import { HerdTabs } from "../components/HerdTabs.jsx";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { BREEDING_STATUSES } from "../../../constants/breeding.js";

const STATUS_BADGE_VARIANT = {
    open: "neutral",
    bred: "info",
    pregnant: "success",
    calved: "success",
    aborted: "danger",
};

export function BreedingListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { records, loading, status, setStatus, deleteRecord } =
        useBreedingRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "animal",
            header: t("breeding.fields.animal"),
            render: (row) => row.animal?.name ?? row.animal?.animalId ?? "-",
        },
        { key: "breedingDate", header: t("breeding.fields.breedingDate") },
        {
            key: "method",
            header: t("breeding.fields.method"),
            render: (row) => t(`breeding.method.${row.method}`),
        },
        {
            key: "status",
            header: t("breeding.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`breeding.status.${row.status}`)}
                </Badge>
            ),
        },
        {
            key: "expectedCalvingDate",
            header: t("breeding.fields.expectedCalvingDate"),
            render: (row) => row.expectedCalvingDate || "-",
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
                            navigate(`/herd/breeding/${row.id}/edit`)
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
                title={t("nav.herd")}
                description={t("breeding.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/breeding/add")}>
                        {t("breeding.actions.addRecord")}
                    </Button>
                }
            />

            <HerdTabs />

            <div className="my-4 max-w-xs">
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    options={[
                        { value: "", label: t("common.all") },
                        ...BREEDING_STATUSES.map((value) => ({
                            value,
                            label: t(`breeding.status.${value}`),
                        })),
                    ]}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="🐮"
                    title={t("breeding.list.emptyTitle")}
                    description={t("breeding.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/breeding/add")}>
                            {t("breeding.actions.addRecord")}
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
                title={t("breeding.deleteDialog.title")}
                message={t("breeding.deleteDialog.message")}
            />
        </div>
    );
}
