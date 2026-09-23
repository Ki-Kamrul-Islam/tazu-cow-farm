import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useEmployees } from "../hooks/useEmployees.js";
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
import { EMPLOYEE_STATUSES } from "../../../constants/team.js";
import { TeamTabs } from "../components/TeamTabs.jsx";

const STATUS_BADGE_VARIANT = { active: "success", inactive: "neutral" };

export function EmployeeListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        employees,
        hasAny,
        loading,
        search,
        setSearch,
        status,
        setStatus,
        page,
        totalPages,
        setPage,
        deleteEmployee,
    } = useEmployees();

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        { key: "name", header: t("employee.fields.name") },
        { key: "phone", header: t("employee.fields.phone") },
        {
            key: "role",
            header: t("employee.fields.role"),
            render: (row) => t(`employee.role.${row.role}`),
        },
        {
            key: "salary",
            header: t("employee.fields.salary"),
            render: (row) => `৳${row.salary.toFixed(2)}`,
        },
        {
            key: "status",
            header: t("employee.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? "neutral"}>
                    {t(`employee.status.${row.status}`)}
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
                        onClick={() => navigate(`/team/${row.id}/edit`)}
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
                title={t("nav.team")}
                description={t("employee.list.description")}
                action={
                    <Button onClick={() => navigate("/team/add")}>
                        {t("employee.actions.addEmployee")}
                    </Button>
                }
            />
            <TeamTabs />

            {hasAny && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4">
                    <SearchBox
                        placeholder={t("employee.list.searchPlaceholder")}
                        onSearch={setSearch}
                    />
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        options={[
                            { value: "", label: t("common.all") },
                            ...EMPLOYEE_STATUSES.map((value) => ({
                                value,
                                label: t(`employee.status.${value}`),
                            })),
                        ]}
                    />
                </div>
            )}

            {loading ?
                <LoadingState />
            : !hasAny ?
                <EmptyState
                    icon="👷"
                    title={t("employee.list.emptyTitle")}
                    description={t("employee.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/team/add")}>
                            {t("employee.actions.addEmployee")}
                        </Button>
                    }
                />
            :   <>
                    <Table columns={columns} data={employees} />
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
                    deleteEmployee(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("employee.deleteDialog.title")}
                message={t("employee.deleteDialog.message")}
            />
        </div>
    );
}
