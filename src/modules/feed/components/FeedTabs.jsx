import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const FEED_TABS = [
    { key: "feeding", path: "/feed" },
    { key: "types", path: "/feed/types" },
];

export function FeedTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        FEED_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "feeding";

    return (
        <Tabs
            tabs={FEED_TABS.map((tab) => ({
                key: tab.key,
                label: t(`feed.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = FEED_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
