import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { appContent } from '../context/appContext';
import {
  Line,
  Bar,
  Pie,
  Doughnut,
  Radar
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Analytics = () => {
  const navigate = useNavigate();
  const { userData, backendurl } = useContext(appContent);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    streakData: [],
    categoryData: [],
    completionRates: [],
    weeklyProgress: [],
    monthlyTrends: []
  });

  // Color palette for consistent theming
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899',
    teal: '#14B8A6',
    orange: '#F97316'
  };

  const colorPalette = [
    colors.primary,
    colors.secondary,
    colors.accent,
    colors.danger,
    colors.purple,
    colors.pink,
    colors.teal,
    colors.orange
  ];

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/habits`, {
        withCredentials: true
      });
      if (res.data.success) {
        const habitsData = res.data.habits;
        setHabits(habitsData);
        processAnalyticsData(habitsData);
      } else {
        console.error('API returned error:', res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching habits:', error);
      setLoading(false);
    }
  };

  const processAnalyticsData = (habitsData) => {
    // Process streak data for line chart
    const streakData = habitsData.map(habit => ({
      label: habit.title,
      data: generateStreakHistory(habit),
      borderColor: colorPalette[habitsData.indexOf(habit) % colorPalette.length],
      backgroundColor: colorPalette[habitsData.indexOf(habit) % colorPalette.length] + '20',
      tension: 0.4
    }));

    // Process category distribution
    const categoryCount = {};
    habitsData.forEach(habit => {
      categoryCount[habit.category] = (categoryCount[habit.category] || 0) + 1;
    });

    const categoryData = {
      labels: Object.keys(categoryCount),
      datasets: [{
        data: Object.values(categoryCount),
        backgroundColor: colorPalette.slice(0, Object.keys(categoryCount).length),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    // Process completion rates based on actual completion history
    const completionRates = habitsData.map(habit => {
      const totalDays = Math.ceil((Date.now() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24));
      const completedDays = habit.completionHistory ? habit.completionHistory.length : 0;
      const completionRate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
      return {
        habit: habit.title,
        rate: Math.min(completionRate, 100)
      };
    });

    // Process weekly progress (last 7 days)
    const weeklyProgress = generateWeeklyProgress(habitsData);

    setAnalyticsData({
      streakData,
      categoryData,
      completionRates,
      weeklyProgress,
      monthlyTrends: generateMonthlyTrends(habitsData)
    });
  };

  const generateStreakHistory = (habit) => {
    // Generate real streak history based on completion data
    const days = 30;
    const history = [];
    let currentStreak = 0;

    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      // Use local date formatting to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      // Check if habit was completed on this date
      const wasCompleted = habit.completionHistory && habit.completionHistory.includes(dateString);

      if (wasCompleted) {
        currentStreak++;
      } else {
        // Only reset streak if this is not the first day (to avoid resetting on days before habit creation)
        const habitCreatedDate = new Date(habit.createdAt);
        if (date >= habitCreatedDate) {
          currentStreak = 0;
        }
      }

      history.push({
        x: dateString,
        y: currentStreak
      });
    }

    return history;
  };

  const generateWeeklyProgress = (habitsData) => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      // Use local date to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      last7Days.push(`${year}-${month}-${day}`);
    }

    return {
      labels: last7Days.map(date => {
        const dateObj = new Date(date + 'T00:00:00'); // Add time to avoid timezone issues
        return dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      }),
      datasets: habitsData.map((habit, index) => ({
        label: habit.title,
        data: last7Days.map(date => {
          // Check if this habit was completed on this date
          return habit.completionHistory && habit.completionHistory.includes(date) ? 1 : 0;
        }),
        backgroundColor: colorPalette[index % colorPalette.length] + '80',
        borderColor: colorPalette[index % colorPalette.length],
        borderWidth: 1
      }))
    };
  };

  const generateMonthlyTrends = (habitsData) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    return {
      labels: months.slice(Math.max(0, currentMonth - 5), currentMonth + 1),
      datasets: habitsData.slice(0, 3).map((habit, index) => {
        const monthlyData = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1).map((month, monthIndex) => {
          const targetMonth = currentMonth - 5 + monthIndex;
          if (targetMonth < 0) return 0;

          // Count completions for this month
          if (habit.completionHistory) {
            const completionsThisMonth = habit.completionHistory.filter(date => {
              const completionDate = new Date(date);
              return completionDate.getMonth() === targetMonth && completionDate.getFullYear() === currentDate.getFullYear();
            }).length;
            return completionsThisMonth;
          }
          return 0;
        });

        return {
          label: habit.title,
          data: monthlyData,
          borderColor: colorPalette[index],
          backgroundColor: colorPalette[index] + '20',
          tension: 0.4
        };
      })
    };
  };

  // --- NAVIGATION BAR ---
  const Navigation = () => (
    <nav className="navbar" style={{marginLeft:"-20px",marginRight:"-20px",marginTop: '-20px',marginBottom:'10px'}}>
      <div className="nav-left">
        <div className="logo-box">
          <Flame size={20} color="white" />
        </div>
        <span className="logo-text">Streak Up</span>
      </div>

      <div className="nav-links">
        <button onClick={() => navigate("/")} className="nav-btn">
          Home
        </button>
        <button onClick={() => navigate("/habits")} className="nav-btn">
          Habits
        </button>
        <button onClick={() => navigate("/challenges")} className="nav-btn">
          Challenges
        </button>
        <button onClick={() => navigate("/analytics")} className="nav-btn active">
          Analytics
        </button>
      </div>

      {userData ? (
        <div className="join-btn" style={{ cursor: "default" }}>
          {userData.username.toUpperCase()}
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="join-btn">
          Join Now
        </button>
      )}
    </nav>
  );

  if (loading) {
    return (
      <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "20px", color: "white" }}>
        <Navigation />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", border: "3px solid #333", borderTop: "3px solid #4ade80", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" }}></div>
            <p style={{ color: "#aaa" }}>Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "20px", color: "white" }}>
        <Navigation />
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#aaa", marginBottom: "1rem" }}>No Habits Found</h2>
          <p style={{ color: "#666" }}>Start adding habits to see your analytics! Remember to login/signup first !!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "20px", color: "white" }}>
      <Navigation />
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff", marginBottom: "2rem", textAlign: "center" }}>Analytics Dashboard</h1>

        {/* Overview Cards */}
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "25px", textAlign: "center" }}>
          <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", flex: 1, margin: "0 10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ color: "#4ade80", marginBottom: "5px" }}>Total Habits</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{habits.length}</p>
            <span style={{ color: "#aaa" }}>Habits Created</span>
          </div>
          <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", flex: 1, margin: "0 10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ color: "#facc15", marginBottom: "5px" }}>Active Streaks</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{habits.filter(h => h.streak > 0).length}</p>
            <span style={{ color: "#aaa" }}>Current Streaks</span>
          </div>
          <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", flex: 1, margin: "0 10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ color: "#60a5fa", marginBottom: "5px" }}>Longest Streak</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{Math.max(...habits.map(h => h.streak), 0)}</p>
            <span style={{ color: "#aaa" }}>Days in a Row</span>
          </div>
          <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", flex: 1, margin: "0 10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ color: "#ec4899", marginBottom: "5px" }}>Avg Completion</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{Math.round(analyticsData.completionRates.reduce((acc, curr) => acc + curr.rate, 0) / analyticsData.completionRates.length) || 0}%</p>
            <span style={{ color: "#aaa" }}>Success Rate</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "20px", marginBottom: "20px" }}>
          {/* Streak Progress Line Chart */}
          <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>Streak Progress (30 Days)</h3>
            <div className="h-80">
              <Line
                data={{
                  labels: Array.from({ length: 31 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (30 - i));
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }),
                  datasets: analyticsData.streakData
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Habit Streaks Over Time'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Streak Days'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Category Distribution Pie Chart */}
          <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>Habits by Category</h3>
            <div style={{ height: "320px" }}>
              <Pie
                data={analyticsData.categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                    title: {
                      display: true,
                      text: 'Habit Categories Distribution'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Progress Bar Chart */}
        <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>Weekly Progress</h3>
          <div style={{ height: "320px" }}>
            <Bar
              data={analyticsData.weeklyProgress}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Daily Completion Rate (Last 7 Days)'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                      callback: function (value) {
                        return value === 1 ? 'Completed' : 'Not Completed';
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Monthly Trends and Completion Rates */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: "20px" }}>
          {/* Monthly Trends Line Chart */}
          <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>Monthly Trends</h3>
            <div style={{ height: "320px" }}>
              <Line
                data={analyticsData.monthlyTrends}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Monthly Habit Completions'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Completions'
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Completion Rates Doughnut Chart */}
          <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>Completion Rates</h3>
            <div style={{ height: "320px" }}>
              <Doughnut
                data={{
                  labels: analyticsData.completionRates.map(item => item.habit),
                  datasets: [{
                    data: analyticsData.completionRates.map(item => item.rate),
                    backgroundColor: colorPalette.slice(0, analyticsData.completionRates.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                    title: {
                      display: true,
                      text: 'Habit Completion Rates (%)'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Habit Performance Table */}
        <div style={{ backgroundColor: "#333", padding: "20px", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.5)", marginTop: "20px" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>Habit Performance Summary</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#444" }}>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "bold", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Habit
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "bold", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Category
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "bold", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Current Streak
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "bold", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Completion Rate
                  </th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "0.75rem", fontWeight: "bold", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#333" }}>
                {habits.map((habit, index) => {
                  const completionRate = analyticsData.completionRates[index]?.rate || 0;
                  const status = completionRate >= 80 ? 'Excellent' :
                    completionRate >= 60 ? 'Good' :
                      completionRate >= 40 ? 'Fair' : 'Needs Improvement';
                  const statusColor = completionRate >= 80 ? '#10B981' :
                    completionRate >= 60 ? '#3B82F6' :
                      completionRate >= 40 ? '#F59E0B' : '#EF4444';

                  return (
                    <tr key={habit._id} style={{ borderBottom: "1px solid #444" }}>
                      <td style={{ padding: "12px", whiteSpace: "nowrap", fontSize: "0.875rem", fontWeight: "bold", color: "#fff" }}>
                        {habit.title}
                      </td>
                      <td style={{ padding: "12px", whiteSpace: "nowrap", fontSize: "0.875rem", color: "#aaa" }}>
                        {habit.category}
                      </td>
                      <td style={{ padding: "12px", whiteSpace: "nowrap", fontSize: "0.875rem", color: "#aaa" }}>
                        {habit.streak} days
                      </td>
                      <td style={{ padding: "12px", whiteSpace: "nowrap", fontSize: "0.875rem", color: "#aaa" }}>
                        {Math.round(completionRate)}%
                      </td>
                      <td style={{ padding: "12px", whiteSpace: "nowrap", fontSize: "0.875rem", fontWeight: "bold", color: statusColor }}>
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;