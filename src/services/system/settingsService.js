import { settingsRepository } from "../../repositories/system/settingsRepository.js";

function validateSettings(data) {
    const errors = {};
    if (!data.farmName?.trim())
        errors.farmName = "settings.validation.farmNameRequired";
    return errors;
}

export const settingsService = {
    get() {
        return settingsRepository.get();
    },
    update(data) {
        const errors = validateSettings(data);
        if (Object.keys(errors).length > 0) return { errors };

        const settings = {
            farmName: data.farmName.trim(),
            currency: data.currency,
            dateFormat: data.dateFormat,
        };
        settingsRepository.save(settings);
        return { settings };
    },
};
