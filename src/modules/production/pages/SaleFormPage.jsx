import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useSaleForm } from "../hooks/useSaleForm.js";
import { saleService } from "../../../services/production/saleService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function SaleFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useSaleForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const customerOptions = saleService.getCustomers().map((c) => ({
        value: c.id,
        label: `${c.name} — ${c.phone}`,
    }));

    const estimatedTotal =
        (Number(form.quantity) || 0) * (Number(form.pricePerLiter) || 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("sales.form.editTitle") : t("sales.form.addTitle")
                }
                description={t("sales.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="customerId"
                        label={t("sales.fields.customer")}
                        value={form.customerId}
                        onChange={(e) =>
                            updateField("customerId", e.target.value)
                        }
                        placeholder={t("sales.form.selectCustomer")}
                        options={customerOptions}
                        error={errors.customerId && t(errors.customerId)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("sales.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="quantity"
                        type="number"
                        step="0.1"
                        label={t("sales.fields.quantity")}
                        value={form.quantity}
                        onChange={(e) =>
                            updateField("quantity", e.target.value)
                        }
                        error={errors.quantity && t(errors.quantity)}
                    />
                    <Input
                        id="pricePerLiter"
                        type="number"
                        step="0.1"
                        label={t("sales.fields.pricePerLiter")}
                        value={form.pricePerLiter}
                        onChange={(e) =>
                            updateField("pricePerLiter", e.target.value)
                        }
                        error={errors.pricePerLiter && t(errors.pricePerLiter)}
                    />

                    <p className="text-sm text-text-muted -mt-2">
                        {t("sales.form.estimatedTotal")}:{" "}
                        <span className="font-semibold text-text-primary">
                            {t("dashboard.units.currency")} {estimatedTotal}
                        </span>
                    </p>

                    <Input
                        id="paidAmount"
                        type="number"
                        step="0.1"
                        label={t("sales.fields.paidAmount")}
                        value={form.paidAmount}
                        onChange={(e) =>
                            updateField("paidAmount", e.target.value)
                        }
                        error={errors.paidAmount && t(errors.paidAmount)}
                    />
                    <Textarea
                        id="notes"
                        label={t("sales.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/production/sales")}
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
