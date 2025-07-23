import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitCard from "./components/HabitCard";
import "./App.css";

function App() {
  // Load habits from localStorage on first render
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("habits");
    return stored ? JSON.parse(stored) : [];
  });

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add a new habit
  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      history: Array(7).fill(false), // 7-day tracking
    };
    setHabits([...habits, newHabit]);
  };

  // Toggle a habit done/undone for a day
  const toggleHabit = (habitId, dayIndex) => {
    const updated = habits.map((habit) =>
      habit.id === habitId
        ? {
            ...habit,
            history: habit.history.map((done, i) =>
              i === dayIndex ? !done : done
            ),
          }
        : habit
    );
    setHabits(updated);
  };

  // Delete a habit
  const deleteHabit = (id) => {
    const filtered = habits.filter((habit) => habit.id !== id);
    setHabits(filtered);
  };

  return (
    <div className="app">
      <h1>🧠 Habit Tracker</h1>
      <HabitForm addHabit={addHabit} />
      <div className="habit-list">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            toggleHabit={toggleHabit}
            deleteHabit={deleteHabit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
