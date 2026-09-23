import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { usePurchaseOrderForm } from "../hooks/usePurchaseOrderForm.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function PurchaseOrderFormPage() {
    const navigate = useNavigate();

    const { t } = useLanguage();

    const {
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
    } = usePurchaseOrderForm();

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div>
            <PageHeader
                title={t("purchaseOrder.form.title")}
                description={t("purchaseOrder.form.description")}
            />

            <div className="flex flex-col gap-4">
                {/* PO Information */}
                <Card>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">
                        {t("purchaseOrder.sections.basicInfo")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                {t("purchaseOrder.fields.supplier")}
                            </label>

                            <select
                                value={form.supplierId}
                                onChange={(event) =>
                                    updateField(
                                        "supplierId",
                                        event.target.value,
                                    )
                                }
                                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                            >
                                <option value="">
                                    {t("purchaseOrder.selectSupplier")}
                                </option>

                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>

                            {errors.supplierId && (
                                <p className="text-sm text-danger mt-1">
                                    {t(errors.supplierId)}
                                </p>
                            )}
                        </div>

                        <Input
                            label={t("purchaseOrder.fields.orderDate")}
                            type="date"
                            value={form.orderDate}
                            onChange={(event) =>
                                updateField("orderDate", event.target.value)
                            }
                        />

                        <Input
                            label={t("purchaseOrder.fields.expectedDate")}
                            type="date"
                            value={form.expectedDate}
                            onChange={(event) =>
                                updateField("expectedDate", event.target.value)
                            }
                        />
                    </div>
                </Card>

                {/* PO Items */}
                <Card>
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <h2 className="text-lg font-semibold text-text-primary">
                            {t("purchaseOrder.sections.items")}
                        </h2>

                        <Button size="sm" onClick={addItem}>
                            {t("purchaseOrder.actions.addItem")}
                        </Button>
                    </div>

                    {form.items.length === 0 ?
                        <div className="border border-dashed border-border rounded-xl p-8 text-center">
                            <p className="text-text-muted mb-3">
                                {t("purchaseOrder.noItems")}
                            </p>

                            <Button onClick={addItem}>
                                {t("purchaseOrder.actions.addItem")}
                            </Button>
                        </div>
                    :   <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left p-3">
                                            {t("purchaseOrder.fields.item")}
                                        </th>

                                        <th className="text-left p-3">
                                            {t("purchaseOrder.fields.quantity")}
                                        </th>

                                        <th className="text-left p-3">
                                            {t("purchaseOrder.fields.unitCost")}
                                        </th>

                                        <th className="text-left p-3">
                                            {t("purchaseOrder.fields.total")}
                                        </th>

                                        <th className="text-left p-3">
                                            {t("purchaseOrder.fields.actions")}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {form.items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-border"
                                        >
                                            <td className="p-3">
                                                <select
                                                    value={item.inventoryItemId}
                                                    onChange={(event) =>
                                                        updateItem(
                                                            item.id,
                                                            "inventoryItemId",
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                                                >
                                                    <option value="">
                                                        {t(
                                                            "purchaseOrder.selectItem",
                                                        )}
                                                    </option>

                                                    {inventoryItems.map(
                                                        (inventoryItem) => (
                                                            <option
                                                                key={
                                                                    inventoryItem.id
                                                                }
                                                                value={
                                                                    inventoryItem.id
                                                                }
                                                            >
                                                                {
                                                                    inventoryItem.name
                                                                }
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </td>

                                            <td className="p-3">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    value={item.quantity}
                                                    onChange={(event) =>
                                                        updateItem(
                                                            item.id,
                                                            "quantity",
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td className="p-3">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={item.unitCost}
                                                    onChange={(event) =>
                                                        updateItem(
                                                            item.id,
                                                            "unitCost",
                                                            event.target.value,
                                                        )
                                                    }
                                                />
                                            </td>

                                            <td className="p-3 font-semibold">
                                                ৳
                                                {Number(item.quantity || 0) *
                                                    Number(item.unitCost || 0)}
                                            </td>

                                            <td className="p-3">
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                >
                                                    {t(
                                                        "purchaseOrder.actions.remove",
                                                    )}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }

                    {errors.items && (
                        <p className="text-sm text-danger mt-3">
                            {t(errors.items)}
                        </p>
                    )}
                </Card>

                {/* Notes + Total */}
                <Card>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                {t("purchaseOrder.fields.notes")}
                            </label>

                            <textarea
                                value={form.notes}
                                onChange={(event) =>
                                    updateField("notes", event.target.value)
                                }
                                rows={5}
                                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                            />
                        </div>

                        <div className="lg:flex lg:justify-end">
                            <div className="w-full lg:max-w-sm">
                                <div className="flex justify-between py-3 border-b border-border">
                                    <span>
                                        {t("purchaseOrder.fields.subtotal")}
                                    </span>

                                    <strong>৳{subtotal.toFixed(2)}</strong>
                                </div>

                                <div className="flex justify-between py-4 text-lg">
                                    <span className="font-semibold">
                                        {t("purchaseOrder.fields.total")}
                                    </span>

                                    <strong>৳{subtotal.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {errors.form && (
                        <p className="text-sm text-danger mt-4">
                            {t(errors.form)}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/purchase-orders")}
                        >
                            {t("purchaseOrder.actions.cancel")}
                        </Button>

                        <Button loading={saving} onClick={submit}>
                            {t("purchaseOrder.actions.save")}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
