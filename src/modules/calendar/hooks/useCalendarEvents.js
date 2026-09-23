import { useState, useMemo } from "react";
import { alertService } from "../../../services/alerts/alertService.js";
import { getMonthMatrix, getTodayDateString } from "../../../utils/date.js";

export function useCalendarEvents() {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());

    const events = useMemo(() => alertService.getAllEvents(), []);

    const eventsByDate = useMemo(() => {
        const map = {};
        events.forEach((event) => {
            if (!map[event.date]) map[event.date] = [];
            map[event.date].push(event);
        });
        return map;
    }, [events]);

    const weeks = useMemo(() => getMonthMatrix(year, month), [year, month]);

    const goToPreviousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((y) => y - 1);
        } else {
            setMonth((m) => m - 1);
        }
    };

    const goToNextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((y) => y + 1);
        } else {
            setMonth((m) => m + 1);
        }
    };

    const goToToday = () => {
        setYear(now.getFullYear());
        setMonth(now.getMonth());
    };

    return {
        year,
        month,
        weeks,
        eventsByDate,
        goToPreviousMonth,
        goToNextMonth,
        goToToday,
        todayDateString: getTodayDateString(),
    };
}
