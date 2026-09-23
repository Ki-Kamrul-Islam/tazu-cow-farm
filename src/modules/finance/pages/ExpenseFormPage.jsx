import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useExpenseForm } from "../hooks/useExpenseForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    EXPENSE_CATEGORIES,
    PAYMENT_METHODS,
} from "../../../constants/finance.js";

export function ExpenseFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useExpenseForm(id);

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
                        t("expense.form.editTitle")
                    :   t("expense.form.addTitle")
                }
                description={t("expense.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="category"
                        label={t("expense.fields.category")}
                        value={form.category}
                        onChange={(e) =>
                            updateField("category", e.target.value)
                        }
                        placeholder={t("expense.form.selectCategory")}
                        options={EXPENSE_CATEGORIES.map((value) => ({
                            value,
                            label: t(`expense.category.${value}`),
                        }))}
                        error={errors.category && t(errors.category)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("expense.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        label={t("expense.fields.amount")}
                        value={form.amount}
                        onChange={(e) => updateField("amount", e.target.value)}
                        error={errors.amount && t(errors.amount)}
                    />
                    <Select
                        id="paymentMethod"
                        label={t("expense.fields.paymentMethod")}
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
                        label={t("expense.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/finance")}
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
