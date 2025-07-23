// src/components/HabitCard.jsx
import "./HabitCard.css";

function HabitCard({ habit, toggleHabit, deleteHabit }) {
  const completedDays = habit.history.filter((day) => day).length;
  const progress = Math.round((completedDays / habit.history.length) * 100);

  return (
    <div className="habit-card">
      <div className="habit-header">
        <h3>{habit.name}</h3>
        <button className="delete" onClick={() => deleteHabit(habit.id)}>🗑️</button>
      </div>

      <div className="tracker">
        {habit.history.map((done, index) => (
          <div
            key={index}
            className={`day ${done ? "done" : ""}`}
            onClick={() => toggleHabit(habit.id, index)}
          >
            {done ? "✓" : ["S", "M", "T", "W", "T", "F", "S"][index]}
          </div>
        ))}
      </div>

      <div className="progress-bar">
        <div className="fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">{progress}% completed</p>
    </div>
  );
}

export default HabitCard;
