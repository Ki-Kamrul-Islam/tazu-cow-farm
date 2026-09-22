import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useCustomers } from "../hooks/useCustomers.js";
import { ProductionTabs } from "../components/ProductionTabs.jsx";
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
import { CUSTOMER_STATUSES } from "../../../constants/production.js";

const STATUS_BADGE_VARIANT = {
    active: "success",
    inactive: "neutral",
};

export function CustomerListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        customers,
        hasAnyCustomers,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteCustomer,
    } = useCustomers();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "name", header: t("customers.fields.name") },
        { key: "phone", header: t("customers.fields.phone") },
        { key: "address", header: t("customers.fields.address") },
        {
            key: "status",
            header: t("customers.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`customers.status.${row.status}`)}
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
                        onClick={() =>
                            navigate(`/production/customers/${row.id}/edit`)
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
                title={t("nav.production")}
                description={t("customers.list.description")}
                action={
                    <Button
                        onClick={() => navigate("/production/customers/add")}
                    >
                        {t("customers.actions.addCustomer")}
                    </Button>
                }
            />
            <ProductionTabs />

            {hasAnyCustomers && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                    <SearchBox
                        placeholder={t("customers.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...CUSTOMER_STATUSES.map((value) => ({
                                value,
                                label: t(`customers.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAnyCustomers ?
                <EmptyState
                    icon="🧑‍🤝‍🧑"
                    title={t("customers.list.emptyTitle")}
                    description={t("customers.list.emptyDescription")}
                    action={
                        <Button
                            onClick={() =>
                                navigate("/production/customers/add")
                            }
                        >
                            {t("customers.actions.addCustomer")}
                        </Button>
                    }
                />
            :   <>
                    <Table
                        columns={columns}
                        data={customers}
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
                    deleteCustomer(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("customers.deleteDialog.title")}
                message={t("customers.deleteDialog.message")}
            />
        </div>
    );
}
