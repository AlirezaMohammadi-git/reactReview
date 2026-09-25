import { useState } from "react";
import { HabitContext } from "../hooks/useHabits";
import type { Habit, HabitDate } from "../lib/types";
import { getWeek } from "date-fns";
import { faIR } from "date-fns/locale";

export default function HabitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [habits, setHabit] = useState<Habit[]>([]);
  const [habitDate, setHabitDate] = useState<HabitDate>(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return { year, month, weekNumber: getWeek(currentDate, { locale: faIR }) };
  });

  //################ Functions to add, delete, and toggle habit completion ################
  //#######################################################################################
  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      completed: [],
    };
    setHabit((prevHabits) => [...prevHabits, newHabit]);
    setHabitDate(() => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const weekNumber = getWeek(new Date(), { locale: faIR });
      const newHabitDate: HabitDate = { year, month, weekNumber };
      return newHabitDate;
    });
  };
  const deleteHabit = (id: string) => {
    setHabit((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };
  const toggleHabitCompletion = (id: string, date: Date) => {
    setHabit((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          const isCompleted = habit.completed.some(
            (completedDate) =>
              completedDate.toDateString() === date.toDateString(),
          );
          return {
            ...habit,
            completed: isCompleted
              ? habit.completed.filter(
                  (completedDate) =>
                    completedDate.toDateString() !== date.toDateString(),
                )
              : [...habit.completed, date],
          };
        }
        return habit;
      }),
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        toggleHabitCompletion,
        habitDate,
        setHabitDate,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
