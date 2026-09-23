import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { waterService } from "../../../services/farmOperations/waterService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = { purpose: "", date: "", quantity: "", cost: "", notes: "" };

export function useWaterForm(recordId) {
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
        const record = waterService.getById(recordId);
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
                waterService.update(recordId, form)
            :   waterService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "water.toast.updated" : "water.toast.created"),
            "success",
        );
        navigate("/farm-operations/water");
    };

    return { form, errors, loading, saving, updateField, submit };
}
