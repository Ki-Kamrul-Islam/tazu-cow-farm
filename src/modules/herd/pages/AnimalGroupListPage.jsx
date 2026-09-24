import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useAnimalGroups } from "../hooks/useAnimalGroups.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { HerdTabs } from "../components/HerdTabs.jsx";

export function AnimalGroupListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { groups, loading, deleteGroup } = useAnimalGroups();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "name", header: t("group.fields.name") },
        { key: "description", header: t("group.fields.description") },
        {
            key: "animalCount",
            header: t("group.fields.animalCount"),
            render: (row) => row.animalCount,
        },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/herd/groups/${row.id}/edit`)}
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
                description={t("group.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/groups/add")}>
                        {t("group.actions.addGroup")}
                    </Button>
                }
            />
            <HerdTabs />

            {loading ?
                <LoadingState />
            : groups.length === 0 ?
                <EmptyState
                    icon="🗂️"
                    title={t("group.list.emptyTitle")}
                    description={t("group.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/groups/add")}>
                            {t("group.actions.addGroup")}
                        </Button>
                    }
                />
            :   <Table columns={columns} data={groups} />}

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteGroup(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("group.deleteDialog.title")}
                message={t("group.deleteDialog.message")}
            />
        </div>
    );
}
