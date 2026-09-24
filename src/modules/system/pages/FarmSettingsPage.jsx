import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useSettingsForm } from "../hooks/useSettingsForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Button } from "../../../components/common/Button.jsx";
import {
    CURRENCY_OPTIONS,
    DATE_FORMAT_OPTIONS,
} from "../../../constants/system.js";
import { SystemTabs } from "../components/SystemTabs.jsx";

export function FarmSettingsPage() {
    const { t } = useLanguage();
    const { form, errors, saving, updateField, submit } = useSettingsForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={t("nav.system")}
                description={t("settings.description")}
            />
            <SystemTabs />

            <Card className="max-w-md mt-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        id="farmName"
                        label={t("settings.fields.farmName")}
                        value={form.farmName}
                        onChange={(e) =>
                            updateField("farmName", e.target.value)
                        }
                        error={errors.farmName && t(errors.farmName)}
                    />
                    <Select
                        id="currency"
                        label={t("settings.fields.currency")}
                        value={form.currency}
                        onChange={(e) =>
                            updateField("currency", e.target.value)
                        }
                        options={CURRENCY_OPTIONS.map((value) => ({
                            value,
                            label: value,
                        }))}
                    />
                    <Select
                        id="dateFormat"
                        label={t("settings.fields.dateFormat")}
                        value={form.dateFormat}
                        onChange={(e) =>
                            updateField("dateFormat", e.target.value)
                        }
                        options={DATE_FORMAT_OPTIONS.map((value) => ({
                            value,
                            label: value,
                        }))}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" isLoading={saving}>
                            {t("herd.actions.save")}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
