import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const FARM_OPS_TABS = [
    { key: "manure", path: "/farm-operations" },
    { key: "water", path: "/farm-operations/water" },
];

export function FarmOperationsTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        FARM_OPS_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "manure";

    return (
        <Tabs
            tabs={FARM_OPS_TABS.map((tab) => ({
                key: tab.key,
                label: t(`farmOperations.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = FARM_OPS_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
