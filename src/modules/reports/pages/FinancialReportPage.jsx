import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFinancialReport } from "../hooks/useFinancialReport.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ReportsTabs } from "../components/ReportsTabs.jsx";
import { ChartCard } from "../components/ChartCard.jsx";

const PIE_COLORS = [
    "#16a34a",
    "#0ea5e9",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#64748b",
    "#22c55e",
    "#3b82f6",
];

export function FinancialReportPage() {
    const { t } = useLanguage();
    const { trend, categoryBreakdown, summary, loading } = useFinancialReport();

    if (loading) return <LoadingState />;

    return (
        <div>
            <PageHeader
                title={t("nav.reports")}
                description={t("financeReport.description")}
            />
            <ReportsTabs />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 mt-4">
                <StatCard
                    label={t("financeReport.stats.totalIncome")}
                    value={`৳${summary.totalIncome.toFixed(2)}`}
                    icon="💰"
                    variant="success"
                />
                <StatCard
                    label={t("financeReport.stats.totalExpense")}
                    value={`৳${summary.totalExpense.toFixed(2)}`}
                    icon="💸"
                    variant="danger"
                />
                <StatCard
                    label={t("financeReport.stats.netProfit")}
                    value={`৳${summary.netProfit.toFixed(2)}`}
                    icon="📈"
                    variant={summary.netProfit >= 0 ? "success" : "danger"}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard title={t("financeReport.charts.trendTitle")}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trend}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--color-border)"
                            />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11 }}
                                tickFormatter={(v) => v.slice(5)}
                            />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Legend />
                            <Area
                                type="monotone"
                                dataKey="income"
                                name={t("financeReport.charts.income")}
                                stroke="#16a34a"
                                fill="#16a34a"
                                fillOpacity={0.2}
                            />
                            <Area
                                type="monotone"
                                dataKey="expense"
                                name={t("financeReport.charts.expense")}
                                stroke="#ef4444"
                                fill="#ef4444"
                                fillOpacity={0.2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title={t("financeReport.charts.categoryTitle")}>
                    {categoryBreakdown.length === 0 ?
                        <p className="text-sm text-text-muted text-center pt-20">
                            {t("financeReport.charts.noData")}
                        </p>
                    :   <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryBreakdown}
                                    dataKey="value"
                                    nameKey="category"
                                    innerRadius={60}
                                    outerRadius={90}
                                    label={(entry) =>
                                        t(`expense.category.${entry.category}`)
                                    }
                                >
                                    {categoryBreakdown.map((entry, index) => (
                                        <Cell
                                            key={entry.category}
                                            fill={
                                                PIE_COLORS[
                                                    index % PIE_COLORS.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name, entry) => [
                                        `৳${value.toFixed(2)}`,
                                        t(
                                            `expense.category.${entry.payload.category}`,
                                        ),
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    }
                </ChartCard>
            </div>
        </div>
    );
}
