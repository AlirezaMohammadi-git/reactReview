import { createContext, useContext } from "react";
import type { HabitContextType } from "../lib/types";

export const HabitContext = createContext<HabitContextType | null>(null);

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
