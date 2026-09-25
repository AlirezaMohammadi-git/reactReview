import { useHabits } from "../hooks/useHabits";
import { faIR } from "date-fns/locale";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns";

function Header() {
  const { habits, weekOffset, setWeekOffset } = useHabits();
  const today = new Date();
  const visibleWeeks = eachDayOfInterval({
    start: addWeeks(startOfWeek(today, { locale: faIR }), weekOffset),
    end: addWeeks(endOfWeek(today, { locale: faIR }), weekOffset),
    locale: faIR,
  });

  const onPreviousWeek = () => {
    if (habits.length > 0) {
      setWeekOffset(weekOffset - 1);
    }
  };

  const onNextWeek = () => {
    if (habits.length > 0) {
      setWeekOffset(weekOffset + 1);
    }
  };

  const isCurrentWeek = visibleWeeks.some((date) => isSameDay(date, today));
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
            {format(visibleWeeks[0], "MMM dd")} -{" "}
            {format(visibleWeeks.at(-1)!, "MMM dd")}
          </span>

          <div className="flex mt-1">
            <Button
              variant="default"
              size="default"
              disabled={habits.length === 0}
              onClick={onPreviousWeek}
              className="rounded-r-none"
            >
              Prev
            </Button>
            <Button
              variant="default"
              size="default"
              disabled={isCurrentWeek || habits.length === 0}
              onClick={onNextWeek}
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
