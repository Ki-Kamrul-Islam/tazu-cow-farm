import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const CALENDAR_TABS = [
    { key: "alerts", path: "/calendar" },
    { key: "view", path: "/calendar/view" },
];

export function CalendarTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        CALENDAR_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "alerts";

    return (
        <Tabs
            tabs={CALENDAR_TABS.map((tab) => ({
                key: tab.key,
                label: t(`calendar.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = CALENDAR_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
