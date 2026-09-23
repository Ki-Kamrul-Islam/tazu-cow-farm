import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useExpenses } from "../hooks/useExpenses.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { EXPENSE_CATEGORIES } from "../../../constants/finance.js";
import { FinanceTabs } from "../components/FinanceTabs.jsx";

export function ExpenseListPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const {
        records,
        loading,
        category,
        setCategory,
        date,
        setDate,
        todayTotal,
        filteredTotal,
        deleteRecord,
    } = useExpenses();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "category",
            header: t("expense.fields.category"),
            render: (row) => t(`expense.category.${row.category}`),
        },
        { key: "date", header: t("expense.fields.date") },
        {
            key: "paymentMethod",
            header: t("expense.fields.paymentMethod"),
            render: (row) => t(`expense.paymentMethod.${row.paymentMethod}`),
        },
        {
            key: "amount",
            header: t("expense.fields.amount"),
            render: (row) => `৳${row.amount.toFixed(2)}`,
        },
        {
            key: "actions",
            header: t("herd.fields.actions"),
            render: (row) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/finance/${row.id}/edit`)}
                    >
                        {t("herd.actions.edit")}
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setPendingDeleteId(row.id)}
                    >
                        {t("herd.actions.delete")}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("nav.finance")}
                description={t("expense.list.description")}
                action={
                    <Button onClick={() => navigate("/finance/add")}>
                        {t("expense.actions.addExpense")}
                    </Button>
                }
            />
            <FinanceTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("expense.stats.todayTotal")}
                    value={`৳${todayTotal.toFixed(2)}`}
                    icon="💸"
                    variant="danger"
                />
                <StatCard
                    label={t("expense.stats.filteredTotal")}
                    value={`৳${filteredTotal.toFixed(2)}`}
                    icon="📊"
                    variant="info"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder={t("expense.list.filterByCategory")}
                    options={EXPENSE_CATEGORIES.map((value) => ({
                        value,
                        label: t(`expense.category.${value}`),
                    }))}
                />
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {loading ?
                <LoadingState />
            : records.length === 0 ?
                <EmptyState
                    icon="💸"
                    title={t("expense.list.emptyTitle")}
                    description={t("expense.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/finance/add")}>
                            {t("expense.actions.addExpense")}
                        </Button>
                    }
                />
            :   <Table columns={columns} data={records} />}

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                onClose={() => setPendingDeleteId(null)}
                onConfirm={() => {
                    deleteRecord(pendingDeleteId);
                    setPendingDeleteId(null);
                }}
                title={t("expense.deleteDialog.title")}
                message={t("expense.deleteDialog.message")}
            />
        </div>
    );
}
