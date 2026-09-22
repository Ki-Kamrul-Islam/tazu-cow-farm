import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFeedTypeForm } from "../hooks/useFeedTypeForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    FEED_CATEGORIES,
    FEED_UNITS,
    FEED_TYPE_STATUSES,
} from "../../../constants/feed.js";

export function FeedTypeFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useFeedTypeForm(id);

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
                        t("feedType.form.editTitle")
                    :   t("feedType.form.addTitle")
                }
                description={t("feedType.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="name"
                            label={t("feedType.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />
                        <Select
                            id="category"
                            label={t("feedType.fields.category")}
                            value={form.category}
                            onChange={(e) =>
                                updateField("category", e.target.value)
                            }
                            options={FEED_CATEGORIES.map((value) => ({
                                value,
                                label: t(`feedType.category.${value}`),
                            }))}
                            error={errors.category && t(errors.category)}
                        />
                        <Select
                            id="unit"
                            label={t("feedType.fields.unit")}
                            value={form.unit}
                            onChange={(e) =>
                                updateField("unit", e.target.value)
                            }
                            options={FEED_UNITS.map((value) => ({
                                value,
                                label: t(`feedType.unit.${value}`),
                            }))}
                            error={errors.unit && t(errors.unit)}
                        />
                        <Input
                            id="pricePerUnit"
                            type="number"
                            step="0.01"
                            label={t("feedType.fields.pricePerUnit")}
                            value={form.pricePerUnit}
                            onChange={(e) =>
                                updateField("pricePerUnit", e.target.value)
                            }
                            error={
                                errors.pricePerUnit && t(errors.pricePerUnit)
                            }
                        />
                        <Select
                            id="status"
                            label={t("feedType.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={FEED_TYPE_STATUSES.map((value) => ({
                                value,
                                label: t(`feedType.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("feedType.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/feed/types")}
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
