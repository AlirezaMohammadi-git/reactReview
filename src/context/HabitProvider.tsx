import { useState } from "react";
import { HabitContext } from "../hooks/useHabits";
import type { Habit } from "../lib/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function HabitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [habits, setHabit] = useLocalStorage<Habit[]>("habits", []);
  const [weekOffset, setWeekOffset] = useState(0);

  //################ Functions to add, delete, and toggle habit completion ################
  //#######################################################################################
  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      completed: [],
    };
    setHabit((prevHabits) => [...prevHabits, newHabit]);
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
        weekOffset,
        setWeekOffset,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
