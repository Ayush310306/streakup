import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HabitProgressChart = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/habit/progress-weekly", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setProgressData(res.data.data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
    fetchProgress();
  }, []);

  if (progressData.length === 0) return <p>Loading chart...</p>;

  // Get labels (dates) from first habit
  const labels = progressData[0].dailyCounts.map((d) => d.date.slice(5)); // MM-DD format

  // Create a dataset for each habit
  const datasets = progressData.map((habit, idx) => ({
    label: `${habit.title} (Streak: ${habit.streak})`,
    data: habit.dailyCounts.map((d) => d.count),
    backgroundColor: `rgba(${80 + idx * 40}, 150, 220, 0.7)`,
  }));

  const data = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Your Weekly Habit Progress" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: { display: true, text: "Days Completed" },
      },
      x: { title: { display: true, text: "Last 7 Days" } },
    },
  };

  return (
    <div style={{ width: "90%", maxWidth: "800px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HabitProgressChart;
