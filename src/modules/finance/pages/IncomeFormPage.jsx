import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useIncomeForm } from "../hooks/useIncomeForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    INCOME_CATEGORIES,
    PAYMENT_METHODS,
} from "../../../constants/finance.js";

export function IncomeFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useIncomeForm(id);

    if (loading) return <LoadingState />;

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ? t("income.form.editTitle") : t("income.form.addTitle")
                }
                description={t("income.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="category"
                        label={t("income.fields.category")}
                        value={form.category}
                        onChange={(e) =>
                            updateField("category", e.target.value)
                        }
                        placeholder={t("income.form.selectCategory")}
                        options={INCOME_CATEGORIES.map((value) => ({
                            value,
                            label: t(`income.category.${value}`),
                        }))}
                        error={errors.category && t(errors.category)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("income.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        label={t("income.fields.amount")}
                        value={form.amount}
                        onChange={(e) => updateField("amount", e.target.value)}
                        error={errors.amount && t(errors.amount)}
                    />
                    <Select
                        id="paymentMethod"
                        label={t("income.fields.paymentMethod")}
                        value={form.paymentMethod}
                        onChange={(e) =>
                            updateField("paymentMethod", e.target.value)
                        }
                        options={PAYMENT_METHODS.map((value) => ({
                            value,
                            label: t(`expense.paymentMethod.${value}`),
                        }))}
                    />
                    <Textarea
                        id="notes"
                        label={t("income.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/finance/income")}
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
