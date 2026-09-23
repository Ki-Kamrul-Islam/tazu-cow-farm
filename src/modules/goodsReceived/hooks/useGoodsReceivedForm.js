import { useEffect, useState } from "react";
import { getTodayDateString } from "../../../utils/date.js";

import { useNavigate, useParams } from "react-router-dom";

import { useToast } from "../../../contexts/ToastContext.jsx";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { purchaseOrderService } from "../../../services/purchaseOrder/purchaseOrderService.js";

import { goodsReceivedService } from "../../../services/goodsReceived/goodsReceivedService.js";

const EMPTY_FORM = {
    receivedDate: getTodayDateString(),

    notes: "",

    items: [],
};

export function useGoodsReceivedForm() {
    const { id: purchaseOrderId } = useParams();

    const navigate = useNavigate();

    const { showToast } = useToast();

    const { t } = useLanguage();

    const [purchaseOrder, setPurchaseOrder] = useState(null);

    const [form, setForm] = useState(EMPTY_FORM);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!purchaseOrderId) {
            setLoading(false);
            return;
        }

        const order = purchaseOrderService.getById(purchaseOrderId);

        if (!order) {
            setLoading(false);
            return;
        }

        setPurchaseOrder(order);

        const summary =
            goodsReceivedService.getPurchaseOrderReceivingSummary(
                purchaseOrderId,
            );

        setForm({
            receivedDate: getTodayDateString(),

            notes: "",

            items: summary.map((item) => ({
                ...item,

                receivedQuantity: 0,
            })),
        });

        setLoading(false);
    }, [purchaseOrderId]);

    const updateReceivedQuantity = (purchaseOrderItemId, quantity) => {
        setForm((previous) => ({
            ...previous,

            items: previous.items.map((item) =>
                item.purchaseOrderItemId === purchaseOrderItemId ?
                    {
                        ...item,

                        receivedQuantity: quantity,
                    }
                :   item,
            ),
        }));

        setErrors((previous) => ({
            ...previous,
            items: undefined,
        }));
    };

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const submit = () => {
        setSaving(true);

        const result = goodsReceivedService.receive(
            purchaseOrderId,

            form.items,

            form.receivedDate,

            form.notes,
        );

        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);

            return;
        }

        showToast(t("goodsReceived.toast.created"), "success");

        navigate(`/purchase-orders`);
    };

    return {
        purchaseOrder,

        form,

        loading,
        saving,

        errors,

        updateReceivedQuantity,
        updateField,

        submit,
    };
}
