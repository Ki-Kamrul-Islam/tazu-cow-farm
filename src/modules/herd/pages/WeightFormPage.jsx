import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useWeightForm } from "../hooks/useWeightForm.js";
import { weightService } from "../../../services/herd/weightService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function WeightFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useWeightForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const animalOptions = weightService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("weight.form.editTitle") : t("weight.form.addTitle")
                }
                description={t("weight.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="animalId"
                        label={t("weight.fields.animal")}
                        value={form.animalId}
                        onChange={(e) =>
                            updateField("animalId", e.target.value)
                        }
                        placeholder={t("weight.form.selectAnimal")}
                        options={animalOptions}
                        error={errors.animalId && t(errors.animalId)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("weight.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        label={t("weight.fields.weight")}
                        value={form.weight}
                        onChange={(e) => updateField("weight", e.target.value)}
                        error={errors.weight && t(errors.weight)}
                    />
                    <Textarea
                        id="notes"
                        label={t("weight.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/herd/weight")}
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
