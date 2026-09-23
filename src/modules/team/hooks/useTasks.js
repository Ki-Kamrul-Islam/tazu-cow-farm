import { useEffect, useState, useCallback } from "react";
import { taskService } from "../../../services/team/taskService.js";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignedTo, setAssignedTo] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    const load = useCallback(() => {
        setLoading(true);
        setTasks(taskService.list({ assignedTo, status, priority }));
        setLoading(false);
    }, [assignedTo, status, priority]);

    useEffect(() => {
        load();
    }, [load]);

    const deleteTask = (id) => {
        taskService.remove(id);
        load();
    };

    const toggleComplete = (id) => {
        taskService.toggleComplete(id);
        load();
    };

    return {
        tasks,
        loading,
        assignedTo,
        setAssignedTo,
        status,
        setStatus,
        priority,
        setPriority,
        deleteTask,
        toggleComplete,
    };
}
