import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { supplierService } from "../../../services/supplier/supplierService.js";

import { useToast } from "../../../contexts/ToastContext.jsx";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    phone: "",
    email: "",
    address: "",
    contactPerson: "",
    notes: "",
};

export function useSupplierForm(supplierId) {
    const navigate = useNavigate();

    const { showToast } = useToast();

    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(Boolean(supplierId));

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!supplierId) {
            setLoading(false);
            return;
        }

        const supplier = supplierService.getById(supplierId);

        if (supplier) {
            setForm({
                name: supplier.name ?? "",
                phone: supplier.phone ?? "",
                email: supplier.email ?? "",
                address: supplier.address ?? "",
                contactPerson: supplier.contactPerson ?? "",
                notes: supplier.notes ?? "",
            });
        }

        setLoading(false);
    }, [supplierId]);

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
            form: undefined,
        }));
    };

    const submit = () => {
        setSaving(true);

        const result =
            supplierId ?
                supplierService.update(supplierId, form)
            :   supplierService.create(form);

        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(supplierId ? "supplier.toast.updated" : "supplier.toast.created"),
            "success",
        );

        navigate("/suppliers");
    };

    return {
        form,
        errors,

        loading,
        saving,

        updateField,
        submit,
    };
}
