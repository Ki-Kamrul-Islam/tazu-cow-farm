import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const REPORTS_TABS = [
    { key: "financial", path: "/reports" },
    { key: "farm", path: "/reports/farm" },
];

export function ReportsTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        REPORTS_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "financial";

    return (
        <Tabs
            tabs={REPORTS_TABS.map((tab) => ({
                key: tab.key,
                label: t(`reports.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = REPORTS_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
