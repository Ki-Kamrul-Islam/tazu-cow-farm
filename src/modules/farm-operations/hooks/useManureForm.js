import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { manureService } from "../../../services/farmOperations/manureService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = { type: "", date: "", quantity: "", notes: "" };

export function useManureForm(recordId) {
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
        const record = manureService.getById(recordId);
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
                manureService.update(recordId, form)
            :   manureService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "manure.toast.updated" : "manure.toast.created"),
            "success",
        );
        navigate("/farm-operations");
    };

    return { form, errors, loading, saving, updateField, submit };
}
