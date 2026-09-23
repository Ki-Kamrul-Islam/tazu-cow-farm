import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFeedForm } from "../hooks/useFeedForm.js";
import { feedService } from "../../../services/feed/feedService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function FeedFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useFeedForm(id);

    if (loading) return <LoadingState />;

    const feedTypeOptions = feedService.getActiveFeedTypes().map((f) => ({
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
                title={
                    id ?
                        t("feeding.form.editTitle")
                    :   t("feeding.form.addTitle")
                }
                description={t("feeding.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="feedTypeId"
                        label={t("feedType.fields.name")}
                        value={form.feedTypeId}
                        onChange={(e) =>
                            updateField("feedTypeId", e.target.value)
                        }
                        placeholder={t("feeding.form.selectFeedType")}
                        options={feedTypeOptions}
                        error={errors.feedTypeId && t(errors.feedTypeId)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("feeding.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Input
                        id="group"
                        label={t("feeding.fields.group")}
                        value={form.group}
                        onChange={(e) => updateField("group", e.target.value)}
                    />
                    <Input
                        id="quantity"
                        type="number"
                        step="0.1"
                        label={t("feeding.fields.quantity")}
                        value={form.quantity}
                        onChange={(e) =>
                            updateField("quantity", e.target.value)
                        }
                        error={errors.quantity && t(errors.quantity)}
                    />
                    <Textarea
                        id="notes"
                        label={t("feeding.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/feed")}
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
