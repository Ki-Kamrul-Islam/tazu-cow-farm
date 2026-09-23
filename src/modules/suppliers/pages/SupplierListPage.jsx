import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { useSupplierList } from "../hooks/useSupplierList.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";

export function SupplierListPage() {
    const { t } = useLanguage();

    const navigate = useNavigate();

    const {
        filteredSuppliers,

        search,
        setSearch,

        statusFilter,
        setStatusFilter,

        loading,

        toggleStatus,
        remove,
    } = useSupplierList();

    if (loading) {
        return <LoadingState />;
    }

    const columns = [
        {
            key: "name",
            header: t("supplier.fields.name"),
        },

        {
            key: "contactPerson",
            header: t("supplier.fields.contactPerson"),
        },

        {
            key: "phone",
            header: t("supplier.fields.phone"),
        },

        {
            key: "email",
            header: t("supplier.fields.email"),
        },

        {
            key: "status",
            header: t("supplier.fields.status"),

            render: (row) => (
                <Badge
                    variant={row.status === "active" ? "success" : "neutral"}
                >
                    {t(`supplier.status.${row.status}`)}
                </Badge>
            ),
        },

        {
            key: "actions",
            header: t("supplier.fields.actions"),

            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/suppliers/${row.id}/edit`)}
                    >
                        {t("supplier.actions.edit")}
                    </Button>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStatus(row.id)}
                    >
                        {row.status === "active" ?
                            t("supplier.actions.deactivate")
                        :   t("supplier.actions.activate")}
                    </Button>

                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                            if (window.confirm(t("supplier.confirmDelete"))) {
                                remove(row.id);
                            }
                        }}
                    >
                        {t("supplier.actions.delete")}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("supplier.title")}
                description={t("supplier.description")}
                action={
                    <Button onClick={() => navigate("/suppliers/add")}>
                        {t("supplier.actions.add")}
                    </Button>
                }
            />

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    <Input
                        value={search}
                        placeholder={t("supplier.searchPlaceholder")}
                        onChange={(event) => setSearch(event.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                    >
                        <option value="all">{t("supplier.filters.all")}</option>

                        <option value="active">
                            {t("supplier.status.active")}
                        </option>

                        <option value="inactive">
                            {t("supplier.status.inactive")}
                        </option>
                    </select>
                </div>

                {filteredSuppliers.length === 0 ?
                    <EmptyState
                        icon="🏢"
                        title={t("supplier.empty.title")}
                        description={t("supplier.empty.description")}
                        action={
                            <Button onClick={() => navigate("/suppliers/add")}>
                                {t("supplier.actions.add")}
                            </Button>
                        }
                    />
                :   <Table columns={columns} data={filteredSuppliers} />}
            </Card>
        </div>
    );
}
