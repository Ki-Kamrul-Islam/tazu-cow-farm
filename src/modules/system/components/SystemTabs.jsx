import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const SYSTEM_TABS = [
    { key: "settings", path: "/system" },
    { key: "data", path: "/system/data" },
];

export function SystemTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        SYSTEM_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "settings";

    return (
        <Tabs
            tabs={SYSTEM_TABS.map((tab) => ({
                key: tab.key,
                label: t(`system.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = SYSTEM_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
