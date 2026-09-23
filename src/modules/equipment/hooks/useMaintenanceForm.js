import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { maintenanceService } from "../../../services/equipment/maintenanceService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    equipmentId: "",
    type: "",
    date: "",
    cost: "",
    notes: "",
};

export function useMaintenanceForm(recordId) {
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
        const record = maintenanceService.getById(recordId);
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
                maintenanceService.update(recordId, form)
            :   maintenanceService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(
                recordId ?
                    "maintenance.toast.updated"
                :   "maintenance.toast.created",
            ),
            "success",
        );
        navigate("/equipment/maintenance");
    };

    return { form, errors, loading, saving, updateField, submit };
}
