import { useNavigate, useParams } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { useSupplierForm } from "../hooks/useSupplierForm.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function SupplierFormPage() {
    const { id: supplierId } = useParams();

    const navigate = useNavigate();

    const { t } = useLanguage();

    const {
        form,
        errors,

        loading,
        saving,

        updateField,
        submit,
    } = useSupplierForm(supplierId);

    if (loading) {
        return <LoadingState />;
    }

    const isEdit = Boolean(supplierId);

    return (
        <div>
            <PageHeader
                title={t(
                    isEdit ?
                        "supplier.form.editTitle"
                    :   "supplier.form.addTitle",
                )}
                description={t("supplier.form.description")}
            />

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label={t("supplier.fields.name")}
                        value={form.name}
                        error={errors.name ? t(errors.name) : ""}
                        onChange={(event) =>
                            updateField("name", event.target.value)
                        }
                    />

                    <Input
                        label={t("supplier.fields.phone")}
                        value={form.phone}
                        error={errors.phone ? t(errors.phone) : ""}
                        onChange={(event) =>
                            updateField("phone", event.target.value)
                        }
                    />

                    <Input
                        label={t("supplier.fields.email")}
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                            updateField("email", event.target.value)
                        }
                    />

                    <Input
                        label={t("supplier.fields.contactPerson")}
                        value={form.contactPerson}
                        onChange={(event) =>
                            updateField("contactPerson", event.target.value)
                        }
                    />

                    <div className="md:col-span-2">
                        <Input
                            label={t("supplier.fields.address")}
                            value={form.address}
                            onChange={(event) =>
                                updateField("address", event.target.value)
                            }
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            {t("supplier.fields.notes")}
                        </label>

                        <textarea
                            value={form.notes}
                            onChange={(event) =>
                                updateField("notes", event.target.value)
                            }
                            rows={5}
                            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                        />
                    </div>
                </div>

                {errors.form && (
                    <p className="mt-4 text-sm text-danger">{t(errors.form)}</p>
                )}

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/suppliers")}
                    >
                        {t("supplier.actions.cancel")}
                    </Button>

                    <Button loading={saving} onClick={submit}>
                        {t(
                            isEdit ?
                                "supplier.actions.update"
                            :   "supplier.actions.save",
                        )}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
