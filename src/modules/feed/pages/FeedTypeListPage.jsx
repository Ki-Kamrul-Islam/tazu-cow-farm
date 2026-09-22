import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFeedTypes } from "../hooks/useFeedTypes.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { SearchBox } from "../../../components/common/SearchBox.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Pagination } from "../../../components/tables/Pagination.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { FEED_TYPE_STATUSES } from "../../../constants/feed.js";
import { FeedTabs } from "../components/FeedTabs.jsx";

const STATUS_BADGE_VARIANT = { active: "success", inactive: "neutral" };

export function FeedTypeListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        feedTypes,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteFeedType,
    } = useFeedTypes();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "name", header: t("feedType.fields.name") },
        {
            key: "category",
            header: t("feedType.fields.category"),
            render: (row) => t(`feedType.category.${row.category}`),
        },
        {
            key: "pricePerUnit",
            header: t("feedType.fields.pricePerUnit"),
            render: (row) =>
                `৳${row.pricePerUnit} / ${t(`feedType.unit.${row.unit}`)}`,
        },
        {
            key: "status",
            header: t("feedType.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`feedType.status.${row.status}`)}
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
                        onClick={() => navigate(`/feed/types/${row.id}/edit`)}
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
                description={t("feedType.list.description")}
                action={
                    <Button onClick={() => navigate("/feed/types/add")}>
                        {t("feedType.actions.addFeedType")}
                    </Button>
                }
            />
            <FeedTabs />

            {hasAny && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4">
                    <SearchBox
                        placeholder={t("feedType.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...FEED_TYPE_STATUSES.map((value) => ({
                                value,
                                label: t(`feedType.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAny ?
                <EmptyState
                    icon="🌾"
                    title={t("feedType.list.emptyTitle")}
                    description={t("feedType.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/feed/types/add")}>
                            {t("feedType.actions.addFeedType")}
                        </Button>
                    }
                />
            :   <>
                    <Table columns={columns} data={feedTypes} />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            }

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteFeedType(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("feedType.deleteDialog.title")}
                message={t("feedType.deleteDialog.message")}
            />
        </div>
    );
}
