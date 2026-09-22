import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { feedTypeService } from "../../../services/feed/feedTypeService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    category: "roughage",
    unit: "kg",
    pricePerUnit: "",
    status: "active",
    notes: "",
};

export function useFeedTypeForm(feedTypeId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(feedTypeId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!feedTypeId) {
            setLoading(false);
            return;
        }

        const feedType = feedTypeService.getById(feedTypeId);
        if (feedType) {
            setForm({
                name: feedType.name,
                category: feedType.category,
                unit: feedType.unit,
                pricePerUnit: feedType.pricePerUnit ?? "",
                status: feedType.status,
                notes: feedType.notes,
            });
        }
        setLoading(false);
    }, [feedTypeId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);

        const result =
            feedTypeId ?
                feedTypeService.update(feedTypeId, form)
            :   feedTypeService.create(form);

        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(feedTypeId ? "feedType.toast.updated" : "feedType.toast.created"),
            "success",
        );
        navigate("/feed/types");
    };

    return { form, errors, loading, saving, updateField, submit };
}
