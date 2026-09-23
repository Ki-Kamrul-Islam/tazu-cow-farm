import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useEmployeeForm } from "../hooks/useEmployeeForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { EMPLOYEE_ROLES, EMPLOYEE_STATUSES } from "../../../constants/team.js";

export function EmployeeFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useEmployeeForm(id);

    if (loading) return <LoadingState />;

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ?
                        t("employee.form.editTitle")
                    :   t("employee.form.addTitle")
                }
                description={t("employee.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="name"
                            label={t("employee.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />
                        <Input
                            id="phone"
                            label={t("employee.fields.phone")}
                            value={form.phone}
                            onChange={(e) =>
                                updateField("phone", e.target.value)
                            }
                            error={errors.phone && t(errors.phone)}
                        />
                        <Select
                            id="role"
                            label={t("employee.fields.role")}
                            value={form.role}
                            onChange={(e) =>
                                updateField("role", e.target.value)
                            }
                            options={EMPLOYEE_ROLES.map((value) => ({
                                value,
                                label: t(`employee.role.${value}`),
                            }))}
                            error={errors.role && t(errors.role)}
                        />
                        <Input
                            id="salary"
                            type="number"
                            step="0.01"
                            label={t("employee.fields.salary")}
                            value={form.salary}
                            onChange={(e) =>
                                updateField("salary", e.target.value)
                            }
                            error={errors.salary && t(errors.salary)}
                        />
                        <Input
                            id="joinDate"
                            type="date"
                            label={t("employee.fields.joinDate")}
                            value={form.joinDate}
                            onChange={(e) =>
                                updateField("joinDate", e.target.value)
                            }
                            error={errors.joinDate && t(errors.joinDate)}
                        />
                        <Select
                            id="status"
                            label={t("employee.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={EMPLOYEE_STATUSES.map((value) => ({
                                value,
                                label: t(`employee.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("employee.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/team")}
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
