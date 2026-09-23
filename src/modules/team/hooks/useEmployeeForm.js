import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeService } from "../../../services/team/employeeService.js";
import { useToast } from "../../../contexts/ToastContext.jsx";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const EMPTY_FORM = {
    name: "",
    phone: "",
    role: "caretaker",
    salary: "",
    joinDate: "",
    status: "active",
    notes: "",
};

export function useEmployeeForm(employeeId) {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useLanguage();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(Boolean(employeeId));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!employeeId) {
            setLoading(false);
            return;
        }
        const employee = employeeService.getById(employeeId);
        if (employee) setForm({ ...EMPTY_FORM, ...employee });
        setLoading(false);
    }, [employeeId]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const submit = () => {
        setSaving(true);
        const result =
            employeeId ?
                employeeService.update(employeeId, form)
            :   employeeService.create(form);
        setSaving(false);

        if (result.errors) {
            setErrors(result.errors);
            return;
        }

        showToast(
            t(employeeId ? "employee.toast.updated" : "employee.toast.created"),
            "success",
        );
        navigate("/team");
    };

    return { form, errors, loading, saving, updateField, submit };
}
