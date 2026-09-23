import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useManureForm } from "../hooks/useManureForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { MANURE_TYPES } from "../../../constants/farmOperations.js";

export function ManureFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useManureForm(id);

    if (loading) return <LoadingState />;

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("manure.form.editTitle") : t("manure.form.addTitle")
                }
                description={t("manure.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="type"
                        label={t("manure.fields.type")}
                        value={form.type}
                        onChange={(e) => updateField("type", e.target.value)}
                        placeholder={t("manure.form.selectType")}
                        options={MANURE_TYPES.map((value) => ({
                            value,
                            label: t(`manure.type.${value}`),
                        }))}
                        error={errors.type && t(errors.type)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("manure.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="quantity"
                        type="number"
                        step="0.01"
                        label={t("manure.fields.quantity")}
                        value={form.quantity}
                        onChange={(e) =>
                            updateField("quantity", e.target.value)
                        }
                        error={errors.quantity && t(errors.quantity)}
                    />
                    <Textarea
                        id="notes"
                        label={t("manure.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/farm-operations")}
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
