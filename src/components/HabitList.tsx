import { Flame } from "lucide-react";
import { faIR } from "date-fns/locale";
import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
  subDays,
} from "date-fns";
import { Button } from "./ui/button";
import type { Habit } from "../lib/types";
import { useHabits } from "../hooks/useHabits";

export function HabitList() {
  const { habits, deleteHabit, toggleHabitCompletion } = useHabits();
  if (habits.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-bold">Habits</h2>
        <p className="text-muted-foreground w-full self-center">
          No habits found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Habits</h2>
      <ul className="flex flex-col gap-2">
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            deleteHabit={deleteHabit}
            toggleHabitCompletion={toggleHabitCompletion}
          />
        ))}
      </ul>
    </div>
  );
}

function HabitItem({
  habit,
  deleteHabit,
  toggleHabitCompletion,
}: {
  habit: Habit;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
}) {
  const { weekOffset } = useHabits();
  const today = new Date();
  const visibleDates = eachDayOfInterval({
    start: addWeeks(startOfWeek(today, { locale: faIR }), weekOffset),
    end: addWeeks(endOfWeek(today, { locale: faIR }), weekOffset),
  });
  const getStreakCount = (habit: Habit) => {
    const dates = habit.completed.sort((a, b) => b.getTime() - a.getTime());

    let streakCount = 0;
    let currentDate = new Date();

    for (const date of dates) {
      if (isSameDay(date, currentDate)) {
        streakCount++;
        currentDate = subDays(currentDate, 1);
      } else {
        break;
      }
    }

    return streakCount;
  };

  const streakCount = getStreakCount(habit);
  return (
    <li className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/40 text-card-foreground shadow-md">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2 justify-center">
          <span className="text-lg font-medium">{habit.name}</span>
          <div className="flex items-center gap-1 justify-center rounded-full bg-orange-500/10 px-2 py-1">
            <Flame className="size-4 text-orange-500" />
            <span className="text-sm text-orange-500">{streakCount}</span>
          </div>
        </div>
        <div>
          <Button
            variant="destructive"
            size="default"
            onClick={() => deleteHabit(habit.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="flex gap-2 w-full mt-4">
        {visibleDates.map((date) => (
          <Button
            key={date.toISOString()}
            variant={
              habit.completed.some(
                (completedDate) =>
                  completedDate.toDateString() === date.toDateString(),
              )
                ? "default"
                : "outline"
            }
            className="h-auto flex flex-col flex-1 items-center justify-center gap-1 rounded-md py-2 px-2 text-center"
            disabled={isFuture(date)}
            onClick={() => toggleHabitCompletion(habit.id, date)}
          >
            <span className="text-md font-bold">{format(date, "EEE")}</span>
            <span className="text-sm font-light">{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </li>
  );
}
