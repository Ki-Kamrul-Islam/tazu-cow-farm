import { useNavigate } from "react-router-dom";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";

import { useGoodsReceivedForm } from "../hooks/useGoodsReceivedForm.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { Input } from "../../../components/common/Input.jsx";

export function GoodsReceivedPage() {
    const navigate = useNavigate();

    const { t } = useLanguage();

    const {
        purchaseOrder,

        form,

        loading,
        saving,

        errors,

        updateReceivedQuantity,
        updateField,

        submit,
    } = useGoodsReceivedForm();

    if (loading) {
        return <LoadingState />;
    }

    if (!purchaseOrder) {
        return (
            <div className="p-6">
                {t("goodsReceived.purchaseOrderNotFound")}
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title={t("goodsReceived.title")}
                description={t("goodsReceived.description")}
            />

            <div className="flex flex-col gap-4">
                {/* PO Summary */}
                <Card>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-text-muted">
                                {t("goodsReceived.fields.poNumber")}
                            </p>

                            <p className="font-semibold text-text-primary">
                                {purchaseOrder.poNumber}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-text-muted">
                                {t("goodsReceived.fields.orderDate")}
                            </p>

                            <p className="font-semibold text-text-primary">
                                {purchaseOrder.orderDate}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-text-muted">
                                {t("goodsReceived.fields.expectedDate")}
                            </p>

                            <p className="font-semibold text-text-primary">
                                {purchaseOrder.expectedDate || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-text-muted">
                                {t("goodsReceived.fields.total")}
                            </p>

                            <p className="font-semibold text-text-primary">
                                ৳{Number(purchaseOrder.total || 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Receive Items */}
                <Card>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">
                        {t("goodsReceived.sections.items")}
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left p-3">
                                        {t("goodsReceived.fields.item")}
                                    </th>

                                    <th className="text-left p-3">
                                        {t("goodsReceived.fields.ordered")}
                                    </th>

                                    <th className="text-left p-3">
                                        {t(
                                            "goodsReceived.fields.alreadyReceived",
                                        )}
                                    </th>

                                    <th className="text-left p-3">
                                        {t("goodsReceived.fields.remaining")}
                                    </th>

                                    <th className="text-left p-3">
                                        {t("goodsReceived.fields.receiveNow")}
                                    </th>

                                    <th className="text-left p-3">
                                        {t("goodsReceived.fields.unitCost")}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {form.items.map((item) => (
                                    <tr
                                        key={item.purchaseOrderItemId}
                                        className="border-b border-border"
                                    >
                                        <td className="p-3">
                                            {item.inventoryItemId}
                                        </td>

                                        <td className="p-3">
                                            {item.orderedQuantity}
                                        </td>

                                        <td className="p-3">
                                            {item.receivedQuantity}
                                        </td>

                                        <td className="p-3 font-semibold">
                                            {item.remainingQuantity}
                                        </td>

                                        <td className="p-3">
                                            <Input
                                                type="number"
                                                min="0"
                                                max={item.remainingQuantity}
                                                value={item.receivedQuantity}
                                                onChange={(event) =>
                                                    updateReceivedQuantity(
                                                        item.purchaseOrderItemId,
                                                        Number(
                                                            event.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </td>

                                        <td className="p-3">
                                            ৳
                                            {Number(item.unitCost || 0).toFixed(
                                                2,
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {errors.items && (
                        <p className="mt-4 text-sm text-danger">
                            {t(errors.items)}
                        </p>
                    )}
                </Card>

                {/* Receiving Details */}
                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label={t("goodsReceived.fields.receivedDate")}
                            type="date"
                            value={form.receivedDate}
                            onChange={(event) =>
                                updateField("receivedDate", event.target.value)
                            }
                        />

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                {t("goodsReceived.fields.notes")}
                            </label>

                            <textarea
                                value={form.notes}
                                onChange={(event) =>
                                    updateField("notes", event.target.value)
                                }
                                rows={4}
                                className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text-primary"
                            />
                        </div>
                    </div>

                    {errors.form && (
                        <p className="mt-4 text-sm text-danger">
                            {t(errors.form)}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/purchase-orders")}
                        >
                            {t("goodsReceived.actions.cancel")}
                        </Button>

                        <Button loading={saving} onClick={submit}>
                            {t("goodsReceived.actions.receive")}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
