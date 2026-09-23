import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useWaterForm } from "../hooks/useWaterForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { WATER_PURPOSES } from "../../../constants/farmOperations.js";

export function WaterFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useWaterForm(id);

    if (loading) return <LoadingState />;

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("water.form.editTitle") : t("water.form.addTitle")
                }
                description={t("water.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="purpose"
                        label={t("water.fields.purpose")}
                        value={form.purpose}
                        onChange={(e) => updateField("purpose", e.target.value)}
                        placeholder={t("water.form.selectPurpose")}
                        options={WATER_PURPOSES.map((value) => ({
                            value,
                            label: t(`water.purpose.${value}`),
                        }))}
                        error={errors.purpose && t(errors.purpose)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("water.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="quantity"
                        type="number"
                        step="0.01"
                        label={t("water.fields.quantity")}
                        value={form.quantity}
                        onChange={(e) =>
                            updateField("quantity", e.target.value)
                        }
                        error={errors.quantity && t(errors.quantity)}
                    />
                    <Input
                        id="cost"
                        type="number"
                        step="0.01"
                        label={t("water.fields.cost")}
                        value={form.cost}
                        onChange={(e) => updateField("cost", e.target.value)}
                    />
                    <Textarea
                        id="notes"
                        label={t("water.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/farm-operations/water")}
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
