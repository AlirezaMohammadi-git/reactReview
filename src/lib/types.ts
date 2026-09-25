export type Habit = { id: string; name: string; completed: Date[] };
export type HabitContextType = {
  habits: Habit[];
  habitDate: HabitDate;
  setHabitDate: React.Dispatch<React.SetStateAction<HabitDate>>;
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
};
export type HabitDate = { year: number; month: number; weekNumber: number };

export interface WeekDates {
  start: Date;
  end: Date;
}
