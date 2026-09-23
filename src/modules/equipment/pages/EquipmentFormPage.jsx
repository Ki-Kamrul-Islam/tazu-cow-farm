import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useEquipmentForm } from "../hooks/useEquipmentForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    EQUIPMENT_TYPES,
    EQUIPMENT_STATUSES,
} from "../../../constants/equipment.js";

export function EquipmentFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useEquipmentForm(id);

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
                        t("equipmentItem.form.editTitle")
                    :   t("equipmentItem.form.addTitle")
                }
                description={t("equipmentItem.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="name"
                            label={t("equipmentItem.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />
                        <Select
                            id="type"
                            label={t("equipmentItem.fields.type")}
                            value={form.type}
                            onChange={(e) =>
                                updateField("type", e.target.value)
                            }
                            options={EQUIPMENT_TYPES.map((value) => ({
                                value,
                                label: t(`equipmentItem.type.${value}`),
                            }))}
                            error={errors.type && t(errors.type)}
                        />
                        <Input
                            id="purchaseDate"
                            type="date"
                            label={t("equipmentItem.fields.purchaseDate")}
                            value={form.purchaseDate}
                            onChange={(e) =>
                                updateField("purchaseDate", e.target.value)
                            }
                            error={
                                errors.purchaseDate && t(errors.purchaseDate)
                            }
                        />
                        <Input
                            id="purchaseCost"
                            type="number"
                            step="0.01"
                            label={t("equipmentItem.fields.purchaseCost")}
                            value={form.purchaseCost}
                            onChange={(e) =>
                                updateField("purchaseCost", e.target.value)
                            }
                            error={
                                errors.purchaseCost && t(errors.purchaseCost)
                            }
                        />
                        <Select
                            id="status"
                            label={t("equipmentItem.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={EQUIPMENT_STATUSES.map((value) => ({
                                value,
                                label: t(`equipmentItem.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("equipmentItem.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/equipment")}
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
