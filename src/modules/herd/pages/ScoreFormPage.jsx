import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useScoreForm } from "../hooks/useScoreForm.js";
import { scoreService } from "../../../services/herd/scoreService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { SCORE_SCALE } from "../../../constants/scoring.js";

export function ScoreFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useScoreForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const animalOptions = scoreService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const scoreOptions = SCORE_SCALE.map((value) => ({
        value: String(value),
        label: String(value),
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
                        t("scoring.form.editTitle")
                    :   t("scoring.form.addTitle")
                }
                description={t("scoring.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="animalId"
                        label={t("scoring.fields.animal")}
                        value={form.animalId}
                        onChange={(e) =>
                            updateField("animalId", e.target.value)
                        }
                        placeholder={t("scoring.form.selectAnimal")}
                        options={animalOptions}
                        error={errors.animalId && t(errors.animalId)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("scoring.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Select
                        id="bodyConditionScore"
                        label={t("scoring.fields.bodyConditionScore")}
                        value={form.bodyConditionScore}
                        onChange={(e) =>
                            updateField("bodyConditionScore", e.target.value)
                        }
                        placeholder={t("common.all")}
                        options={scoreOptions}
                        error={
                            errors.bodyConditionScore &&
                            t(errors.bodyConditionScore)
                        }
                    />
                    <Select
                        id="udderScore"
                        label={t("scoring.fields.udderScore")}
                        value={form.udderScore}
                        onChange={(e) =>
                            updateField("udderScore", e.target.value)
                        }
                        placeholder={t("common.all")}
                        options={scoreOptions}
                    />
                    <Select
                        id="mobilityScore"
                        label={t("scoring.fields.mobilityScore")}
                        value={form.mobilityScore}
                        onChange={(e) =>
                            updateField("mobilityScore", e.target.value)
                        }
                        placeholder={t("common.all")}
                        options={scoreOptions}
                    />
                    <Textarea
                        id="notes"
                        label={t("scoring.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/herd/scoring")}
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
