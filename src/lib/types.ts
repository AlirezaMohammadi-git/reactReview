export type Habit = { id: string; name: string; completed: Date[] };
export type HabitContextType = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
  weekOffset: number;
  setWeekOffset: (offset: number) => void;
};
export type HabitDate = { year: number; month: number; weekNumber: number };
