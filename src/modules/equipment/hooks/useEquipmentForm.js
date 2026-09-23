import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { equipmentService } from "../../../services/equipment/equipmentService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    type: "tractor",
    purchaseDate: "",
    purchaseCost: "",
    status: "active",
    notes: "",
};

export function useEquipmentForm(equipmentId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(equipmentId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!equipmentId) {
            setLoading(false);
            return;
        }
        const equipment = equipmentService.getById(equipmentId);
        if (equipment) setForm({ ...EMPTY_FORM, ...equipment });
        setLoading(false);
    }, [equipmentId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            equipmentId ?
                equipmentService.update(equipmentId, form)
            :   equipmentService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(
                equipmentId ?
                    "equipmentItem.toast.updated"
                :   "equipmentItem.toast.created",
            ),
            "success",
        );
        navigate("/equipment");
    };

    return { form, errors, loading, saving, updateField, submit };
}
