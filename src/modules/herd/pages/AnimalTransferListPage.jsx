import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useAnimalTransfers } from "../hooks/useAnimalTransfers.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { HerdTabs } from "../components/HerdTabs.jsx";

export function AnimalTransferListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { transfers, loading, deleteTransfer } = useAnimalTransfers();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "animal",
            header: t("transfer.fields.animal"),
            render: (row) => `${row.animalCode} — ${row.animalName}`,
        },
        { key: "fromGroup", header: t("transfer.fields.fromGroup") },
        { key: "toGroup", header: t("transfer.fields.toGroup") },
        { key: "date", header: t("transfer.fields.date") },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setPendingDeleteId(row.id)}
                >
                    {t("herd.actions.delete")}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("nav.herd")}
                description={t("transfer.list.description")}
                action={
                    <Button onClick={() => navigate("/herd/transfers/add")}>
                        {t("transfer.actions.addTransfer")}
                    </Button>
                }
            />
            <HerdTabs />

            {loading ?
                <LoadingState />
            : transfers.length === 0 ?
                <EmptyState
                    icon="🔀"
                    title={t("transfer.list.emptyTitle")}
                    description={t("transfer.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/herd/transfers/add")}>
                            {t("transfer.actions.addTransfer")}
                        </Button>
                    }
                />
            :   <Table columns={columns} data={transfers} />}

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteTransfer(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("transfer.deleteDialog.title")}
                message={t("transfer.deleteDialog.message")}
            />
        </div>
    );
}
