import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cropService } from "../../../services/land/cropService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    fieldId: "",
    cropType: "",
    plantingDate: "",
    harvestDate: "",
    yieldQuantity: "",
    yieldUnit: "kg",
    cost: "",
    notes: "",
};

export function useCropForm(recordId) {
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
        const record = cropService.getById(recordId);
        if (record)
            setForm({
                ...EMPTY_FORM,
                ...record,
                yieldQuantity: record.yieldQuantity ?? "",
            });
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
                cropService.update(recordId, form)
            :   cropService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "crop.toast.updated" : "crop.toast.created"),
            "success",
        );
        navigate("/land/crops");
    };

    return { form, errors, loading, saving, updateField, submit };
}
