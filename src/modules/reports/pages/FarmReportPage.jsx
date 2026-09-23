import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useFarmReport } from "../hooks/useFarmReport.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { ReportsTabs } from "../components/ReportsTabs.jsx";
import { ChartCard } from "../components/ChartCard.jsx";

export function FarmReportPage() {
    const { t } = useLanguage();
    const { herdDistribution, milkTrend, loading } = useFarmReport();

    if (loading) return <LoadingState />;

    const herdChartData = herdDistribution.map((row) => ({
        ...row,
        label: t(`herd.animalType.${row.type}`),
    }));

    return (
        <div>
            <PageHeader
                title={t("nav.reports")}
                description={t("farmReport.description")}
            />
            <ReportsTabs />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <ChartCard title={t("farmReport.charts.herdTitle")}>
                    {herdChartData.length === 0 ?
                        <p className="text-sm text-text-muted text-center pt-20">
                            {t("farmReport.charts.noData")}
                        </p>
                    :   <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={herdChartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="var(--color-border)"
                                />
                                <XAxis
                                    dataKey="label"
                                    tick={{ fontSize: 11 }}
                                />
                                <YAxis
                                    tick={{ fontSize: 11 }}
                                    allowDecimals={false}
                                />
                                <Tooltip />
                                <Bar
                                    dataKey="count"
                                    fill="#16a34a"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </ChartCard>

                <ChartCard title={t("farmReport.charts.milkTitle")}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={milkTrend}>
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
                            <Line
                                type="monotone"
                                dataKey="quantity"
                                name={t("farmReport.charts.milkQuantity")}
                                stroke="#0ea5e9"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
}
