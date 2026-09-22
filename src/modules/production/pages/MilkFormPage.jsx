import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useMilkForm } from "../hooks/useMilkForm.js";
import { milkService } from "../../../services/production/milkService.js";
import { MILK_SESSIONS } from "../../../constants/production.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function MilkFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useMilkForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const animalOptions = milkService.getActiveAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const sessionOptions = MILK_SESSIONS.map((value) => ({
        value,
        label: t(`milk.session.${value}`),
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={id ? t("milk.form.editTitle") : t("milk.form.addTitle")}
                description={t("milk.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="animalId"
                        label={t("milk.fields.animal")}
                        value={form.animalId}
                        onChange={(e) =>
                            updateField("animalId", e.target.value)
                        }
                        placeholder={t("milk.form.selectAnimal")}
                        options={animalOptions}
                        error={errors.animalId && t(errors.animalId)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("milk.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Select
                        id="session"
                        label={t("milk.fields.session")}
                        value={form.session}
                        onChange={(e) => updateField("session", e.target.value)}
                        options={sessionOptions}
                        error={errors.session && t(errors.session)}
                    />
                    <Input
                        id="quantity"
                        type="number"
                        step="0.1"
                        label={t("milk.fields.quantity")}
                        value={form.quantity}
                        onChange={(e) =>
                            updateField("quantity", e.target.value)
                        }
                        error={errors.quantity && t(errors.quantity)}
                    />
                    <Textarea
                        id="notes"
                        label={t("milk.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/production")}
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
