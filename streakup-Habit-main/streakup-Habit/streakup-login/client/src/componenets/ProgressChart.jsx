// ProgressChart.jsx
import React, { useEffect, useState } from "react";
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

const randomColor = (i) => {
  // deterministic but simple color pick
  const palette = [
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 99, 132, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
    "rgba(99, 255, 132, 0.7)",
  ];
  return palette[i % palette.length];
};

export default function ProgressChart() {
  const [chartData, setChartData] = useState(null);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/habits/progress-weekly", {
          credentials: "include", // if your auth uses cookies; otherwise remove
          headers: {
            "Content-Type": "application/json",
            // If you use token auth, add Authorization header here
          },
        });
        const json = await res.json();
        if (!json.success) {
          console.error("Error fetching progress:", json);
          return;
        }

        const data = json.data; // array of { title, dailyCounts: [{date,count}, ...] }

        if (!data || !data.length) {
          setChartData(null);
          return;
        }

        // X-axis labels (dates)
        const xLabels = data[0].dailyCounts.map(d => d.date);
        setLabels(xLabels);

        // datasets: one per habit
        const datasets = data.map((h, idx) => ({
          label: h.title,
          data: h.dailyCounts.map(dc => dc.count),
          backgroundColor: randomColor(idx),
        }));

        setChartData({ labels: xLabels, datasets });
      } catch (err) {
        console.error("Fetch progress error:", err);
      }
    }

    fetchData();
  }, []);

  if (!chartData) {
    return <div>No progress data to show yet.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Habit completions — last 7 days" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
