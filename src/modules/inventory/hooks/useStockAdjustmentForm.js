import { useEffect, useState } from "react";
import { getTodayDateString } from "../../../utils/date.js";

import stockAdjustmentService from "../services/stockAdjustmentService.js";
import { inventoryItemService } from "../../../services/inventory/inventoryItemService.js";

function createInitialForm() {
    return {
        inventoryItemId: "",
        type: "increase",
        quantity: "",
        reason: "",
        notes: "",
        date: getTodayDateString(),
    };
}

export default function useStockAdjustmentForm() {
    const [form, setForm] = useState(createInitialForm);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(inventoryItemService.list({ status: "active" }));
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    }

    async function submit(event) {
        event.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            stockAdjustmentService.createAdjustment(form);

            setSuccess("Stock adjustment created successfully.");

            setForm(createInitialForm());
            setItems(inventoryItemService.list({ status: "active" }));
        } catch (error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return {
        form,
        loading,
        error,
        success,
        items,
        handleChange,
        submit,
    };
}
