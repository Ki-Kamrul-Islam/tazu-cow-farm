import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useCustomerForm } from "../hooks/useCustomerForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { CUSTOMER_STATUSES } from "../../../constants/production.js";

export function CustomerFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useCustomerForm(id);

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
                        t("customers.form.editTitle")
                    :   t("customers.form.addTitle")
                }
                description={t("customers.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="name"
                            label={t("customers.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />
                        <Input
                            id="phone"
                            label={t("customers.fields.phone")}
                            value={form.phone}
                            onChange={(e) =>
                                updateField("phone", e.target.value)
                            }
                            error={errors.phone && t(errors.phone)}
                        />
                        <Input
                            id="address"
                            label={t("customers.fields.address")}
                            value={form.address}
                            onChange={(e) =>
                                updateField("address", e.target.value)
                            }
                        />
                        <Select
                            id="status"
                            label={t("customers.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={CUSTOMER_STATUSES.map((value) => ({
                                value,
                                label: t(`customers.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("customers.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/production/customers")}
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
