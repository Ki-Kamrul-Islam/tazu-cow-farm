import { storage } from "../../storage/storage.js";

export const backupService = {
    exportData() {
        return {
            exportedAt: new Date().toISOString(),
            data: storage.exportAll(),
        };
    },
    importData(payload) {
        if (!payload || typeof payload.data !== "object") {
            return { errors: { file: "backup.validation.invalidFile" } };
        }
        storage.importAll(payload.data);
        return { success: true };
    },
};
