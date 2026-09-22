import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useScores } from "../hooks/useScores.js";
import { scoreService } from "../../../services/herd/scoreService.js";
import { HerdTabs } from "../components/HerdTabs.jsx";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";

function scoreBadgeVariant(score) {
    if (score === null) return "neutral";
    if (score >= 4) return "success";
    if (score >= 2.5) return "warning";
    return "danger";
}

export function ScoreListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { records, loading, animalId, setAnimalId, deleteRecord } =
        useScores();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const animalOptions = scoreService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const columns = [
        {
            key: "animal",
            header: t("scoring.fields.animal"),
            render: (row) => row.animal?.name ?? row.animal?.animalId ?? "-",
        },
        { key: "date", header: t("scoring.fields.date") },
        {
            key: "bodyConditionScore",
            header: t("scoring.fields.bodyConditionScore"),
            render: (row) => row.bodyConditionScore ?? "-",
        },
        {
            key: "udderScore",
            header: t("scoring.fields.udderScore"),
            render: (row) => row.udderScore ?? "-",
        },
        {
            key: "mobilityScore",
            header: t("scoring.fields.mobilityScore"),
            render: (row) => row.mobilityScore ?? "-",
        },
        {
            key: "overallScore",
            header: t("scoring.fields.overallScore"),
            render: (row) => (
                <Badge variant={scoreBadgeVariant(row.overallScore)}>
                    {row.overallScore ?? "-"}
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
                        onClick={() => navigate(`/herd/scoring/${row.id}/edit`)}
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
                description={t("scoring.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/scoring/add")}>
                        {t("scoring.actions.addScore")}
                    </Button>
                }
            />

            <HerdTabs />

            <div className="my-4 max-w-xs">
                <Select
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    placeholder={t("scoring.list.filterByAnimal")}
                    options={animalOptions}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="⭐"
                    title={t("scoring.list.emptyTitle")}
                    description={t("scoring.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/scoring/add")}>
                            {t("scoring.actions.addScore")}
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
                title={t("scoring.deleteDialog.title")}
                message={t("scoring.deleteDialog.message")}
            />
        </div>
    );
}
