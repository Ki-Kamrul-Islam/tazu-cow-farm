import { useState } from "react";

import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useInventorySettings } from "../hooks/useInventorySettings.js";

import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { LoadingState } from "../../../components/common/LoadingState.jsx";

function SettingsList({
    title,
    items,
    inputPlaceholder,
    onAdd,
    onUpdate,
    onToggle,
    t,
}) {
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

    const handleAdd = () => {
        const success = onAdd(newName);

        if (success) {
            setNewName("");
        }
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditingName(item.name);
    };

    const saveEdit = () => {
        const success = onUpdate(editingId, editingName);

        if (success) {
            setEditingId(null);
            setEditingName("");
        }
    };

    return (
        <Card>
            <h2 className="text-lg font-semibold text-text-primary mb-4">
                {title}
            </h2>

            <div className="flex gap-2 mb-5">
                <Input
                    value={newName}
                    placeholder={inputPlaceholder}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <Button onClick={handleAdd}>
                    {t("inventorySettings.actions.add")}
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 border border-border rounded-xl p-3"
                    >
                        {editingId === item.id ?
                            <div className="flex-1 flex gap-2">
                                <Input
                                    value={editingName}
                                    onChange={(e) =>
                                        setEditingName(e.target.value)
                                    }
                                />

                                <Button size="sm" onClick={saveEdit}>
                                    {t("inventorySettings.actions.save")}
                                </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingId(null)}
                                >
                                    {t("inventorySettings.actions.cancel")}
                                </Button>
                            </div>
                        :   <>
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-text-primary">
                                        {item.name}
                                    </span>

                                    <Badge
                                        variant={
                                            item.status === "active" ?
                                                "success"
                                            :   "neutral"
                                        }
                                    >
                                        {item.status === "active" ?
                                            t("inventorySettings.status.active")
                                        :   t(
                                                "inventorySettings.status.inactive",
                                            )
                                        }
                                    </Badge>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => startEdit(item)}
                                    >
                                        {t("inventorySettings.actions.edit")}
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onToggle(item.id)}
                                    >
                                        {item.status === "active" ?
                                            t(
                                                "inventorySettings.actions.deactivate",
                                            )
                                        :   t(
                                                "inventorySettings.actions.activate",
                                            )
                                        }
                                    </Button>
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
        </Card>
    );
}

export function InventorySettingsPage() {
    const { t } = useLanguage();

    const {
        categories,
        units,
        loading,

        addCategory,
        updateCategory,
        toggleCategory,

        addUnit,
        updateUnit,
        toggleUnit,
    } = useInventorySettings();

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div>
            <PageHeader
                title={t("inventorySettings.title")}
                description={t("inventorySettings.description")}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <SettingsList
                    title={t("inventorySettings.categoriesTitle")}
                    items={categories}
                    inputPlaceholder={t(
                        "inventorySettings.categoryPlaceholder",
                    )}
                    onAdd={addCategory}
                    onUpdate={updateCategory}
                    onToggle={toggleCategory}
                    t={t}
                />

                <SettingsList
                    title={t("inventorySettings.unitsTitle")}
                    items={units}
                    inputPlaceholder={t("inventorySettings.unitPlaceholder")}
                    onAdd={addUnit}
                    onUpdate={updateUnit}
                    onToggle={toggleUnit}
                    t={t}
                />
            </div>
        </div>
    );
}
