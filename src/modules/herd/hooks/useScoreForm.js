import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { scoreService } from "../../../services/herd/scoreService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    animalId: "",
    date: "",
    bodyConditionScore: "",
    udderScore: "",
    mobilityScore: "",
    notes: "",
};

export function useScoreForm(recordId) {
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
        const record = scoreService.getById(recordId);
        if (record) {
            setForm({
                ...EMPTY_FORM,
                ...record,
                bodyConditionScore: record.bodyConditionScore ?? "",
                udderScore: record.udderScore ?? "",
                mobilityScore: record.mobilityScore ?? "",
            });
        }
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
                scoreService.update(recordId, form)
            :   scoreService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "scoring.toast.updated" : "scoring.toast.created"),
            "success",
        );
        navigate("/herd/scoring");
    };

    return { form, errors, loading, saving, updateField, submit };
}
