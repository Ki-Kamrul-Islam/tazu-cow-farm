import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useWeightRecords } from "../hooks/useWeightRecords.js";
import { weightService } from "../../../services/herd/weightService.js";
import { HerdTabs } from "../components/HerdTabs.jsx";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";

export function WeightListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { records, loading, animalId, setAnimalId, adg, deleteRecord } =
        useWeightRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const animalOptions = weightService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const columns = [
        {
            key: "animal",
            header: t("weight.fields.animal"),
            render: (row) => row.animal?.name ?? row.animal?.animalId ?? "-",
        },
        { key: "date", header: t("weight.fields.date") },
        {
            key: "weight",
            header: t("weight.fields.weight"),
            render: (row) => `${row.weight} ${t("herd.units.kg")}`,
        },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/herd/weight/${row.id}/edit`)}
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
                description={t("weight.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/weight/add")}>
                        {t("weight.actions.addWeight")}
                    </Button>
                }
            />

            <HerdTabs />

            <div className="my-4 max-w-xs">
                <Select
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    placeholder={t("weight.list.filterByAnimal")}
                    options={animalOptions}
                />
            </div>

            {animalId && adg !== null && (
                <div className="mb-4 max-w-xs">
                    <StatCard
                        label={t("weight.stats.adg")}
                        value={`${adg.toFixed(2)} ${t("weight.units.kgPerDay")}`}
                        icon="📈"
                        variant={adg >= 0 ? "success" : "danger"}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="⚖️"
                    title={t("weight.list.emptyTitle")}
                    description={t("weight.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/weight/add")}>
                            {t("weight.actions.addWeight")}
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
                title={t("weight.deleteDialog.title")}
                message={t("weight.deleteDialog.message")}
            />
        </div>
    );
}
