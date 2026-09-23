import { useParams, useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useInventoryItemForm } from "../hooks/useInventoryItemForm.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

import {
    INVENTORY_CATEGORIES,
    INVENTORY_UNITS,
    INVENTORY_STATUSES,
} from "../../../constants/inventory.js";

export function InventoryItemFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const { form, errors, loading, saving, updateField, submit } =
        useInventoryItemForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ?
                        t("inventoryItem.form.editTitle")
                    :   t("inventoryItem.form.addTitle")
                }
                description={t("inventoryItem.form.description")}
            />

            <Card className="max-w-3xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="name"
                            label={t("inventoryItem.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />

                        <Input
                            id="sku"
                            label={t("inventoryItem.fields.sku")}
                            value={form.sku}
                            onChange={(e) => updateField("sku", e.target.value)}
                            error={errors.sku && t(errors.sku)}
                        />

                        <Select
                            id="category"
                            label={t("inventoryItem.fields.category")}
                            value={form.category}
                            onChange={(e) =>
                                updateField("category", e.target.value)
                            }
                            options={INVENTORY_CATEGORIES.map((value) => ({
                                value,
                                label: t(`inventoryItem.category.${value}`),
                            }))}
                            error={errors.category && t(errors.category)}
                        />

                        <Select
                            id="unit"
                            label={t("inventoryItem.fields.unit")}
                            value={form.unit}
                            onChange={(e) =>
                                updateField("unit", e.target.value)
                            }
                            options={INVENTORY_UNITS.map((value) => ({
                                value,
                                label: t(`inventoryItem.unit.${value}`),
                            }))}
                            error={errors.unit && t(errors.unit)}
                        />

                        <Input
                            id="quantity"
                            type="number"
                            min="0"
                            step="0.01"
                            label={t("inventoryItem.fields.quantity")}
                            value={form.quantity}
                            onChange={(e) =>
                                updateField("quantity", e.target.value)
                            }
                            error={errors.quantity && t(errors.quantity)}
                        />

                        <Input
                            id="reorderLevel"
                            type="number"
                            min="0"
                            step="0.01"
                            label={t("inventoryItem.fields.reorderLevel")}
                            value={form.reorderLevel}
                            onChange={(e) =>
                                updateField("reorderLevel", e.target.value)
                            }
                            error={
                                errors.reorderLevel && t(errors.reorderLevel)
                            }
                        />

                        <Select
                            id="status"
                            label={t("inventoryItem.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={INVENTORY_STATUSES.map((value) => ({
                                value,
                                label: t(`inventoryItem.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("inventoryItem.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/inventory")}
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
