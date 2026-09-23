import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFieldForm } from "../hooks/useFieldForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    LAND_AREA_UNITS,
    SOIL_TYPES,
    WATER_SOURCES,
    FIELD_STATUSES,
} from "../../../constants/land.js";

export function FieldFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useFieldForm(id);

    if (loading) return <LoadingState />;

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("field.form.editTitle") : t("field.form.addTitle")
                }
                description={t("field.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="name"
                            label={t("field.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />
                        <Input
                            id="area"
                            type="number"
                            step="0.01"
                            label={t("field.fields.area")}
                            value={form.area}
                            onChange={(e) =>
                                updateField("area", e.target.value)
                            }
                            error={errors.area && t(errors.area)}
                        />
                        <Select
                            id="areaUnit"
                            label={t("field.fields.areaUnit")}
                            value={form.areaUnit}
                            onChange={(e) =>
                                updateField("areaUnit", e.target.value)
                            }
                            options={LAND_AREA_UNITS.map((value) => ({
                                value,
                                label: t(`field.unit.${value}`),
                            }))}
                            error={errors.areaUnit && t(errors.areaUnit)}
                        />
                        <Select
                            id="soilType"
                            label={t("field.fields.soilType")}
                            value={form.soilType}
                            onChange={(e) =>
                                updateField("soilType", e.target.value)
                            }
                            options={SOIL_TYPES.map((value) => ({
                                value,
                                label: t(`field.soilType.${value}`),
                            }))}
                            error={errors.soilType && t(errors.soilType)}
                        />
                        <Select
                            id="waterSource"
                            label={t("field.fields.waterSource")}
                            value={form.waterSource}
                            onChange={(e) =>
                                updateField("waterSource", e.target.value)
                            }
                            placeholder={t("common.select")}
                            options={WATER_SOURCES.map((value) => ({
                                value,
                                label: t(`field.waterSource.${value}`),
                            }))}
                        />
                        <Select
                            id="status"
                            label={t("field.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={FIELD_STATUSES.map((value) => ({
                                value,
                                label: t(`field.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("field.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/land")}
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
