import { useState } from "react";
import { settingsService } from "../../../services/system/settingsService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

export function useSettingsForm() {
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(settingsService.get());
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result = settingsService.update(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(t("settings.toast.saved"), "success");
    };

    return { form, errors, saving, updateField, submit };
}
