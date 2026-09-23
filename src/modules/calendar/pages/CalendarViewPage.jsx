import { useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext.jsx";
import { useCalendarEvents } from "../hooks/useCalendarEvents.js";
import { PageHeader } from "../../../components/layout/PageHeader.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { EmptyState } from "../../../components/common/EmptyState.jsx";
import { CalendarTabs } from "../components/CalendarTabs.jsx";
import { MonthGrid } from "../components/MonthGrid.jsx";

const TYPE_ICON = { vaccination: "💉", calving: "🐄", task: "📋" };

export function CalendarViewPage() {
    const { t } = useLanguage();
    const {
        year,
        month,
        weeks,
        eventsByDate,
        goToPreviousMonth,
        goToNextMonth,
        goToToday,
        todayDateString,
    } = useCalendarEvents();

    const [selectedDate, setSelectedDate] = useState(todayDateString);
    const selectedEvents = eventsByDate[selectedDate] ?? [];
    const monthNames = t("calendarView.months");
    const monthLabel = `${Array.isArray(monthNames) ? monthNames[month] : month + 1} ${year}`;

    return (
        <div>
            <PageHeader
                title={t("nav.calendar")}
                description={t("calendarView.description")}
            />
            <CalendarTabs />

            <div className="flex items-center justify-between mt-4 mb-3 max-w-2xl">
                <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                    ← {t("calendarView.previous")}
                </Button>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary">
                        {monthLabel}
                    </span>
                    <Button variant="ghost" size="sm" onClick={goToToday}>
                        {t("calendarView.today")}
                    </Button>
                </div>
                <Button variant="outline" size="sm" onClick={goToNextMonth}>
                    {t("calendarView.next")} →
                </Button>
            </div>

            <div className="max-w-2xl">
                <MonthGrid
                    weeks={weeks}
                    eventsByDate={eventsByDate}
                    todayDateString={todayDateString}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />
            </div>

            <div className="mt-4 max-w-2xl">
                <h3 className="font-medium text-text-primary mb-2">
                    {selectedDate}
                    {selectedDate === todayDateString &&
                        ` (${t("calendarView.todayLabel")})`}
                </h3>
                {selectedEvents.length === 0 ?
                    <EmptyState
                        icon="📅"
                        title={t("calendarView.emptyTitle")}
                        description={t("calendarView.emptyDescription")}
                    />
                :   <ul className="flex flex-col gap-2">
                        {selectedEvents.map((event) => (
                            <li
                                key={event.id}
                                className="flex items-center gap-2 p-2 bg-surface border border-border rounded-lg"
                            >
                                <span>{TYPE_ICON[event.type]}</span>
                                <span className="text-sm text-text-primary">
                                    {event.subject}
                                </span>
                                <Badge variant="info">
                                    {t(`alert.type.${event.type}`)}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
}
