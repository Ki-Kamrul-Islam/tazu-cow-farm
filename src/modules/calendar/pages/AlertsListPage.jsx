import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useAlerts } from "../hooks/useAlerts.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Table } from "../../../components/tables/Table.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import { CalendarTabs } from "../components/CalendarTabs.jsx";

const SEVERITY_BADGE_VARIANT = { overdue: "danger", upcoming: "warning" };
const TYPE_ICON = { vaccination: "💉", calving: "🐄", task: "📋" };

export function AlertsListPage() {
    const { t } = useLanguage();
    const { alerts, loading } = useAlerts();

    const columns = [
        {
            key: "type",
            header: t("alert.fields.type"),
            render: (row) => (
                <span>
                    {TYPE_ICON[row.type]} {t(`alert.type.${row.type}`)}
                </span>
            ),
        },
        { key: "subject", header: t("alert.fields.subject") },
        { key: "date", header: t("alert.fields.date") },
        {
            key: "severity",
            header: t("alert.fields.severity"),
            render: (row) => (
                <Badge variant={SEVERITY_BADGE_VARIANT[row.severity]}>
                    {t(`alert.severity.${row.severity}`)}
                </Badge>
            ),
        },
    ];

    return (
        <div>
            <PageHeader
                title={t("nav.calendar")}
                description={t("alert.list.description")}
            />
            <CalendarTabs />

            <div className="mt-4">
                {loading ?
                    <LoadingState />
                : alerts.length === 0 ?
                    <EmptyState
                        icon="✅"
                        title={t("alert.list.emptyTitle")}
                        description={t("alert.list.emptyDescription")}
                    />
                :   <Table columns={columns} data={alerts} />}
            </div>
        </div>
    );
}
