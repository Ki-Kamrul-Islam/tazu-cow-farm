import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animalTransferService } from "../../../services/herd/animalTransferService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = { animalId: "", toGroup: "", date: "", reason: "" };

export function useAnimalTransferForm() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result = animalTransferService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(t("transfer.toast.created"), "success");
        navigate("/herd/transfers");
    };

    return { form, errors, saving, updateField, submit };
}
