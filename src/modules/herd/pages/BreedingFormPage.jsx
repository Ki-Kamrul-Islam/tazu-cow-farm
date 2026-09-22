import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useBreedingForm } from "../hooks/useBreedingForm.js";
import { breedingService } from "../../../services/herd/breedingService.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Select } from "../../../components/common/Select.jsx";
import { Textarea } from "../../../components/common/Textarea.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";
import {
    BREEDING_METHODS,
    BREEDING_STATUSES,
} from "../../../constants/breeding.js";

export function BreedingFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { form, errors, loading, saving, updateField, submit } =
        useBreedingForm(id);

    if (loading) {
        return <LoadingState />;
    }

    const animalOptions = breedingService.getBreedableAnimals().map((a) => ({
        value: a.id,
        label: `${a.animalId} — ${a.name}`,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div>
            <PageHeader
                title={
                    id ?
                        t("breeding.form.editTitle")
                    :   t("breeding.form.addTitle")
                }
                description={t("breeding.form.description")}
            />

            <Card className="max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            id="animalId"
                            label={t("breeding.fields.animal")}
                            value={form.animalId}
                            onChange={(e) =>
                                updateField("animalId", e.target.value)
                            }
                            placeholder={t("breeding.form.selectAnimal")}
                            options={animalOptions}
                            error={errors.animalId && t(errors.animalId)}
                        />
                        <Select
                            id="method"
                            label={t("breeding.fields.method")}
                            value={form.method}
                            onChange={(e) =>
                                updateField("method", e.target.value)
                            }
                            options={BREEDING_METHODS.map((value) => ({
                                value,
                                label: t(`breeding.method.${value}`),
                            }))}
                            error={errors.method && t(errors.method)}
                        />
                        <Input
                            id="breedingDate"
                            type="date"
                            label={t("breeding.fields.breedingDate")}
                            value={form.breedingDate}
                            onChange={(e) =>
                                updateField("breedingDate", e.target.value)
                            }
                            error={
                                errors.breedingDate && t(errors.breedingDate)
                            }
                        />
                        <Input
                            id="sireInfo"
                            label={t("breeding.fields.sireInfo")}
                            value={form.sireInfo}
                            onChange={(e) =>
                                updateField("sireInfo", e.target.value)
                            }
                        />
                        <Select
                            id="status"
                            label={t("breeding.fields.status")}
                            value={form.status}
                            onChange={(e) =>
                                updateField("status", e.target.value)
                            }
                            options={BREEDING_STATUSES.map((value) => ({
                                value,
                                label: t(`breeding.status.${value}`),
                            }))}
                        />
                        <Input
                            id="pregnancyDiagnosisDate"
                            type="date"
                            label={t("breeding.fields.pregnancyDiagnosisDate")}
                            value={form.pregnancyDiagnosisDate}
                            onChange={(e) =>
                                updateField(
                                    "pregnancyDiagnosisDate",
                                    e.target.value,
                                )
                            }
                        />
                        <Input
                            id="expectedCalvingDate"
                            type="date"
                            label={t("breeding.fields.expectedCalvingDate")}
                            value={form.expectedCalvingDate}
                            onChange={(e) =>
                                updateField(
                                    "expectedCalvingDate",
                                    e.target.value,
                                )
                            }
                        />
                        {form.status === "calved" && (
                            <Input
                                id="actualCalvingDate"
                                type="date"
                                label={t("breeding.fields.actualCalvingDate")}
                                value={form.actualCalvingDate}
                                onChange={(e) =>
                                    updateField(
                                        "actualCalvingDate",
                                        e.target.value,
                                    )
                                }
                                error={
                                    errors.actualCalvingDate &&
                                    t(errors.actualCalvingDate)
                                }
                            />
                        )}
                    </div>

                    <Textarea
                        id="notes"
                        label={t("breeding.fields.notes")}
                        value={form.notes}
                        onChange={(e) => updateField("notes", e.target.value)}
                    />

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/herd/breeding")}
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
