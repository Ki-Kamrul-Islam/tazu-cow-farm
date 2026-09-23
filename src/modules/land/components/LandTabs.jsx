import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const LAND_TABS = [
    { key: "fields", path: "/land" },
    { key: "crops", path: "/land/crops" },
];

export function LandTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        LAND_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "fields";

    return (
        <Tabs
            tabs={LAND_TABS.map((tab) => ({
                key: tab.key,
                label: t(`land.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = LAND_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
