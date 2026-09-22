import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useMilkRecords } from "../hooks/useMilkRecords.js";
import { milkService } from "../../../services/production/milkService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";

export function MilkListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        animalId,
        setAnimalId,
        date,
        setDate,
        todayTotal,
        filteredTotal,
        deleteRecord,
    } = useMilkRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const animalOptions = milkService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const columns = [
        {
            key: "animal",
            header: t("milk.fields.animal"),
            render: (row) => row.animal?.name ?? row.animal?.animalId ?? "-",
        },
        { key: "date", header: t("milk.fields.date") },
        {
            key: "session",
            header: t("milk.fields.session"),
            render: (row) => t(`milk.session.${row.session}`),
        },
        {
            key: "quantity",
            header: t("milk.fields.quantity"),
            render: (row) => `${row.quantity} ${t("milk.units.liters")}`,
        },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/production/${row.id}/edit`)}
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
                title={t("nav.production")}
                description={t("milk.list.description")}
                action={
                    <Button onClick={() => navigate("/production/add")}>
                        {t("milk.actions.addMilk")}
                    </Button>
                }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <StatCard
                    label={t("milk.stats.today")}
                    value={`${todayTotal} ${t("milk.units.liters")}`}
                    icon="🥛"
                    variant="info"
                />
                <StatCard
                    label={t("milk.stats.filtered")}
                    value={`${filteredTotal} ${t("milk.units.liters")}`}
                    icon="📊"
                    variant="success"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={animalId}
                    onChange={(e) => setAnimalId(e.target.value)}
                    placeholder={t("milk.list.filterByAnimal")}
                    options={animalOptions}
                />
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="🥛"
                    title={t("milk.list.emptyTitle")}
                    description={t("milk.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/production/add")}>
                            {t("milk.actions.addMilk")}
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
                title={t("milk.deleteDialog.title")}
                message={t("milk.deleteDialog.message")}
            />
        </div>
    );
}
