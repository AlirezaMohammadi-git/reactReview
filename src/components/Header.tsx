import { useHabits } from "../hooks/useHabits";
import { faIR } from "date-fns/locale";
import { getStartEndOfWeekInMonth } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { addWeeks, format, getWeek, isSameWeek, subWeeks } from "date-fns";

function Header() {
  const { habitDate, setHabitDate, habits } = useHabits();
  const { year, month, weekNumber } = habitDate;
  const weekDates = getStartEndOfWeekInMonth(year, month, weekNumber, {
    locale: faIR,
  });
  const today = new Date();
  const isCurrentWeek = isSameWeek(today, weekDates.start, { locale: faIR });

  const setWeekFromStart = (weekStart: Date) => {
    setHabitDate({
      year: weekStart.getFullYear(),
      month: weekStart.getMonth() + 1,
      weekNumber: getWeek(weekStart, { locale: faIR }),
    });
  };

  const handlePrevWeek = () => {
    setWeekFromStart(subWeeks(weekDates.start, 1));
  };

  const handleNextWeek = () => {
    if (isCurrentWeek) {
      return; // Prevent going to the next week if it's the current week
    }

    setWeekFromStart(addWeeks(weekDates.start, 1));
  };

  return (
    <header className="flex flex-col items-start gap-4 w-full">
      <ThemeToggle />

      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Habit Tracker</h1>
          <span className="text-sm text-zinc-400">
            {habits.filter((h) => h.completed.length > 0).length}/
            {habits.length} done today
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm text-zinc-400">
            {format(weekDates.start, "MMM dd")} -{" "}
            {format(weekDates.end, "MMM dd")}
          </span>

          <div className="flex mt-1">
            <Button
              variant="default"
              size="default"
              disabled={habits.length === 0}
              onClick={handlePrevWeek}
              className="rounded-r-none"
            >
              Prev
            </Button>
            <Button
              variant="default"
              size="default"
              disabled={isCurrentWeek || habits.length === 0}
              onClick={handleNextWeek}
              className="rounded-l-none"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
