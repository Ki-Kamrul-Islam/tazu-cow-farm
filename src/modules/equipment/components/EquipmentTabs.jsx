import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EQUIPMENT_TABS = [
    { key: "list", path: "/equipment" },
    { key: "maintenance", path: "/equipment/maintenance" },
];

export function EquipmentTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        EQUIPMENT_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "list";

    return (
        <Tabs
            tabs={EQUIPMENT_TABS.map((tab) => ({
                key: tab.key,
                label: t(`equipment.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = EQUIPMENT_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
