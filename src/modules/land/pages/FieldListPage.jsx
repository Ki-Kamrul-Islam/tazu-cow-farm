import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFields } from "../hooks/useFields.js";
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
import { FIELD_STATUSES } from "../../../constants/land.js";
import { LandTabs } from "../components/LandTabs.jsx";

const STATUS_BADGE_VARIANT = { active: "success", inactive: "neutral" };

export function FieldListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        fields,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteField,
    } = useFields();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "name", header: t("field.fields.name") },
        {
            key: "area",
            header: t("field.fields.area"),
            render: (row) => `${row.area} ${t(`field.unit.${row.areaUnit}`)}`,
        },
        {
            key: "soilType",
            header: t("field.fields.soilType"),
            render: (row) => t(`field.soilType.${row.soilType}`),
        },
        {
            key: "waterSource",
            header: t("field.fields.waterSource"),
            render: (row) =>
                row.waterSource ?
                    t(`field.waterSource.${row.waterSource}`)
                :   "-",
        },
        {
            key: "status",
            header: t("field.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`field.status.${row.status}`)}
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
                        onClick={() => navigate(`/land/${row.id}/edit`)}
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
                description={t("field.list.description")}
                action={
                    <Button onClick={() => navigate("/land/add")}>
                        {t("field.actions.addField")}
                    </Button>
                }
            />
            <LandTabs />

            {hasAny && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4">
                    <SearchBox
                        placeholder={t("field.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...FIELD_STATUSES.map((value) => ({
                                value,
                                label: t(`field.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAny ?
                <EmptyState
                    icon="🌱"
                    title={t("field.list.emptyTitle")}
                    description={t("field.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/land/add")}>
                            {t("field.actions.addField")}
                        </Button>
                    }
                />
            :   <>
                    <Table columns={columns} data={fields} />
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
                    deleteField(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("field.deleteDialog.title")}
                message={t("field.deleteDialog.message")}
            />
        </div>
    );
}
