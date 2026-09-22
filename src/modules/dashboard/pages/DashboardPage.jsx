import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useDashboard } from "../hooks/useDashboard.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { StatCard } from "../../../components/common/StatCard.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

export function DashboardPage() {
    const { t } = useLanguage();
    const { stats, loading } = useDashboard();

    if (loading) {
        return <LoadingState />;
    }

    const currency = t("dashboard.units.currency");
    const liters = t("dashboard.units.liters");

    const statCards = [
        {
            key: "totalCows",
            value: stats.totalCows,
            icon: "🐄",
            variant: "primary",
        },
        {
            key: "totalCalves",
            value: stats.totalCalves,
            icon: "🐮",
            variant: "info",
        },
        {
            key: "milkToday",
            value: `${stats.milkToday} ${liters}`,
            icon: "🥛",
            variant: "primary",
        },
        {
            key: "milkThisMonth",
            value: `${stats.milkThisMonth} ${liters}`,
            icon: "🥛",
            variant: "info",
        },
        {
            key: "todayRevenue",
            value: `${currency}${stats.todayRevenue}`,
            icon: "💰",
            variant: "success",
        },
        {
            key: "todayExpense",
            value: `${currency}${stats.todayExpense}`,
            icon: "💸",
            variant: "danger",
        },
        {
            key: "netProfitToday",
            value: `${currency}${stats.netProfitToday}`,
            icon: "📈",
            variant: stats.netProfitToday >= 0 ? "success" : "danger",
        },
        {
            key: "feedStock",
            value: stats.feedStock,
            icon: "🌾",
            variant: "warning",
        },
        {
            key: "medicineStock",
            value: stats.medicineStock,
            icon: "💊",
            variant: "info",
        },
        {
            key: "pregnantCows",
            value: stats.pregnantCows,
            icon: "🤰",
            variant: "primary",
        },
        {
            key: "expectedCalving",
            value: stats.expectedCalvingSoon,
            icon: "📅",
            variant: "warning",
        },
        {
            key: "vaccinationDue",
            value: stats.vaccinationDueSoon,
            icon: "💉",
            variant: "danger",
        },
        {
            key: "tasksToday",
            value: stats.tasksToday,
            icon: "✅",
            variant: "info",
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("nav.dashboard")}
                description={t("dashboard.subtitle")}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <StatCard
                        key={card.key}
                        label={t(`dashboard.stats.${card.key}`)}
                        value={card.value}
                        icon={card.icon}
                        variant={card.variant}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                <Card>
                    <h2 className="font-semibold text-text-primary mb-2">
                        {t("dashboard.charts.milkTrendTitle")}
                    </h2>
                    <EmptyState
                        icon="📊"
                        title={t("dashboard.charts.emptyTitle")}
                        description={t("dashboard.charts.emptyDescription")}
                    />
                </Card>

                <Card>
                    <h2 className="font-semibold text-text-primary mb-2">
                        {t("dashboard.charts.revenueExpenseTitle")}
                    </h2>
                    <EmptyState
                        icon="📈"
                        title={t("dashboard.charts.emptyTitle")}
                        description={t("dashboard.charts.emptyDescription")}
                    />
                </Card>
            </div>
        </div>
    );
}
