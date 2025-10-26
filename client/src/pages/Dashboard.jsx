import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddHabit from 'C:\Users\ratho\Downloads\streakup-login\streakup-login\client\src\componenets\AddHabit.jsx';

const HabitList = () => {
    const [habits, setHabits] = useState([]);

    const fetchHabits = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/habits', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHabits(res.data);
        } catch (error) {
            console.error('Error fetching habits', error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <div>
            <AddHabit fetchHabits={fetchHabits} />
            <div className="habit-dashboard">
                {habits.map((habit) => (
                    <div key={habit._id} className="habit-card">
                        <h3>{habit.title}</h3>
                        <p>{habit.category}</p>
                        <p>{habit.streak} days</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitList;
