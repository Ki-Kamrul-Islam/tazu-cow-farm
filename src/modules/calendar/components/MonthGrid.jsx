import { useLanguage } from "../../../contexts/LanguageContext.jsx";

const TYPE_ICON = { vaccination: "💉", calving: "🐄", task: "📋" };

export function MonthGrid({
    weeks,
    eventsByDate,
    todayDateString,
    selectedDate,
    onSelectDate,
}) {
    const { t } = useLanguage();
    const weekdayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-surface border-b border-border">
                {weekdayKeys.map((key) => (
                    <div
                        key={key}
                        className="p-2 text-center text-xs font-medium text-text-muted"
                    >
                        {t(`calendarView.weekday.${key}`)}
                    </div>
                ))}
            </div>

            {weeks.map((week, i) => (
                <div key={i} className="grid grid-cols-7">
                    {week.map((dateString, j) => {
                        const dayEvents =
                            dateString ? (eventsByDate[dateString] ?? []) : [];
                        const isToday = dateString === todayDateString;
                        const isSelected = dateString === selectedDate;

                        return (
                            <button
                                key={j}
                                type="button"
                                disabled={!dateString}
                                onClick={() =>
                                    dateString && onSelectDate(dateString)
                                }
                                className={`min-h-20 p-1 border-b border-r border-border text-left align-top
                                    ${!dateString ? "bg-background/50" : "hover:bg-primary/5"}
                                    ${isSelected ? "bg-primary/10" : ""}`}
                            >
                                {dateString && (
                                    <>
                                        <span
                                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs
                                                ${isToday ? "bg-primary text-white" : "text-text-primary"}`}
                                        >
                                            {Number(dateString.slice(-2))}
                                        </span>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {dayEvents
                                                .slice(0, 3)
                                                .map((event) => (
                                                    <span
                                                        key={event.id}
                                                        title={event.subject}
                                                        className="text-xs"
                                                    >
                                                        {TYPE_ICON[event.type]}
                                                    </span>
                                                ))}
                                            {dayEvents.length > 3 && (
                                                <span className="text-xs text-text-muted">
                                                    +{dayEvents.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
