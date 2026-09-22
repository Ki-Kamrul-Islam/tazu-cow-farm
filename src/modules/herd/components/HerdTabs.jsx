import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const HERD_TABS = [
    { key: "animals", path: "/herd" },
    { key: "breeding", path: "/herd/breeding" },
    { key: "health", path: "/herd/health" },
];

export function HerdTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        HERD_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "animals";

    return (
        <Tabs
            tabs={HERD_TABS.map((tab) => ({
                key: tab.key,
                label: t(`herd.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = HERD_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
