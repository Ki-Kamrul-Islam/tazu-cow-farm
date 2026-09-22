import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useAnimals } from "../hooks/useAnimals.js";
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
import { ANIMAL_TYPES, ANIMAL_STATUSES } from "../../../constants/animal.js";
import { getAgeInMonths } from "../../../utils/date.js";

const STATUS_BADGE_VARIANT = {
    active: "success",
    sold: "info",
    deceased: "danger",
};

function formatAge(months, t) {
    if (months === null || months === undefined) return "-";
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (years === 0) return `${remMonths} ${t("herd.units.months")}`;
    return `${years} ${t("herd.units.years")} ${remMonths} ${t("herd.units.months")}`;
}

export function AnimalListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        animals,
        hasAnyAnimals,
        loading,
        search,
        setSearch,
        type,
        setType,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteAnimal,
    } = useAnimals();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "animalId", header: t("herd.fields.animalId") },
        { key: "name", header: t("herd.fields.name") },
        {
            key: "type",
            header: t("herd.fields.type"),
            render: (row) => t(`herd.animalType.${row.type}`),
        },
        {
            key: "age",
            header: t("herd.fields.age"),
            render: (row) => formatAge(getAgeInMonths(row.dateOfBirth), t),
        },
        { key: "breed", header: t("herd.fields.breed") },
        {
            key: "status",
            header: t("herd.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`herd.status.${row.status}`)}
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
                        onClick={() => navigate(`/herd/${row.id}/edit`)}
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
                description={t("herd.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/add")}>
                        {t("herd.actions.addAnimal")}
                    </Button>
                }
            />

            {hasAnyAnimals && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <SearchBox
                        placeholder={t("herd.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...ANIMAL_TYPES.map((value) => ({
                                value,
                                label: t(`herd.animalType.${value}`),
                            })),
                        ]}
                    />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...ANIMAL_STATUSES.map((value) => ({
                                value,
                                label: t(`herd.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAnyAnimals ?
                <EmptyState
                    icon="🐄"
                    title={t("herd.list.emptyTitle")}
                    description={t("herd.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/add")}>
                            {t("herd.actions.addAnimal")}
                        </Button>
                    }
                />
            :   <>
                    <Table
                        columns={columns}
                        data={animals}
                        emptyMessage={t("herd.list.noResults")}
                    />
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
                    deleteAnimal(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("herd.deleteDialog.title")}
                message={t("herd.deleteDialog.message")}
            />
        </div>
    );
}
