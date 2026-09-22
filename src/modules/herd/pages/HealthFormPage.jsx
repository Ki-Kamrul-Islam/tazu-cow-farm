import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useHealthForm } from "../hooks/useHealthForm.js";
import { healthService } from "../../../services/herd/healthService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { HEALTH_RECORD_TYPES } from "../../../constants/health.js";

export function HealthFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useHealthForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const animalOptions = healthService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const showNextDueDate =
        form.type === "vaccination" || form.type === "deworming";

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("health.form.editTitle") : t("health.form.addTitle")
                }
                description={t("health.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            id="animalId"
                            label={t("health.fields.animal")}
                            value={form.animalId}
                            onChange={(e) =>
                                updateField("animalId", e.target.value)
                            }
                            placeholder={t("health.form.selectAnimal")}
                            options={animalOptions}
                            error={errors.animalId && t(errors.animalId)}
                        />
                        <Select
                            id="type"
                            label={t("health.fields.type")}
                            value={form.type}
                            onChange={(e) =>
                                updateField("type", e.target.value)
                            }
                            options={HEALTH_RECORD_TYPES.map((value) => ({
                                value,
                                label: t(`health.type.${value}`),
                            }))}
                            error={errors.type && t(errors.type)}
                        />
                        <Input
                            id="date"
                            type="date"
                            label={t("health.fields.date")}
                            value={form.date}
                            onChange={(e) =>
                                updateField("date", e.target.value)
                            }
                            error={errors.date && t(errors.date)}
                        />
                        <Input
                            id="diseaseOrReason"
                            label={t("health.fields.diseaseOrReason")}
                            value={form.diseaseOrReason}
                            onChange={(e) =>
                                updateField("diseaseOrReason", e.target.value)
                            }
                        />
                        <Input
                            id="medicine"
                            label={t("health.fields.medicine")}
                            value={form.medicine}
                            onChange={(e) =>
                                updateField("medicine", e.target.value)
                            }
                        />
                        <Input
                            id="dosage"
                            label={t("health.fields.dosage")}
                            value={form.dosage}
                            onChange={(e) =>
                                updateField("dosage", e.target.value)
                            }
                        />
                        <Input
                            id="vetName"
                            label={t("health.fields.vetName")}
                            value={form.vetName}
                            onChange={(e) =>
                                updateField("vetName", e.target.value)
                            }
                        />
                        <Input
                            id="cost"
                            type="number"
                            step="0.01"
                            label={t("health.fields.cost")}
                            value={form.cost}
                            onChange={(e) =>
                                updateField("cost", e.target.value)
                            }
                            error={errors.cost && t(errors.cost)}
                        />
                        {showNextDueDate && (
                            <Input
                                id="nextDueDate"
                                type="date"
                                label={t("health.fields.nextDueDate")}
                                value={form.nextDueDate}
                                onChange={(e) =>
                                    updateField("nextDueDate", e.target.value)
                                }
                            />
                        )}
                    </div>

                    <Textarea
                        id="notes"
                        label={t("health.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/herd/health")}
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
