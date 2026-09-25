import { useState } from "react";
import HabitForm from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import Header from "./components/Header";
import HabitProvider from "./context/HabitProvider";

export default function App() {
  return (
    <HabitProvider>
      <div className="max-w-2xl mx-auto py-8 flex flex-col gap-8">
        <Header />
        <HabitForm />
        <HabitList />
      </div>
    </HabitProvider>
  );
}
