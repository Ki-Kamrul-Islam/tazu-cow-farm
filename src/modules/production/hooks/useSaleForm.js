import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saleService } from "../../../services/production/saleService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    customerId: "",
    date: "",
    quantity: "",
    pricePerLiter: "",
    paidAmount: "",
    notes: "",
};

export function useSaleForm(saleId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(saleId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!saleId) {
            setLoading(false);
            return;
        }
        const sale = saleService.getById(saleId);
        if (sale) setForm({ ...EMPTY_FORM, ...sale });
        setLoading(false);
    }, [saleId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            saleId ?
                saleService.update(saleId, form)
            :   saleService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(saleId ? "sales.toast.updated" : "sales.toast.created"),
            "success",
        );
        navigate("/production/sales");
    };

    return { form, errors, loading, saving, updateField, submit };
}
