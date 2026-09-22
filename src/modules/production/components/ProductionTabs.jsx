import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const PRODUCTION_TABS = [
    { key: "milk", path: "/production" },
    { key: "customers", path: "/production/customers" },
];

export function ProductionTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        PRODUCTION_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "milk";

    return (
        <Tabs
            tabs={PRODUCTION_TABS.map((tab) => ({
                key: tab.key,
                label: t(`production.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = PRODUCTION_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
