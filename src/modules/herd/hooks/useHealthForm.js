import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { healthService } from "../../../services/herd/healthService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    animalId: "",
    type: "vaccination",
    date: "",
    diseaseOrReason: "",
    medicine: "",
    dosage: "",
    vetName: "",
    cost: "",
    nextDueDate: "",
    notes: "",
};

export function useHealthForm(recordId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(recordId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!recordId) {
            setLoading(false);
            return;
        }
        const record = healthService.getById(recordId);
        if (record) setForm({ ...EMPTY_FORM, ...record });
        setLoading(false);
    }, [recordId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            recordId ?
                healthService.update(recordId, form)
            :   healthService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "health.toast.updated" : "health.toast.created"),
            "success",
        );
        navigate("/herd/health");
    };

    return { form, errors, loading, saving, updateField, submit };
}
