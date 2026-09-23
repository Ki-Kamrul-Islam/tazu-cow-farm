import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useTaskForm } from "../hooks/useTaskForm.js";
import { employeeService } from "../../../services/team/employeeService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { TASK_PRIORITIES, TASK_STATUSES } from "../../../constants/team.js";

export function TaskFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useTaskForm(id);

    if (loading) return <LoadingState />;

    const employeeOptions = employeeService.listActive().map((e) => ({
        value: e.id,
        label: e.name,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={id ? t("task.form.editTitle") : t("task.form.addTitle")}
                description={t("task.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        id="title"
                        label={t("task.fields.title")}
                        value={form.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        error={errors.title && t(errors.title)}
                    />
                    <Select
                        id="assignedTo"
                        label={t("task.fields.assignedTo")}
                        value={form.assignedTo}
                        onChange={(e) =>
                            updateField("assignedTo", e.target.value)
                        }
                        placeholder={t("task.form.selectEmployee")}
                        options={employeeOptions}
                        error={errors.assignedTo && t(errors.assignedTo)}
                    />
                    <Input
                        id="dueDate"
                        type="date"
                        label={t("task.fields.dueDate")}
                        value={form.dueDate}
                        onChange={(e) => updateField("dueDate", e.target.value)}
                        error={errors.dueDate && t(errors.dueDate)}
                    />
                    <Select
                        id="priority"
                        label={t("task.fields.priority")}
                        value={form.priority}
                        onChange={(e) =>
                            updateField("priority", e.target.value)
                        }
                        options={TASK_PRIORITIES.map((value) => ({
                            value,
                            label: t(`task.priority.${value}`),
                        }))}
                    />
                    <Select
                        id="status"
                        label={t("task.fields.status")}
                        value={form.status}
                        onChange={(e) => updateField("status", e.target.value)}
                        options={TASK_STATUSES.map((value) => ({
                            value,
                            label: t(`task.status.${value}`),
                        }))}
                    />
                    <Textarea
                        id="description"
                        label={t("task.fields.description")}
                        value={form.description}
                        onChange={(e) =>
                            updateField("description", e.target.value)
                        }
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/team/tasks")}
                        >
                            {t("herd.actions.cancel")}
                        </Button>
                        <Button type="submit" isLoading={saving}>
                            {t("herd.actions.save")}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
