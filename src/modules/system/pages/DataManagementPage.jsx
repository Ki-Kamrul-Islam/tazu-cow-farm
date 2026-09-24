import { useRef } from "react";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useBackup } from "../hooks/useBackup.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { SystemTabs } from "../components/SystemTabs.jsx";

export function DataManagementPage() {
    const { t } = useLanguage();
    const { importing, downloadBackup, restoreFromFile } = useBackup();
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) restoreFromFile(file);
        e.target.value = "";
    };

    return (
        <div>
            <PageHeader
                title={t("nav.system")}
                description={t("backup.description")}
            />
            <SystemTabs />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-2xl">
                <Card>
                    <h3 className="font-semibold text-text-primary mb-2">
                        {t("backup.export.title")}
                    </h3>
                    <p className="text-sm text-text-muted mb-4">
                        {t("backup.export.description")}
                    </p>
                    <Button onClick={downloadBackup}>
                        {t("backup.export.button")}
                    </Button>
                </Card>

                <Card>
                    <h3 className="font-semibold text-text-primary mb-2">
                        {t("backup.import.title")}
                    </h3>
                    <p className="text-sm text-text-muted mb-4">
                        {t("backup.import.description")}
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button
                        variant="outline"
                        isLoading={importing}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {t("backup.import.button")}
                    </Button>
                </Card>
            </div>
        </div>
    );
}
