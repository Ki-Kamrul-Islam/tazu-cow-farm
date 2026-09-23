import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fieldService } from "../../../services/land/fieldService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    area: "",
    areaUnit: "decimal",
    soilType: "loamy",
    waterSource: "",
    status: "active",
    notes: "",
};

export function useFieldForm(fieldId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(fieldId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!fieldId) {
            setLoading(false);
            return;
        }
        const field = fieldService.getById(fieldId);
        if (field) setForm({ ...EMPTY_FORM, ...field });
        setLoading(false);
    }, [fieldId]);

    const updateField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            fieldId ?
                fieldService.update(fieldId, form)
            :   fieldService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(fieldId ? "field.toast.updated" : "field.toast.created"),
            "success",
        );
        navigate("/land");
    };

    return { form, errors, loading, saving, updateField, submit };
}
