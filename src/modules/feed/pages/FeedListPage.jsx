import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFeedRecords } from "../hooks/useFeedRecords.js";
import { feedService } from "../../../services/feed/feedService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { FeedTabs } from "../components/FeedTabs.jsx";

export function FeedListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        feedTypeId,
        setFeedTypeId,
        date,
        setDate,
        todayCost,
        filteredCost,
        deleteRecord,
    } = useFeedRecords();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const feedTypeOptions = feedService.getActiveFeedTypes().map((f) => ({
        value: f.id,
        label: f.name,
    }));

    const columns = [
        {
            key: "feedType",
            header: t("feedType.fields.name"),
            render: (row) => row.feedType?.name ?? "-",
        },
        { key: "date", header: t("feeding.fields.date") },
        {
            key: "group",
            header: t("feeding.fields.group"),
            render: (row) => row.group || "-",
        },
        {
            key: "quantity",
            header: t("feeding.fields.quantity"),
            render: (row) =>
                `${row.quantity} ${row.feedType ? t(`feedType.unit.${row.feedType.unit}`) : ""}`,
        },
        {
            key: "cost",
            header: t("feeding.fields.cost"),
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
                        onClick={() => navigate(`/feed/${row.id}/edit`)}
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
                title={t("nav.feed")}
                description={t("feeding.list.description")}
                action={
                    <Button onClick={() => navigate("/feed/add")}>
                        {t("feeding.actions.addFeeding")}
                    </Button>
                }
            />
            <FeedTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("feeding.stats.todayCost")}
                    value={`৳${todayCost.toFixed(2)}`}
                    icon="🌾"
                    variant="info"
                />
                <StatCard
                    label={t("feeding.stats.filteredCost")}
                    value={`৳${filteredCost.toFixed(2)}`}
                    icon="📊"
                    variant="success"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={feedTypeId}
                    onChange={(e) => setFeedTypeId(e.target.value)}
                    placeholder={t("feeding.list.filterByFeedType")}
                    options={feedTypeOptions}
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
                    icon="🌾"
                    title={t("feeding.list.emptyTitle")}
                    description={t("feeding.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/feed/add")}>
                            {t("feeding.actions.addFeeding")}
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
                title={t("feeding.deleteDialog.title")}
                message={t("feeding.deleteDialog.message")}
            />
        </div>
    );
}
