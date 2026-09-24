import { useState } from "react";
import { backupService } from "../../../services/system/backupService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

export function useBackup() {
    const { showToast } = useToast();
    const { t } = useLanguage();
    const [importing, setImporting] = useState(false);

    const downloadBackup = () => {
        const payload = backupService.exportData();
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tazu-cow-farm-backup-${payload.exportedAt.slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const restoreFromFile = (file) => {
        setImporting(true);
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const payload = JSON.parse(reader.result);
                const result = backupService.importData(payload);
                setImporting(false);

                if (result.errors) {
                    showToast(t(result.errors.file), "error");
                    return;
                }

                showToast(t("backup.toast.restored"), "success");
                window.location.reload();
            } catch {
                setImporting(false);
                showToast(t("backup.validation.invalidFile"), "error");
            }
        };

        reader.onerror = () => {
            setImporting(false);
            showToast(t("backup.validation.readError"), "error");
        };

        reader.readAsText(file);
    };

    return { importing, downloadBackup, restoreFromFile };
}
