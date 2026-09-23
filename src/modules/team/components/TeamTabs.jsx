import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const TEAM_TABS = [
    { key: "employees", path: "/team" },
    { key: "tasks", path: "/team/tasks" },
];

export function TeamTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        TEAM_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "employees";

    return (
        <Tabs
            tabs={TEAM_TABS.map((tab) => ({
                key: tab.key,
                label: t(`team.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = TEAM_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
