import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customerService } from "../../../services/production/customerService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    phone: "",
    address: "",
    status: "active",
    notes: "",
};

export function useCustomerForm(customerId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(customerId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!customerId) {
            setLoading(false);
            return;
        }
        const customer = customerService.getById(customerId);
        if (customer) setForm({ ...EMPTY_FORM, ...customer });
        setLoading(false);
    }, [customerId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            customerId ?
                customerService.update(customerId, form)
            :   customerService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(
                customerId ?
                    "customers.toast.updated"
                :   "customers.toast.created",
            ),
            "success",
        );
        navigate("/production/customers");
    };

    return { form, errors, loading, saving, updateField, submit };
}
