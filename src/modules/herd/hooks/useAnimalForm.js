import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { animalService } from "../../../services/herd/animalService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    animalId: "",
    name: "",
    type: "cow",
    gender: "female",
    breed: "",
    dateOfBirth: "",
    weight: "",
    group: "",
    status: "active",
    notes: "",
};

export function useAnimalForm(animalId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(animalId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!animalId) {
            setLoading(false);
            return;
        }

        const animal = animalService.getById(animalId);
        if (animal) {
            setForm({
                animalId: animal.animalId,
                name: animal.name,
                type: animal.type,
                gender: animal.gender,
                breed: animal.breed,
                dateOfBirth: animal.dateOfBirth,
                weight: animal.weight ?? "",
                group: animal.group,
                status: animal.status,
                notes: animal.notes,
            });
        }
        setLoading(false);
    }, [animalId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);

        const result =
            animalId ?
                animalService.update(animalId, form)
            :   animalService.create(form);

        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(animalId ? "herd.toast.updated" : "herd.toast.created"),
            "success",
        );
        navigate("/herd");
    };

    return { form, errors, loading, saving, updateField, submit };
}
