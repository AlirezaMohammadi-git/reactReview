import { useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { useHabits } from "../hooks/useHabits";

function HabitForm() {
  const { addHabit } = useHabits();
  const [habitName, setHabitName] = useState("");

  return (
    <form className="flex flex-col gap-4 w-full">
      <FieldGroup>
        <Field className="flex flex-row gap-2">
          <Input
            type="text"
            id="habit-name"
            name="habit-name"
            placeholder="Enter habit name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
          <Button
            variant="default"
            size="default"
            type="submit"
            disabled={habitName.trim() === ""}
            className="flex-1 px-5.5 py-2.5 text-sm font-semibold leading-5"
            onClick={(e) => {
              e.preventDefault();
              if (habitName.trim() !== "") {
                addHabit(habitName);
                setHabitName("");
              }
            }}
          >
            Add Habit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default HabitForm;
