import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useAnimalForm } from "../hooks/useAnimalForm.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    ANIMAL_TYPES,
    ANIMAL_GENDERS,
    ANIMAL_STATUSES,
} from "../../../constants/animal.js";
//
import { useAnimalGroups } from "../hooks/useAnimalGroups.js";
//
//
//
//

export function AnimalFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useAnimalForm(id);
    const { groups } = useAnimalGroups();

    if (loading) {
        return <LoadingState />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={id ? t("herd.form.editTitle") : t("herd.form.addTitle")}
                description={t("herd.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            id="animalId"
                            label={t("herd.fields.animalId")}
                            value={form.animalId}
                            onChange={(e) =>
                                updateField("animalId", e.target.value)
                            }
                            error={errors.animalId && t(errors.animalId)}
                        />
                        <Input
                            id="name"
                            label={t("herd.fields.name")}
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                            error={errors.name && t(errors.name)}
                        />
                        <Select
                            id="type"
                            label={t("herd.fields.type")}
                            value={form.type}
                            onChange={(e) =>
                                updateField("type", e.target.value)
                            }
                            options={ANIMAL_TYPES.map((value) => ({
                                value,
                                label: t(`herd.animalType.${value}`),
                            }))}
                            error={errors.type && t(errors.type)}
                        />
                        <Select
                            id="gender"
                            label={t("herd.fields.gender")}
                            value={form.gender}
                            onChange={(e) =>
                                updateField("gender", e.target.value)
                            }
                            options={ANIMAL_GENDERS.map((value) => ({
                                value,
                                label: t(`herd.gender.${value}`),
                            }))}
                            error={errors.gender && t(errors.gender)}
                        />
                        <Input
                            id="breed"
                            label={t("herd.fields.breed")}
                            value={form.breed}
                            onChange={(e) =>
                                updateField("breed", e.target.value)
                            }
                        />
                        <Input
                            id="dateOfBirth"
                            type="date"
                            label={t("herd.fields.dateOfBirth")}
                            value={form.dateOfBirth}
                            onChange={(e) =>
                                updateField("dateOfBirth", e.target.value)
                            }
                            error={errors.dateOfBirth && t(errors.dateOfBirth)}
                        />
                        <Input
                            id="weight"
                            type="number"
                            step="0.1"
                            label={t("herd.fields.weight")}
                            value={form.weight}
                            onChange={(e) =>
                                updateField("weight", e.target.value)
                            }
                            error={errors.weight && t(errors.weight)}
                        />

                        <Select
                            id="group"
                            label={t("herd.fields.group")}
                            value={form.group}
                            onChange={(e) =>
                                updateField("group", e.target.value)
                            }
                            placeholder={t("herd.form.noGroup")}
                            options={groups.map((g) => ({
                                value: g.name,
                                label: g.name,
                            }))}
                        />

                        <Select
                            id="status"
                            label={t("herd.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={ANIMAL_STATUSES.map((value) => ({
                                value,
                                label: t(`herd.status.${value}`),
                            }))}
                        />
                    </div>

                    <Textarea
                        id="notes"
                        label={t("herd.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/herd")}
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
