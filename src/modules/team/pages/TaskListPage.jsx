import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useTasks } from "../hooks/useTasks.js";
import { employeeService } from "../../../services/team/employeeService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Checkbox } from "../../../components/common/Checkbox.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { TASK_STATUSES, TASK_PRIORITIES } from "../../../constants/team.js";
import { TeamTabs } from "../components/TeamTabs.jsx";

const PRIORITY_BADGE_VARIANT = {
    low: "neutral",
    medium: "info",
    high: "danger",
};
const STATUS_BADGE_VARIANT = {
    pending: "neutral",
    in_progress: "info",
    completed: "success",
};

export function TaskListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        tasks,
        loading,
        assignedTo,
        setAssignedTo,
        status,
        setStatus,
        priority,
        setPriority,
        deleteTask,
        toggleComplete,
    } = useTasks();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const employeeOptions = employeeService.listActive().map((e) => ({
        value: e.id,
        label: e.name,
    }));

    const columns = [
        {
            key: "done",
            header: "",
            render: (row) => (
                <Checkbox
                    checked={row.status === "completed"}
                    onChange={() => toggleComplete(row.id)}
                />
            ),
        },
        { key: "title", header: t("task.fields.title") },
        {
            key: "employee",
            header: t("employee.fields.name"),
            render: (row) => row.employee?.name ?? "-",
        },
        { key: "dueDate", header: t("task.fields.dueDate") },
        {
            key: "priority",
            header: t("task.fields.priority"),
            render: (row) => (
                <Badge variant={PRIORITY_BADGE_VARIANT[row.priority]}>
                    {t(`task.priority.${row.priority}`)}
                </Badge>
            ),
        },
        {
            key: "status",
            header: t("task.fields.status"),
            render: (row) => (
                <Badge variant={STATUS_BADGE_VARIANT[row.status]}>
                    {t(`task.status.${row.status}`)}
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
                        onClick={() => navigate(`/team/tasks/${row.id}/edit`)}
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
                description={t("task.list.description")}
                action={
                    <Button onClick={() => navigate("/team/tasks/add")}>
                        {t("task.actions.addTask")}
                    </Button>
                }
            />
            <TeamTabs />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 mt-4 max-w-2xl">
                <Select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder={t("task.list.filterByEmployee")}
                    options={employeeOptions}
                />
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder={t("task.list.filterByStatus")}
                    options={TASK_STATUSES.map((value) => ({
                        value,
                        label: t(`task.status.${value}`),
                    }))}
                />
                <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    placeholder={t("task.list.filterByPriority")}
                    options={TASK_PRIORITIES.map((value) => ({
                        value,
                        label: t(`task.priority.${value}`),
                    }))}
                />
            </div>

            {loading ?
                <LoadingState />
            : tasks.length === 0 ?
                <EmptyState
                    icon="📋"
                    title={t("task.list.emptyTitle")}
                    description={t("task.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/team/tasks/add")}>
                            {t("task.actions.addTask")}
                        </Button>
                    }
                />
            :   <Table columns={columns} data={tasks} />}

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteTask(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("task.deleteDialog.title")}
                message={t("task.deleteDialog.message")}
            />
        </div>
    );
}
