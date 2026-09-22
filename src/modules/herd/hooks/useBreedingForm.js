import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { breedingService } from "../../../services/herd/breedingService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    animalId: "",
    breedingDate: "",
    method: "ai",
    sireInfo: "",
    status: "bred",
    pregnancyDiagnosisDate: "",
    expectedCalvingDate: "",
    actualCalvingDate: "",
    notes: "",
};

export function useBreedingForm(recordId) {
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
        const record = breedingService.getById(recordId);
        if (record) setForm({ ...EMPTY_FORM, ...record });
        setLoading(false);
    }, [recordId]);

    const updateField = (field, value) => {
        setForm((prev) => {
            const next = { ...prev, [field]: value };
            if (field === "breedingDate" && !prev.expectedCalvingDate) {
                next.expectedCalvingDate =
                    breedingService.suggestExpectedCalvingDate(value);
            }
            return next;
        });
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            recordId ?
                breedingService.update(recordId, form)
            :   breedingService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(recordId ? "breeding.toast.updated" : "breeding.toast.created"),
            "success",
        );
        navigate("/herd/breeding");
    };

    return { form, errors, loading, saving, updateField, submit };
}
