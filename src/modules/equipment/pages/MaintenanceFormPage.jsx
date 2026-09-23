import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useMaintenanceForm } from "../hooks/useMaintenanceForm.js";
import { equipmentService } from "../../../services/equipment/equipmentService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { MAINTENANCE_TYPES } from "../../../constants/equipment.js";

export function MaintenanceFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useMaintenanceForm(id);

    if (loading) return <LoadingState />;

    const equipmentOptions = equipmentService.listActive().map((e) => ({
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
                title={
                    id ?
                        t("maintenance.form.editTitle")
                    :   t("maintenance.form.addTitle")
                }
                description={t("maintenance.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="equipmentId"
                        label={t("equipmentItem.fields.name")}
                        value={form.equipmentId}
                        onChange={(e) =>
                            updateField("equipmentId", e.target.value)
                        }
                        placeholder={t("maintenance.form.selectEquipment")}
                        options={equipmentOptions}
                        error={errors.equipmentId && t(errors.equipmentId)}
                    />
                    <Select
                        id="type"
                        label={t("maintenance.fields.type")}
                        value={form.type}
                        onChange={(e) => updateField("type", e.target.value)}
                        placeholder={t("maintenance.form.selectType")}
                        options={MAINTENANCE_TYPES.map((value) => ({
                            value,
                            label: t(`maintenance.type.${value}`),
                        }))}
                        error={errors.type && t(errors.type)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("maintenance.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="cost"
                        type="number"
                        step="0.01"
                        label={t("maintenance.fields.cost")}
                        value={form.cost}
                        onChange={(e) => updateField("cost", e.target.value)}
                        error={errors.cost && t(errors.cost)}
                    />
                    <Textarea
                        id="notes"
                        label={t("maintenance.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/equipment/maintenance")}
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
