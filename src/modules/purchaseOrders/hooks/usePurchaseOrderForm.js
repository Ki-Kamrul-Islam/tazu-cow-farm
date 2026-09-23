import { getTodayDateString } from "../../../utils/date.js";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { purchaseOrderService } from "../../../services/purchaseOrder/purchaseOrderService.js";

import { supplierService } from "../../../services/supplier/supplierService.js";

import { inventoryItemService } from "../../../services/inventory/inventoryItemService.js";

const EMPTY_FORM = {
    supplierId: "",
    orderDate: getTodayDateString(),
    expectedDate: "",
    notes: "",
    items: [],
};

export function usePurchaseOrderForm() {
    const { id } = useParams();

    const navigate = useNavigate();

    const { showToast } = useToast();

    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);

    const [suppliers, setSuppliers] = useState([]);

    const [inventoryItems, setInventoryItems] = useState([]);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(Boolean(id));

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setSuppliers(
            supplierService
                .list()
                .filter((supplier) => supplier.status === "active"),
        );

        setInventoryItems(
            inventoryItemService
                .list()
                .filter((item) => item.status === "active"),
        );
    }, []);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const order = purchaseOrderService.getById(id);

        if (order) {
            setForm({
                supplierId: order.supplierId,

                orderDate: order.orderDate,

                expectedDate: order.expectedDate || "",

                notes: order.notes || "",

                items: order.items || [],
            });
        }

        setLoading(false);
    }, [id]);

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));
    };

    const addItem = () => {
        setForm((previous) => ({
            ...previous,

            items: [
                ...previous.items,
                {
                    id: crypto.randomUUID(),

                    inventoryItemId: inventoryItems[0]?.id || "",

                    quantity: 1,

                    unitCost: 0,

                    total: 0,
                },
            ],
        }));
    };

    const updateItem = (itemId, field, value) => {
        setForm((previous) => ({
            ...previous,

            items: previous.items.map((item) => {
                if (item.id !== itemId) {
                    return item;
                }

                const updated = {
                    ...item,
                    [field]: value,
                };

                updated.total =
                    Number(updated.quantity || 0) *
                    Number(updated.unitCost || 0);

                return updated;
            }),
        }));
    };

    const removeItem = (itemId) => {
        setForm((previous) => ({
            ...previous,

            items: previous.items.filter((item) => item.id !== itemId),
        }));
    };

    const submit = () => {
        setSaving(true);

        const result =
            id ?
                purchaseOrderService.update(id, form)
            :   purchaseOrderService.create(form);

        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(
                id ?
                    "purchaseOrder.toast.updated"
                :   "purchaseOrder.toast.created",
            ),
            "success",
        );

        navigate("/purchase-orders");
    };

    const subtotal = form.items.reduce(
        (sum, item) =>
            sum + Number(item.quantity || 0) * Number(item.unitCost || 0),
        0,
    );

    return {
        form,
        suppliers,
        inventoryItems,

        errors,

        loading,
        saving,

        subtotal,

        updateField,
        addItem,
        updateItem,
        removeItem,

        submit,
    };
}
