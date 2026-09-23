import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useIncomes } from "../hooks/useIncomes.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ConfirmDialog } from "../../../components/common/ConfirmDialog.jsx";
import { INCOME_CATEGORIES } from "../../../constants/finance.js";
import { FinanceTabs } from "../components/FinanceTabs.jsx";

export function IncomeListPage() {
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
    } = useIncomes();
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const columns = [
        {
            key: "category",
            header: t("income.fields.category"),
            render: (row) => t(`income.category.${row.category}`),
        },
        { key: "date", header: t("income.fields.date") },
        {
            key: "paymentMethod",
            header: t("income.fields.paymentMethod"),
            render: (row) => t(`expense.paymentMethod.${row.paymentMethod}`),
        },
        {
            key: "amount",
            header: t("income.fields.amount"),
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
                        onClick={() =>
                            navigate(`/finance/income/${row.id}/edit`)
                        }
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
                description={t("income.list.description")}
                action={
                    <Button onClick={() => navigate("/finance/income/add")}>
                        {t("income.actions.addIncome")}
                    </Button>
                }
            />
            <FinanceTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 mt-4 max-w-xl">
                <StatCard
                    label={t("income.stats.todayTotal")}
                    value={`৳${todayTotal.toFixed(2)}`}
                    icon="💰"
                    variant="success"
                />
                <StatCard
                    label={t("income.stats.filteredTotal")}
                    value={`৳${filteredTotal.toFixed(2)}`}
                    icon="📊"
                    variant="info"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 max-w-xl">
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder={t("income.list.filterByCategory")}
                    options={INCOME_CATEGORIES.map((value) => ({
                        value,
                        label: t(`income.category.${value}`),
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
                    icon="💰"
                    title={t("income.list.emptyTitle")}
                    description={t("income.list.emptyDescription")}
                    action={
                        <Button onClick={() => navigate("/finance/income/add")}>
                            {t("income.actions.addIncome")}
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
                title={t("income.deleteDialog.title")}
                message={t("income.deleteDialog.message")}
            />
        </div>
    );
}
