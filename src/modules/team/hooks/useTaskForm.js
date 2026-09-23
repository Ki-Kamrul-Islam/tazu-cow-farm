import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taskService } from "../../../services/team/taskService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
};

export function useTaskForm(taskId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(taskId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!taskId) {
            setLoading(false);
            return;
        }
        const task = taskService.getById(taskId);
        if (task) setForm({ ...EMPTY_FORM, ...task });
        setLoading(false);
    }, [taskId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            taskId ?
                taskService.update(taskId, form)
            :   taskService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(taskId ? "task.toast.updated" : "task.toast.created"),
            "success",
        );
        navigate("/team/tasks");
    };

    return { form, errors, loading, saving, updateField, submit };
}
