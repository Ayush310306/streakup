import React, { useEffect, useState } from "react";
import axios from "axios";
import AddHabit from "./AddHabit";

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(res.data.habits);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
      <h2>My Habits</h2>
      <AddHabit fetchHabits={fetchHabits} />
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <strong>{habit.title}</strong> ({habit.category}) | Streak:{" "}
            {habit.streak}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
