import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useCropForm } from "../hooks/useCropForm.js";
import { fieldService } from "../../../services/land/fieldService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { CROP_TYPES, CROP_YIELD_UNITS } from "../../../constants/land.js";

export function CropFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useCropForm(id);

    if (loading) return <LoadingState />;

    const fieldOptions = fieldService.listActive().map((f) => ({
        value: f.id,
        label: f.name,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={id ? t("crop.form.editTitle") : t("crop.form.addTitle")}
                description={t("crop.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            id="fieldId"
                            label={t("field.fields.name")}
                            value={form.fieldId}
                            onChange={(e) =>
                                updateField("fieldId", e.target.value)
                            }
                            placeholder={t("crop.form.selectField")}
                            options={fieldOptions}
                            error={errors.fieldId && t(errors.fieldId)}
                        />
                        <Select
                            id="cropType"
                            label={t("crop.fields.cropType")}
                            value={form.cropType}
                            onChange={(e) =>
                                updateField("cropType", e.target.value)
                            }
                            placeholder={t("crop.form.selectCropType")}
                            options={CROP_TYPES.map((value) => ({
                                value,
                                label: t(`crop.type.${value}`),
                            }))}
                            error={errors.cropType && t(errors.cropType)}
                        />
                        <Input
                            id="plantingDate"
                            type="date"
                            label={t("crop.fields.plantingDate")}
                            value={form.plantingDate}
                            onChange={(e) =>
                                updateField("plantingDate", e.target.value)
                            }
                            error={
                                errors.plantingDate && t(errors.plantingDate)
                            }
                        />
                        <Input
                            id="harvestDate"
                            type="date"
                            label={t("crop.fields.harvestDate")}
                            value={form.harvestDate}
                            onChange={(e) =>
                                updateField("harvestDate", e.target.value)
                            }
                            error={errors.harvestDate && t(errors.harvestDate)}
                        />
                        <Input
                            id="yieldQuantity"
                            type="number"
                            step="0.1"
                            label={t("crop.fields.yieldQuantity")}
                            value={form.yieldQuantity}
                            onChange={(e) =>
                                updateField("yieldQuantity", e.target.value)
                            }
                            error={
                                errors.yieldQuantity && t(errors.yieldQuantity)
                            }
                        />
                        <Select
                            id="yieldUnit"
                            label={t("crop.fields.yieldUnit")}
                            value={form.yieldUnit}
                            onChange={(e) =>
                                updateField("yieldUnit", e.target.value)
                            }
                            options={CROP_YIELD_UNITS.map((value) => ({
                                value,
                                label: t(`crop.yieldUnit.${value}`),
                            }))}
                        />
                        <Input
                            id="cost"
                            type="number"
                            step="0.01"
                            label={t("crop.fields.cost")}
                            value={form.cost}
                            onChange={(e) =>
                                updateField("cost", e.target.value)
                            }
                            error={errors.cost && t(errors.cost)}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("crop.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/land/crops")}
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
