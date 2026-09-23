import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const FINANCE_TABS = [
    { key: "expenses", path: "/finance" },
    { key: "income", path: "/finance/income" },
];

export function FinanceTabs() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab =
        FINANCE_TABS.find((tab) => location.pathname === tab.path)?.key ??
        "expenses";

    return (
        <Tabs
            tabs={FINANCE_TABS.map((tab) => ({
                key: tab.key,
                label: t(`finance.tabs.${tab.key}`),
            }))}
            activeTab={activeTab}
            onChange={(key) => {
                const tab = FINANCE_TABS.find((t) => t.key === key);
                navigate(tab.path);
            }}
        />
    );
}
