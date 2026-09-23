import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inventoryItemService } from "../../../services/inventory/inventoryItemService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    sku: "",
    category: "feed",
    unit: "kg",
    quantity: "",
    reorderLevel: "",
    status: "active",
    notes: "",
};

export function useInventoryItemForm(itemId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(itemId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!itemId) {
            setLoading(false);
            return;
        }

        const item = inventoryItemService.getById(itemId);

        if (item) {
            setForm({
                name: item.name ?? "",
                sku: item.sku ?? "",
                category: item.category ?? "feed",
                unit: item.unit ?? "kg",
                quantity: item.quantity ?? "",
                reorderLevel: item.reorderLevel ?? "",
                status: item.status ?? "active",
                notes: item.notes ?? "",
            });
        }

        setLoading(false);
    }, [itemId]);

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    const submit = () => {
        setSaving(true);

        const result =
            itemId ?
                inventoryItemService.update(itemId, form)
            :   inventoryItemService.create(form);

        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(
                itemId ?
                    "inventoryItem.toast.updated"
                :   "inventoryItem.toast.created",
            ),
            "success",
        );

        navigate("/inventory");
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
