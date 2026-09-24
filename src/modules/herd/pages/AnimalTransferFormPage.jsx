import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useAnimalTransferForm } from "../hooks/useAnimalTransferForm.js";
import { useAnimalGroups } from "../hooks/useAnimalGroups.js";
import { animalRepository } from "../../../repositories/herd/animalRepository.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";

export function AnimalTransferFormPage() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, saving, updateField, submit } =
        useAnimalTransferForm();
    const { groups } = useAnimalGroups();
    const animals = animalRepository.getAll();

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={t("transfer.form.addTitle")}
                description={t("transfer.form.description")}
            />

            <Card className="max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Select
                        id="animalId"
                        label={t("transfer.fields.animal")}
                        value={form.animalId}
                        onChange={(e) =>
                            updateField("animalId", e.target.value)
                        }
                        placeholder={t("transfer.form.selectAnimal")}
                        options={animals.map((a) => ({
                            value: a.id,
                            label: `${a.animalId} — ${a.name}`,
                        }))}
                        error={errors.animalId && t(errors.animalId)}
                    />
                    <Select
                        id="toGroup"
                        label={t("transfer.fields.toGroup")}
                        value={form.toGroup}
                        onChange={(e) => updateField("toGroup", e.target.value)}
                        placeholder={t("transfer.form.selectGroup")}
                        options={groups.map((g) => ({
                            value: g.name,
                            label: g.name,
                        }))}
                        error={errors.toGroup && t(errors.toGroup)}
                    />
                    <Input
                        id="date"
                        type="date"
                        label={t("transfer.fields.date")}
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        error={errors.date && t(errors.date)}
                    />
                    <Textarea
                        id="reason"
                        label={t("transfer.fields.reason")}
                        value={form.reason}
                        onChange={(e) => updateField("reason", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/herd/transfers")}
                        >
                            {t("herd.actions.cancel")}
                        </Button>
                        <Button type="submit" isLoading={saving}>
                            {t("herd.actions.save")}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
