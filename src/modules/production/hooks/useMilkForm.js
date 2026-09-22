import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { milkService } from "../../../services/production/milkService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    animalId: "",
    date: "",
    session: "morning",
    quantity: "",
    notes: "",
};

export function useMilkForm(recordId) {
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
        const record = milkService.getById(recordId);
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
                milkService.update(recordId, form)
            :   milkService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "milk.toast.updated" : "milk.toast.created"),
            "success",
        );
        navigate("/production");
    };

    return { form, errors, loading, saving, updateField, submit };
}
