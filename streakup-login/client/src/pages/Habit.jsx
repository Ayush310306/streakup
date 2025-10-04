
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import AddHabit from "../componenets/AddHabit";

// // // // --- START: CompletionCalendar Component ---
// // // const CompletionCalendar = ({ completionHistory = [] }) => {
// // //   const getPastSevenDays = () => {
// // //     const dates = [];
// // //     for (let i = 6; i >= 0; i--) {
// // //       const d = new Date();
// // //       d.setDate(d.getDate() - i);
// // //       const dateString = d.toISOString().split("T")[0];
// // //       const day = d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
// // //       const isCompleted = completionHistory.includes(dateString);
// // //       dates.push({ day, isCompleted });
// // //     }
// // //     return dates;
// // //   };

// // //   const pastSevenDays = getPastSevenDays();

// // //   return (
// // //     <div style={{ display: "flex", gap: "4px", margin: "0 15px" }}>
// // //       {pastSevenDays.map((day, index) => (
// // //         <div
// // //           key={index}
// // //           title={day.isCompleted ? "Completed" : "Incomplete"}
// // //           style={{
// // //             width: "18px",
// // //             height: "18px",
// // //             borderRadius: "3px",
// // //             backgroundColor: day.isCompleted ? "#28a745" : "#6c757d",
// // //             color: "white",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "center",
// // //             fontSize: "10px",
// // //             fontWeight: "bold",
// // //             boxShadow: "0 0 2px rgba(0,0,0,0.5)",
// // //           }}
// // //         >
// // //           {day.day}
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };
// // // // --- END: CompletionCalendar Component ---

// // // const Habits = () => {
// // //   const [habits, setHabits] = useState([]);
// // //   const [userTotalPoints, setUserTotalPoints] = useState(0);
// // //   const [longestStreak, setLongestStreak] = useState(0);
// // //   const [completedToday, setCompletedToday] = useState(0);

// // //   const isCompletedToday = (habit) => {
// // //     const today = new Date().toISOString().split("T")[0];
// // //     return habit.completionHistory && habit.completionHistory.includes(today);
// // //   };

// // //   const fetchUserPoints = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:4000/api/user/points", {
// // //         withCredentials: true,
// // //       });
// // //       if (res.data.success) {
// // //         setUserTotalPoints(res.data.totalPoints);
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching user points:", err);
// // //     }
// // //   };

// // //   const updateStats = (habitList) => {
// // //     const completed = habitList.filter((h) => isCompletedToday(h)).length;
// // //     const maxStreak =
// // //       habitList.length > 0 ? Math.max(...habitList.map((h) => h.streak)) : 0;
// // //     setCompletedToday(completed);
// // //     setLongestStreak(maxStreak);
// // //   };

// // //   const fetchHabits = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:4000/api/habits", {
// // //         withCredentials: true,
// // //       });

// // //       if (res.data.success) {
// // //         const updatedHabits = res.data.habits
// // //           .map((habit) => ({
// // //             ...habit,
// // //             isCompleted: isCompletedToday(habit),
// // //           }))
// // //           .sort((a, b) => b.streak - a.streak);

// // //         setHabits(updatedHabits);
// // //         updateStats(updatedHabits);
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching habits:", err);
// // //     }
// // //   };

// // //   const handleHabitCompletion = async (id) => {
// // //     try {
// // //       const res = await axios.patch(
// // //         `http://localhost:4000/api/habits/complete/${id}`,
// // //         {},
// // //         { withCredentials: true }
// // //       );

// // //       if (res.data.success) {
// // //         setHabits((prevHabits) => {
// // //           const updated = prevHabits.map((habit) =>
// // //             habit._id === id
// // //               ? {
// // //                   ...habit,
// // //                   isCompleted: true,
// // //                   streak: res.data.habit.streak,
// // //                   completionHistory: res.data.habit.completionHistory,
// // //                 }
// // //               : habit
// // //           );
// // //           const sorted = [...updated].sort((a, b) => b.streak - a.streak);
// // //           updateStats(sorted);
// // //           return sorted;
// // //         });

// // //         const points = res.data.pointsAwarded;
// // //         alert(
// // //           `${res.data.habit.title} completed! Current Streak: ${res.data.habit.streak} days. You earned ${points} points! 🎉`
// // //         );
// // //         setUserTotalPoints((prevPoints) => prevPoints + points);
// // //       }
// // //     } catch (err) {
// // //       console.error(
// // //         "Error completing habit:",
// // //         err.response ? err.response.data.message : err.message
// // //       );
// // //       alert(err.response?.data?.message || "Failed to mark habit as complete");
// // //     }
// // //   };

// // //   const handleHabitDelete = async (id) => {
// // //     try {
// // //       await axios.delete(`http://localhost:4000/api/habits/${id}`, {
// // //         withCredentials: true,
// // //       });
// // //       const updated = habits.filter((h) => h._id !== id);
// // //       setHabits(updated);
// // //       updateStats(updated);
// // //       alert("Habit deleted successfully");
// // //     } catch (err) {
// // //       console.error("Error deleting habit:", err);
// // //       alert("Failed to delete habit");
// // //     }
// // //   };

// // //   const handleLinkAccess = (link, e) => {
// // //     e.stopPropagation();
// // //     if (link) {
// // //       window.open(link, "_blank");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchHabits();
// // //     fetchUserPoints();
// // //   }, []);

// // //   return (
// // //     <div
// // //       style={{
// // //         backgroundColor: "#1a1a1a",
// // //         minHeight: "100vh",
// // //         padding: "20px",
// // //         color: "white",
// // //       }}
// // //     >
// // //       {/* --- STATS HEADER --- */}
// // //       <div
// // //         style={{
// // //           display: "flex",
// // //           justifyContent: "space-around",
// // //           marginBottom: "25px",
// // //           textAlign: "center",
// // //         }}
// // //       >
// // //         {/* Today's Progress */}
// // //         <div
// // //           style={{
// // //             backgroundColor: "#222",
// // //             padding: "20px",
// // //             borderRadius: "10px",
// // //             flex: 1,
// // //             margin: "0 10px",
// // //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// // //           }}
// // //         >
// // //           <h3 style={{ color: "#4ade80", marginBottom: "5px" }}>
// // //             Today's Progress
// // //           </h3>
// // //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// // //             {completedToday}/{habits.length}
// // //           </p>
// // //           <span style={{ color: "#aaa" }}>Habits Completed</span>
// // //         </div>

// // //         {/* Longest Streak */}
// // //         <div
// // //           style={{
// // //             backgroundColor: "#222",
// // //             padding: "20px",
// // //             borderRadius: "10px",
// // //             flex: 1,
// // //             margin: "0 10px",
// // //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// // //           }}
// // //         >
// // //           <h3 style={{ color: "#facc15", marginBottom: "5px" }}>
// // //             Longest Streak
// // //           </h3>
// // //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// // //             {longestStreak}
// // //           </p>
// // //           <span style={{ color: "#aaa" }}>Days in a Row</span>
// // //         </div>

// // //         {/* Total Points */}
// // //         <div
// // //           style={{
// // //             backgroundColor: "#222",
// // //             padding: "20px",
// // //             borderRadius: "10px",
// // //             flex: 1,
// // //             margin: "0 10px",
// // //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// // //           }}
// // //         >
// // //           <h3 style={{ color: "#60a5fa", marginBottom: "5px" }}>Total Score</h3>
// // //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// // //             {userTotalPoints}
// // //           </p>
// // //           <span style={{ color: "#aaa" }}>Points Earned</span>
// // //         </div>
// // //       </div>

// // //       {/* --- ADD HABIT --- */}
// // //       <AddHabit fetchHabits={fetchHabits} />

// // //       {/* --- HABITS LIST --- */}
// // //       <div style={{ padding: "20px 0" }}>
// // //         <div
// // //           style={{
// // //             display: "flex",
// // //             fontWeight: "bold",
// // //             marginBottom: "10px",
// // //             color: "#aaa",
// // //             fontSize: "14px",
// // //           }}
// // //         >
// // //           <div style={{ flexGrow: 1, paddingLeft: "10px" }}>
// // //             Habit | Category (Goal)
// // //           </div>
// // //           <div style={{ width: "150px", textAlign: "center" }}>Streak</div>
// // //           <div style={{ width: "130px", textAlign: "center" }}>
// // //             Completion History (7 Days)
// // //           </div>
// // //           <div style={{ width: "100px" }}></div>
// // //           <div style={{ width: "80px" }}></div>
// // //         </div>

// // //         <ul style={{ listStyleType: "none", padding: 0 }}>
// // //           {habits.map((habit) => {
// // //             const completeButtonColor = habit.isCompleted ? "#28a745" : "#555";
// // //             const completeButtonText = habit.isCompleted
// // //               ? "Completed! ✅"
// // //               : "Mark Complete";
// // //             const hasLink = !!habit.websiteLink;

// // //             return (
// // //               <li
// // //                 key={habit._id}
// // //                 style={{
// // //                   marginBottom: "10px",
// // //                   display: "flex",
// // //                   alignItems: "stretch",
// // //                   backgroundColor: "#333",
// // //                   borderRadius: "5px",
// // //                   overflow: "hidden",
// // //                 }}
// // //               >
// // //                 {/* Habit Info */}
// // //                 <div
// // //                   style={{
// // //                     padding: "15px 10px",
// // //                     flexGrow: 1,
// // //                     backgroundColor: habit.isCompleted ? "#555" : "#444",
// // //                     opacity: habit.isCompleted ? 0.8 : 1,
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "space-between",
// // //                   }}
// // //                 >
// // //                   <div style={{ display: "flex", alignItems: "center" }}>
// // //                     <strong>{habit.title}</strong> - {habit.category}
// // //                     <span
// // //                       style={{
// // //                         color: "#ccc",
// // //                         fontSize: "0.9em",
// // //                         marginLeft: "10px",
// // //                       }}
// // //                     >
// // //                       (Goal: {habit.targetFrequency || "N/A"})
// // //                     </span>

// // //                     {hasLink && (
// // //                       <button
// // //                         onClick={(e) => handleLinkAccess(habit.websiteLink, e)}
// // //                         title={`Go to ${habit.websiteLink}`}
// // //                         style={{
// // //                           marginLeft: "15px",
// // //                           padding: "5px 8px",
// // //                           backgroundColor: "blue",
// // //                           color: "white",
// // //                           border: "none",
// // //                           borderRadius: "3px",
// // //                           cursor: "pointer",
// // //                           fontWeight: "bold",
// // //                         }}
// // //                       >
// // //                         🔗 Link
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* Streak Display */}
// // //                 <div
// // //                   style={{
// // //                     width: "150px",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     fontWeight: "bold",
// // //                     color: habit.streak > 0 ? "#ffc107" : "#aaa",
// // //                     backgroundColor: "#555",
// // //                   }}
// // //                 >
// // //                   🔥 {habit.streak || 0} Days
// // //                 </div>

// // //                 {/* Calendar */}
// // //                 <div
// // //                   style={{
// // //                     width: "180px",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     backgroundColor: "#555",
// // //                   }}
// // //                 >
// // //                   <CompletionCalendar
// // //                     completionHistory={habit.completionHistory}
// // //                   />
// // //                 </div>

// // //                 {/* Complete Button */}
// // //                 <button
// // //                   onClick={() => handleHabitCompletion(habit._id)}
// // //                   disabled={habit.isCompleted}
// // //                   style={{
// // //                     padding: "15px 10px",
// // //                     width: "100px",
// // //                     cursor: habit.isCompleted ? "default" : "pointer",
// // //                     backgroundColor: completeButtonColor,
// // //                     color: "white",
// // //                     border: "none",
// // //                     fontWeight: "bold",
// // //                   }}
// // //                 >
// // //                   {completeButtonText}
// // //                 </button>

// // //                 {/* Delete */}
// // //                 <button
// // //                   onClick={() => handleHabitDelete(habit._id)}
// // //                   style={{
// // //                     padding: "15px 10px",
// // //                     width: "70px",
// // //                     cursor: "pointer",
// // //                     backgroundColor: "#dc3545",
// // //                     color: "white",
// // //                     border: "none",
// // //                     borderRadius: "0 5px 5px 0",
// // //                     fontWeight: "bold",
// // //                   }}
// // //                 >
// // //                   Delete
// // //                 </button>
// // //               </li>
// // //             );
// // //           })}
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Habits;

// // import React, { useState, useEffect, useContext } from "react";
// // import axios from "axios";
// // import AddHabit from "../componenets/AddHabit";
// // import { Flame } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import { appContent } from "../context/appContext"; // Adjust path if needed
// // import { toast } from "react-toastify";

// // // --- START: CompletionCalendar Component ---
// // const CompletionCalendar = ({ completionHistory = [] }) => {
// //   const getPastSevenDays = () => {
// //     const dates = [];
// //     for (let i = 6; i >= 0; i--) {
// //       const d = new Date();
// //       d.setDate(d.getDate() - i);
// //       const dateString = d.toISOString().split("T")[0];
// //       const day = d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
// //       const isCompleted = completionHistory.includes(dateString);
// //       dates.push({ day, isCompleted });
// //     }
// //     return dates;
// //   };

// //   const pastSevenDays = getPastSevenDays();

// //   return (
// //     <div style={{ display: "flex", gap: "4px", margin: "0 15px" }}>
// //       {pastSevenDays.map((day, index) => (
// //         <div
// //           key={index}
// //           title={day.isCompleted ? "Completed" : "Incomplete"}
// //           style={{
// //             width: "18px",
// //             height: "18px",
// //             borderRadius: "3px",
// //             backgroundColor: day.isCompleted ? "#28a745" : "#6c757d",
// //             color: "white",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: "10px",
// //             fontWeight: "bold",
// //             boxShadow: "0 0 2px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           {day.day}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
// // // --- END: CompletionCalendar Component ---

// // const Habits = () => {
// //   const navigate = useNavigate();
// //   const { userData, setUserData, backendurl, setIsLoggedIn } = useContext(appContent);
// //   const [habits, setHabits] = useState([]);
// //   const [userTotalPoints, setUserTotalPoints] = useState(0);
// //   const [longestStreak, setLongestStreak] = useState(0);
// //   const [completedToday, setCompletedToday] = useState(0);
// //   const [activeTab, setActiveTab] = useState("habits");

// //   const isCompletedToday = (habit) => {
// //     const today = new Date().toISOString().split("T")[0];
// //     return habit.completionHistory && habit.completionHistory.includes(today);
// //   };

// //   const fetchUserPoints = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:4000/api/user/points", {
// //         withCredentials: true,
// //       });
// //       if (res.data.success) {
// //         setUserTotalPoints(res.data.totalPoints);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching user points:", err);
// //     }
// //   };

// //   const updateStats = (habitList) => {
// //     const completed = habitList.filter((h) => isCompletedToday(h)).length;
// //     const maxStreak =
// //       habitList.length > 0 ? Math.max(...habitList.map((h) => h.streak)) : 0;
// //     setCompletedToday(completed);
// //     setLongestStreak(maxStreak);
// //   };

// //   const fetchHabits = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:4000/api/habits", {
// //         withCredentials: true,
// //       });

// //       if (res.data.success) {
// //         const updatedHabits = res.data.habits
// //           .map((habit) => ({
// //             ...habit,
// //             isCompleted: isCompletedToday(habit),
// //           }))
// //           .sort((a, b) => b.streak - a.streak);

// //         setHabits(updatedHabits);
// //         updateStats(updatedHabits);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching habits:", err);
// //     }
// //   };

// //   const handleHabitCompletion = async (id) => {
// //     try {
// //       const res = await axios.patch(
// //         `http://localhost:4000/api/habits/complete/${id}`,
// //         {},
// //         { withCredentials: true }
// //       );

// //       if (res.data.success) {
// //         setHabits((prevHabits) => {
// //           const updated = prevHabits.map((habit) =>
// //             habit._id === id
// //               ? {
// //                   ...habit,
// //                   isCompleted: true,
// //                   streak: res.data.habit.streak,
// //                   completionHistory: res.data.habit.completionHistory,
// //                 }
// //               : habit
// //           );
// //           const sorted = [...updated].sort((a, b) => b.streak - a.streak);
// //           updateStats(sorted);
// //           return sorted;
// //         });

// //         const points = res.data.pointsAwarded;
// //         alert(
// //           `${res.data.habit.title} completed! Current Streak: ${res.data.habit.streak} days. You earned ${points} points! 🎉`
// //         );
// //         setUserTotalPoints((prevPoints) => prevPoints + points);
// //       }
// //     } catch (err) {
// //       console.error(
// //         "Error completing habit:",
// //         err.response ? err.response.data.message : err.message
// //       );
// //       alert(err.response?.data?.message || "Failed to mark habit as complete");
// //     }
// //   };

// //   const handleHabitDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:4000/api/habits/${id}`, {
// //         withCredentials: true,
// //       });
// //       const updated = habits.filter((h) => h._id !== id);
// //       setHabits(updated);
// //       updateStats(updated);
// //       alert("Habit deleted successfully");
// //     } catch (err) {
// //       console.error("Error deleting habit:", err);
// //       alert("Failed to delete habit");
// //     }
// //   };

// //   const handleLinkAccess = (link, e) => {
// //     e.stopPropagation();
// //     if (link) {
// //       window.open(link, "_blank");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchHabits();
// //     fetchUserPoints();
// //   }, []);

// //   // --- NAVIGATION BAR ---
// //   const Navigation = () => {
// //     const sendVerificationOtp = async () => {
// //       try {
// //         axios.defaults.withCredentials = true;
// //         const { data } = await axios.post(`${backendurl}/api/auth/sent-verify-otp`);
// //         if (data.success) {
// //           toast.success(data.message);
// //           navigate("/email-verify");
// //         } else {
// //           toast.error(data.message);
// //         }
// //       } catch (error) {
// //         toast.error(error.message);
// //       }
// //     };

// //     const logout = async () => {
// //       try {
// //         axios.defaults.withCredentials = true;
// //         const { data } = await axios.get(`${backendurl}/api/auth/logout`);
// //         data.success && setIsLoggedIn(false);
// //         data.success && setUserData(null);
// //         navigate("/");
// //       } catch (error) {
// //         toast.error(error.message);
// //       }
// //     };

// //     return (
// //       <nav className="navbar">
// //         <div className="nav-left">
// //           <div className="logo-box">
// //             <Flame size={20} color="white" />
// //           </div>
// //           <span className="logo-text">Streak Up</span>
// //         </div>

// //         <div className="nav-links">
// //           {["Home", "Habits", "Challenges", "Analytics"].map((item) => (
// //             <button
// //               key={item}
// //               onClick={() => setActiveTab(item.toLowerCase())}
// //               className={`nav-btn ${activeTab === item.toLowerCase() ? "active" : ""}`}
// //             >
// //               {item}
// //             </button>
// //           ))}
// //         </div>

// //         {userData ? (
// //           <div className="relative group inline-block">
// //             <button className="join-btn">{userData.username.toUpperCase()}</button>
// //             <div className="absolute hidden group-hover:block top-full right-0 z-[99999] mt-2">
// //               <ul className="list-none m-0 p-1.5 space-y-2 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-xl rounded-lg shadow-2xl border border-purple-500/20 min-w-[180px]">
// //                 {!userData.isAccountVerified && (
// //                   <li onClick={sendVerificationOtp}>
// //                     <div className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-purple-500/20 cursor-pointer transition-all duration-200">
// //                       Verify Email
// //                     </div>
// //                   </li>
// //                 )}
// //                 <li onClick={logout}>
// //                   <div className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-red-500/20 cursor-pointer transition-all duration-200">
// //                     Log Out
// //                   </div>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         ) : (
// //           <button onClick={() => navigate("/login")} className="join-btn">
// //             Join Now
// //           </button>
// //         )}
// //       </nav>
// //     );
// //   };

// //   return (
// //     <div
// //       style={{
// //         backgroundColor: "#1a1a1a",
// //         minHeight: "100vh",
// //         padding: "20px",
// //         color: "white",
// //       }}
// //     >
// //       <Navigation /> {/* Added nav bar */}
      
// //       {/* --- STATS HEADER & HABITS --- */}
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-around",
// //           marginBottom: "25px",
// //           textAlign: "center",
// //         }}
// //       >
// //         {/* Today's Progress */}
// //         <div
// //           style={{
// //             backgroundColor: "#222",
// //             padding: "20px",
// //             borderRadius: "10px",
// //             flex: 1,
// //             margin: "0 10px",
// //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           <h3 style={{ color: "#4ade80", marginBottom: "5px" }}>Today's Progress</h3>
// //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// //             {completedToday}/{habits.length}
// //           </p>
// //           <span style={{ color: "#aaa" }}>Habits Completed</span>
// //         </div>

// //         {/* Longest Streak */}
// //         <div
// //           style={{
// //             backgroundColor: "#222",
// //             padding: "20px",
// //             borderRadius: "10px",
// //             flex: 1,
// //             margin: "0 10px",
// //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           <h3 style={{ color: "#facc15", marginBottom: "5px" }}>Longest Streak</h3>
// //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{longestStreak}</p>
// //           <span style={{ color: "#aaa" }}>Days in a Row</span>
// //         </div>

// //         {/* Total Points */}
// //         <div
// //           style={{
// //             backgroundColor: "#222",
// //             padding: "20px",
// //             borderRadius: "10px",
// //             flex: 1,
// //             margin: "0 10px",
// //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           <h3 style={{ color: "#60a5fa", marginBottom: "5px" }}>Total Score</h3>
// //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{userTotalPoints}</p>
// //           <span style={{ color: "#aaa" }}>Points Earned</span>
// //         </div>
// //       </div>

// //       <AddHabit fetchHabits={fetchHabits} />

// //       {/* --- HABITS LIST --- */}
// //       <div style={{ padding: "20px 0" }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             fontWeight: "bold",
// //             marginBottom: "10px",
// //             color: "#aaa",
// //             fontSize: "14px",
// //           }}
// //         >
// //           <div style={{ flexGrow: 1, paddingLeft: "10px" }}>Habit | Category (Goal)</div>
// //           <div style={{ width: "150px", textAlign: "center" }}>Streak</div>
// //           <div style={{ width: "130px", textAlign: "center" }}>Completion History (7 Days)</div>
// //           <div style={{ width: "100px" }}></div>
// //           <div style={{ width: "80px" }}></div>
// //         </div>

// //         <ul style={{ listStyleType: "none", padding: 0 }}>
// //           {habits.map((habit) => {
// //             const completeButtonColor = habit.isCompleted ? "#28a745" : "#555";
// //             const completeButtonText = habit.isCompleted ? "Completed! ✅" : "Mark Complete";
// //             const hasLink = !!habit.websiteLink;

// //             return (
// //               <li
// //                 key={habit._id}
// //                 style={{
// //                   marginBottom: "10px",
// //                   display: "flex",
// //                   alignItems: "stretch",
// //                   backgroundColor: "#333",
// //                   borderRadius: "5px",
// //                   overflow: "hidden",
// //                 }}
// //               >
// //                 {/* Habit Info */}
// //                 <div
// //                   style={{
// //                     padding: "15px 10px",
// //                     flexGrow: 1,
// //                     backgroundColor: habit.isCompleted ? "#555" : "#444",
// //                     opacity: habit.isCompleted ? 0.8 : 1,
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                   }}
// //                 >
// //                   <div style={{ display: "flex", alignItems: "center" }}>
// //                     <strong>{habit.title}</strong> - {habit.category}
// //                     <span style={{ color: "#ccc", fontSize: "0.9em", marginLeft: "10px" }}>
// //                       (Goal: {habit.targetFrequency || "N/A"})
// //                     </span>

// //                     {hasLink && (
// //                       <button
// //                         onClick={(e) => handleLinkAccess(habit.websiteLink, e)}
// //                         title={`Go to ${habit.websiteLink}`}
// //                         style={{
// //                           marginLeft: "15px",
// //                           padding: "5px 8px",
// //                           backgroundColor: "blue",
// //                           color: "white",
// //                           border: "none",
// //                           borderRadius: "3px",
// //                           cursor: "pointer",
// //                           fontWeight: "bold",
// //                         }}
// //                       >
// //                         🔗 Link
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Streak Display */}
// //                 <div
// //                   style={{
// //                     width: "150px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     fontWeight: "bold",
// //                     color: habit.streak > 0 ? "#ffc107" : "#aaa",
// //                     backgroundColor: "#555",
// //                   }}
// //                 >
// //                   🔥 {habit.streak || 0} Days
// //                 </div>

// //                 {/* Calendar */}
// //                 <div
// //                   style={{
// //                     width: "180px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     backgroundColor: "#555",
// //                   }}
// //                 >
// //                   <CompletionCalendar completionHistory={habit.completionHistory} />
// //                 </div>

// //                 {/* Complete Button */}
// //                 <button
// //                   onClick={() => handleHabitCompletion(habit._id)}
// //                   disabled={habit.isCompleted}
// //                   style={{
// //                     padding: "15px 10px",
// //                     width: "100px",
// //                     cursor: habit.isCompleted ? "default" : "pointer",
// //                     backgroundColor: completeButtonColor,
// //                     color: "white",
// //                     border: "none",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   {completeButtonText}
// //                 </button>

// //                 {/* Delete */}
// //                 <button
// //                   onClick={() => handleHabitDelete(habit._id)}
// //                   style={{
// //                     padding: "15px 10px",
// //                     width: "70px",
// //                     cursor: "pointer",
// //                     backgroundColor: "#dc3545",
// //                     color: "white",
// //                     border: "none",
// //                     borderRadius: "0 5px 5px 0",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Delete
// //                 </button>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Habits;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import AddHabit from "../componenets/AddHabit";

// // // --- START: CompletionCalendar Component ---
// // const CompletionCalendar = ({ completionHistory = [] }) => {
// //   const getPastSevenDays = () => {
// //     const dates = [];
// //     for (let i = 6; i >= 0; i--) {
// //       const d = new Date();
// //       d.setDate(d.getDate() - i);
// //       const dateString = d.toISOString().split("T")[0];
// //       const day = d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
// //       const isCompleted = completionHistory.includes(dateString);
// //       dates.push({ day, isCompleted });
// //     }
// //     return dates;
// //   };

// //   const pastSevenDays = getPastSevenDays();

// //   return (
// //     <div style={{ display: "flex", gap: "4px", margin: "0 15px" }}>
// //       {pastSevenDays.map((day, index) => (
// //         <div
// //           key={index}
// //           title={day.isCompleted ? "Completed" : "Incomplete"}
// //           style={{
// //             width: "18px",
// //             height: "18px",
// //             borderRadius: "3px",
// //             backgroundColor: day.isCompleted ? "#28a745" : "#6c757d",
// //             color: "white",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: "10px",
// //             fontWeight: "bold",
// //             boxShadow: "0 0 2px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           {day.day}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
// // // --- END: CompletionCalendar Component ---

// // const Habits = () => {
// //   const [habits, setHabits] = useState([]);
// //   const [userTotalPoints, setUserTotalPoints] = useState(0);
// //   const [longestStreak, setLongestStreak] = useState(0);
// //   const [completedToday, setCompletedToday] = useState(0);

// //   const isCompletedToday = (habit) => {
// //     const today = new Date().toISOString().split("T")[0];
// //     return habit.completionHistory && habit.completionHistory.includes(today);
// //   };

// //   const fetchUserPoints = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:4000/api/user/points", {
// //         withCredentials: true,
// //       });
// //       if (res.data.success) {
// //         setUserTotalPoints(res.data.totalPoints);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching user points:", err);
// //     }
// //   };

// //   const updateStats = (habitList) => {
// //     const completed = habitList.filter((h) => isCompletedToday(h)).length;
// //     const maxStreak =
// //       habitList.length > 0 ? Math.max(...habitList.map((h) => h.streak)) : 0;
// //     setCompletedToday(completed);
// //     setLongestStreak(maxStreak);
// //   };

// //   const fetchHabits = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:4000/api/habits", {
// //         withCredentials: true,
// //       });

// //       if (res.data.success) {
// //         const updatedHabits = res.data.habits
// //           .map((habit) => ({
// //             ...habit,
// //             isCompleted: isCompletedToday(habit),
// //           }))
// //           .sort((a, b) => b.streak - a.streak);

// //         setHabits(updatedHabits);
// //         updateStats(updatedHabits);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching habits:", err);
// //     }
// //   };

// //   const handleHabitCompletion = async (id) => {
// //     try {
// //       const res = await axios.patch(
// //         `http://localhost:4000/api/habits/complete/${id}`,
// //         {},
// //         { withCredentials: true }
// //       );

// //       if (res.data.success) {
// //         setHabits((prevHabits) => {
// //           const updated = prevHabits.map((habit) =>
// //             habit._id === id
// //               ? {
// //                   ...habit,
// //                   isCompleted: true,
// //                   streak: res.data.habit.streak,
// //                   completionHistory: res.data.habit.completionHistory,
// //                 }
// //               : habit
// //           );
// //           const sorted = [...updated].sort((a, b) => b.streak - a.streak);
// //           updateStats(sorted);
// //           return sorted;
// //         });

// //         const points = res.data.pointsAwarded;
// //         alert(
// //           `${res.data.habit.title} completed! Current Streak: ${res.data.habit.streak} days. You earned ${points} points! 🎉`
// //         );
// //         setUserTotalPoints((prevPoints) => prevPoints + points);
// //       }
// //     } catch (err) {
// //       console.error(
// //         "Error completing habit:",
// //         err.response ? err.response.data.message : err.message
// //       );
// //       alert(err.response?.data?.message || "Failed to mark habit as complete");
// //     }
// //   };

// //   const handleHabitDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:4000/api/habits/${id}`, {
// //         withCredentials: true,
// //       });
// //       const updated = habits.filter((h) => h._id !== id);
// //       setHabits(updated);
// //       updateStats(updated);
// //       alert("Habit deleted successfully");
// //     } catch (err) {
// //       console.error("Error deleting habit:", err);
// //       alert("Failed to delete habit");
// //     }
// //   };

// //   const handleLinkAccess = (link, e) => {
// //     e.stopPropagation();
// //     if (link) {
// //       window.open(link, "_blank");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchHabits();
// //     fetchUserPoints();
// //   }, []);

// //   return (
// //     <div
// //       style={{
// //         backgroundColor: "#1a1a1a",
// //         minHeight: "100vh",
// //         padding: "20px",
// //         color: "white",
// //       }}
// //     >
// //       {/* --- STATS HEADER --- */}
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-around",
// //           marginBottom: "25px",
// //           textAlign: "center",
// //         }}
// //       >
// //         {/* Today's Progress */}
// //         <div
// //           style={{
// //             backgroundColor: "#222",
// //             padding: "20px",
// //             borderRadius: "10px",
// //             flex: 1,
// //             margin: "0 10px",
// //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           <h3 style={{ color: "#4ade80", marginBottom: "5px" }}>
// //             Today's Progress
// //           </h3>
// //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// //             {completedToday}/{habits.length}
// //           </p>
// //           <span style={{ color: "#aaa" }}>Habits Completed</span>
// //         </div>

// //         {/* Longest Streak */}
// //         <div
// //           style={{
// //             backgroundColor: "#222",
// //             padding: "20px",
// //             borderRadius: "10px",
// //             flex: 1,
// //             margin: "0 10px",
// //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           <h3 style={{ color: "#facc15", marginBottom: "5px" }}>
// //             Longest Streak
// //           </h3>
// //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// //             {longestStreak}
// //           </p>
// //           <span style={{ color: "#aaa" }}>Days in a Row</span>
// //         </div>

// //         {/* Total Points */}
// //         <div
// //           style={{
// //             backgroundColor: "#222",
// //             padding: "20px",
// //             borderRadius: "10px",
// //             flex: 1,
// //             margin: "0 10px",
// //             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
// //           }}
// //         >
// //           <h3 style={{ color: "#60a5fa", marginBottom: "5px" }}>Total Score</h3>
// //           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
// //             {userTotalPoints}
// //           </p>
// //           <span style={{ color: "#aaa" }}>Points Earned</span>
// //         </div>
// //       </div>

// //       {/* --- ADD HABIT --- */}
// //       <AddHabit fetchHabits={fetchHabits} />

// //       {/* --- HABITS LIST --- */}
// //       <div style={{ padding: "20px 0" }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             fontWeight: "bold",
// //             marginBottom: "10px",
// //             color: "#aaa",
// //             fontSize: "14px",
// //           }}
// //         >
// //           <div style={{ flexGrow: 1, paddingLeft: "10px" }}>
// //             Habit | Category (Goal)
// //           </div>
// //           <div style={{ width: "150px", textAlign: "center" }}>Streak</div>
// //           <div style={{ width: "130px", textAlign: "center" }}>
// //             Completion History (7 Days)
// //           </div>
// //           <div style={{ width: "100px" }}></div>
// //           <div style={{ width: "80px" }}></div>
// //         </div>

// //         <ul style={{ listStyleType: "none", padding: 0 }}>
// //           {habits.map((habit) => {
// //             const completeButtonColor = habit.isCompleted ? "#28a745" : "#555";
// //             const completeButtonText = habit.isCompleted
// //               ? "Completed! ✅"
// //               : "Mark Complete";
// //             const hasLink = !!habit.websiteLink;

// //             return (
// //               <li
// //                 key={habit._id}
// //                 style={{
// //                   marginBottom: "10px",
// //                   display: "flex",
// //                   alignItems: "stretch",
// //                   backgroundColor: "#333",
// //                   borderRadius: "5px",
// //                   overflow: "hidden",
// //                 }}
// //               >
// //                 {/* Habit Info */}
// //                 <div
// //                   style={{
// //                     padding: "15px 10px",
// //                     flexGrow: 1,
// //                     backgroundColor: habit.isCompleted ? "#555" : "#444",
// //                     opacity: habit.isCompleted ? 0.8 : 1,
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "space-between",
// //                   }}
// //                 >
// //                   <div style={{ display: "flex", alignItems: "center" }}>
// //                     <strong>{habit.title}</strong> - {habit.category}
// //                     <span
// //                       style={{
// //                         color: "#ccc",
// //                         fontSize: "0.9em",
// //                         marginLeft: "10px",
// //                       }}
// //                     >
// //                       (Goal: {habit.targetFrequency || "N/A"})
// //                     </span>

// //                     {hasLink && (
// //                       <button
// //                         onClick={(e) => handleLinkAccess(habit.websiteLink, e)}
// //                         title={`Go to ${habit.websiteLink}`}
// //                         style={{
// //                           marginLeft: "15px",
// //                           padding: "5px 8px",
// //                           backgroundColor: "blue",
// //                           color: "white",
// //                           border: "none",
// //                           borderRadius: "3px",
// //                           cursor: "pointer",
// //                           fontWeight: "bold",
// //                         }}
// //                       >
// //                         🔗 Link
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Streak Display */}
// //                 <div
// //                   style={{
// //                     width: "150px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     fontWeight: "bold",
// //                     color: habit.streak > 0 ? "#ffc107" : "#aaa",
// //                     backgroundColor: "#555",
// //                   }}
// //                 >
// //                   🔥 {habit.streak || 0} Days
// //                 </div>

// //                 {/* Calendar */}
// //                 <div
// //                   style={{
// //                     width: "180px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     backgroundColor: "#555",
// //                   }}
// //                 >
// //                   <CompletionCalendar
// //                     completionHistory={habit.completionHistory}
// //                   />
// //                 </div>

// //                 {/* Complete Button */}
// //                 <button
// //                   onClick={() => handleHabitCompletion(habit._id)}
// //                   disabled={habit.isCompleted}
// //                   style={{
// //                     padding: "15px 10px",
// //                     width: "100px",
// //                     cursor: habit.isCompleted ? "default" : "pointer",
// //                     backgroundColor: completeButtonColor,
// //                     color: "white",
// //                     border: "none",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   {completeButtonText}
// //                 </button>

// //                 {/* Delete */}
// //                 <button
// //                   onClick={() => handleHabitDelete(habit._id)}
// //                   style={{
// //                     padding: "15px 10px",
// //                     width: "70px",
// //                     cursor: "pointer",
// //                     backgroundColor: "#dc3545",
// //                     color: "white",
// //                     border: "none",
// //                     borderRadius: "0 5px 5px 0",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Delete
// //                 </button>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Habits;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import AddHabit from "../componenets/AddHabit";
// import { Flame } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { appContent } from "../context/appContext"; // Adjust path if needed
// import { toast } from "react-toastify";

// // --- START: CompletionCalendar Component ---
// const CompletionCalendar = ({ completionHistory = [] }) => {
//   const getPastSevenDays = () => {
//     const dates = [];
//     for (let i = 6; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const dateString = d.toISOString().split("T")[0];
//       const day = d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
//       const isCompleted = completionHistory.includes(dateString);
//       dates.push({ day, isCompleted });
//     }
//     return dates;
//   };

//   const pastSevenDays = getPastSevenDays();

//   return (
//     <div style={{ display: "flex", gap: "4px", margin: "0 15px" }}>
//       {pastSevenDays.map((day, index) => (
//         <div
//           key={index}
//           title={day.isCompleted ? "Completed" : "Incomplete"}
//           style={{
//             width: "18px",
//             height: "18px",
//             borderRadius: "3px",
//             backgroundColor: day.isCompleted ? "#28a745" : "#6c757d",
//             color: "white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "10px",
//             fontWeight: "bold",
//             boxShadow: "0 0 2px rgba(0,0,0,0.5)",
//           }}
//         >
//           {day.day}
//         </div>
//       ))}
//     </div>
//   );
// };
// // --- END: CompletionCalendar Component ---

// const Habits = () => {
//   const navigate = useNavigate();
//   const { userData, setUserData, backendurl, setIsLoggedIn } = useContext(appContent);
//   const [habits, setHabits] = useState([]);
//   const [userTotalPoints, setUserTotalPoints] = useState(0);
//   const [longestStreak, setLongestStreak] = useState(0);
//   const [completedToday, setCompletedToday] = useState(0);
//   const [activeTab, setActiveTab] = useState("habits");

//   const isCompletedToday = (habit) => {
//     const today = new Date().toISOString().split("T")[0];
//     return habit.completionHistory && habit.completionHistory.includes(today);
//   };

//   const fetchUserPoints = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/user/points", {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setUserTotalPoints(res.data.totalPoints);
//       }
//     } catch (err) {
//       console.error("Error fetching user points:", err);
//     }
//   };

//   const updateStats = (habitList) => {
//     const completed = habitList.filter((h) => isCompletedToday(h)).length;
//     const maxStreak =
//       habitList.length > 0 ? Math.max(...habitList.map((h) => h.streak)) : 0;
//     setCompletedToday(completed);
//     setLongestStreak(maxStreak);
//   };

//   const fetchHabits = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/habits", {
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         const updatedHabits = res.data.habits
//           .map((habit) => ({
//             ...habit,
//             isCompleted: isCompletedToday(habit),
//           }))
//           .sort((a, b) => b.streak - a.streak);

//         setHabits(updatedHabits);
//         updateStats(updatedHabits);
//       }
//     } catch (err) {
//       console.error("Error fetching habits:", err);
//     }
//   };

//   const handleHabitCompletion = async (id) => {
//     try {
//       const res = await axios.patch(
//         `http://localhost:4000/api/habits/complete/${id}`,
//         {},
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setHabits((prevHabits) => {
//           const updated = prevHabits.map((habit) =>
//             habit._id === id
//               ? {
//                   ...habit,
//                   isCompleted: true,
//                   streak: res.data.habit.streak,
//                   completionHistory: res.data.habit.completionHistory,
//                 }
//               : habit
//           );
//           const sorted = [...updated].sort((a, b) => b.streak - a.streak);
//           updateStats(sorted);
//           return sorted;
//         });

//         const points = res.data.pointsAwarded;
//         alert(
//           `${res.data.habit.title} completed! Current Streak: ${res.data.habit.streak} days. You earned ${points} points! 🎉`
//         );
//         setUserTotalPoints((prevPoints) => prevPoints + points);
//       }
//     } catch (err) {
//       console.error(
//         "Error completing habit:",
//         err.response ? err.response.data.message : err.message
//       );
//       alert(err.response?.data?.message || "Failed to mark habit as complete");
//     }
//   };

//   const handleHabitDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/habits/${id}`, {
//         withCredentials: true,
//       });
//       const updated = habits.filter((h) => h._id !== id);
//       setHabits(updated);
//       updateStats(updated);
//       alert("Habit deleted successfully");
//     } catch (err) {
//       console.error("Error deleting habit:", err);
//       alert("Failed to delete habit");
//     }
//   };

//   const handleLinkAccess = (link, e) => {
//     e.stopPropagation();
//     if (link) {
//       window.open(link, "_blank");
//     }
//   };

//   useEffect(() => {
//     fetchHabits();
//     fetchUserPoints();
//   }, []);

//   // --- NAVIGATION BAR ---
//   const Navigation = () => {
//     const sendVerificationOtp = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const { data } = await axios.post(`${backendurl}/api/auth/sent-verify-otp`);
//         if (data.success) {
//           toast.success(data.message);
//           navigate("/email-verify");
//         } else {
//           toast.error(data.message);
//         }
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     const logout = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const { data } = await axios.get(`${backendurl}/api/auth/logout`);
//         data.success && setIsLoggedIn(false);
//         data.success && setUserData(null);
//         navigate("/");
//       } catch (error) {
//         toast.error(error.message);
//       }
//     };

//     return (
//       <nav className="navbar">
//         <div className="nav-left">
//           <div className="logo-box">
//             <Flame size={20} color="white" />
//           </div>
//           <span className="logo-text">Streak Up</span>
//         </div>

//         <div className="nav-links">
//           {["Home", "Habits", "Challenges", "Analytics"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setActiveTab(item.toLowerCase())}
//               className={`nav-btn ${activeTab === item.toLowerCase() ? "active" : ""}`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {userData ? (
//           <div className="relative group inline-block">
//             <button className="join-btn">{userData.username.toUpperCase()}</button>
//             <div className="absolute hidden group-hover:block top-full right-0 z-[99999] mt-2">
//               <ul className="list-none m-0 p-1.5 space-y-2 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-xl rounded-lg shadow-2xl border border-purple-500/20 min-w-[180px]">
//                 {!userData.isAccountVerified && (
//                   <li onClick={sendVerificationOtp}>
//                     <div className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-purple-500/20 cursor-pointer transition-all duration-200">
//                       Verify Email
//                     </div>
//                   </li>
//                 )}
//                 <li onClick={logout}>
//                   <div className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-red-500/20 cursor-pointer transition-all duration-200">
//                     Log Out
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <button onClick={() => navigate("/login")} className="join-btn">
//             Join Now
//           </button>
//         )}
//       </nav>
//     );
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#1a1a1a",
//         minHeight: "100vh",
//         padding: "20px",
//         color: "white",
//       }}
//     >
//       <Navigation /> {/* Added nav bar */}
      
//       {/* --- STATS HEADER & HABITS --- */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           marginBottom: "25px",
//           textAlign: "center",
//         }}
//       >
//         {/* Today's Progress */}
//         <div
//           style={{
//             backgroundColor: "#222",
//             padding: "20px",
//             borderRadius: "10px",
//             flex: 1,
//             margin: "0 10px",
//             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
//           }}
//         >
//           <h3 style={{ color: "#4ade80", marginBottom: "5px" }}>Today's Progress</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
//             {completedToday}/{habits.length}
//           </p>
//           <span style={{ color: "#aaa" }}>Habits Completed</span>
//         </div>

//         {/* Longest Streak */}
//         <div
//           style={{
//             backgroundColor: "#222",
//             padding: "20px",
//             borderRadius: "10px",
//             flex: 1,
//             margin: "0 10px",
//             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
//           }}
//         >
//           <h3 style={{ color: "#facc15", marginBottom: "5px" }}>Longest Streak</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{longestStreak}</p>
//           <span style={{ color: "#aaa" }}>Days in a Row</span>
//         </div>

//         {/* Total Points */}
//         <div
//           style={{
//             backgroundColor: "#222",
//             padding: "20px",
//             borderRadius: "10px",
//             flex: 1,
//             margin: "0 10px",
//             boxShadow: "0 0 8px rgba(0,0,0,0.5)",
//           }}
//         >
//           <h3 style={{ color: "#60a5fa", marginBottom: "5px" }}>Total Score</h3>
//           <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{userTotalPoints}</p>
//           <span style={{ color: "#aaa" }}>Points Earned</span>
//         </div>
//       </div>

//       <AddHabit fetchHabits={fetchHabits} />

//       {/* --- HABITS LIST --- */}
//       <div style={{ padding: "20px 0" }}>
//         <div
//           style={{
//             display: "flex",
//             fontWeight: "bold",
//             marginBottom: "10px",
//             color: "#aaa",
//             fontSize: "14px",
//           }}
//         >
//           <div style={{ flexGrow: 1, paddingLeft: "10px" }}>Habit | Category (Goal)</div>
//           <div style={{ width: "150px", textAlign: "center" }}>Streak</div>
//           <div style={{ width: "130px", textAlign: "center" }}>Completion History (7 Days)</div>
//           <div style={{ width: "100px" }}></div>
//           <div style={{ width: "80px" }}></div>
//         </div>

//         <ul style={{ listStyleType: "none", padding: 0 }}>
//           {habits.map((habit) => {
//             const completeButtonColor = habit.isCompleted ? "#28a745" : "#555";
//             const completeButtonText = habit.isCompleted ? "Completed! ✅" : "Mark Complete";
//             const hasLink = !!habit.websiteLink;

//             return (
//               <li
//                 key={habit._id}
//                 style={{
//                   marginBottom: "10px",
//                   display: "flex",
//                   alignItems: "stretch",
//                   backgroundColor: "#333",
//                   borderRadius: "5px",
//                   overflow: "hidden",
//                 }}
//               >
//                 {/* Habit Info */}
//                 <div
//                   style={{
//                     padding: "15px 10px",
//                     flexGrow: 1,
//                     backgroundColor: habit.isCompleted ? "#555" : "#444",
//                     opacity: habit.isCompleted ? 0.8 : 1,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <strong>{habit.title}</strong> - {habit.category}
//                     <span style={{ color: "#ccc", fontSize: "0.9em", marginLeft: "10px" }}>
//                       (Goal: {habit.targetFrequency || "N/A"})
//                     </span>

//                     {hasLink && (
//                       <button
//                         onClick={(e) => handleLinkAccess(habit.websiteLink, e)}
//                         title={`Go to ${habit.websiteLink}`}
//                         style={{
//                           marginLeft: "15px",
//                           padding: "5px 8px",
//                           backgroundColor: "blue",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "3px",
//                           cursor: "pointer",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         🔗 Link
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Streak Display */}
//                 <div
//                   style={{
//                     width: "150px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontWeight: "bold",
//                     color: habit.streak > 0 ? "#ffc107" : "#aaa",
//                     backgroundColor: "#555",
//                   }}
//                 >
//                   🔥 {habit.streak || 0} Days
//                 </div>

//                 {/* Calendar */}
//                 <div
//                   style={{
//                     width: "180px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#555",
//                   }}
//                 >
//                   <CompletionCalendar completionHistory={habit.completionHistory} />
//                 </div>

//                 {/* Complete Button */}
//                 <button
//                   onClick={() => handleHabitCompletion(habit._id)}
//                   disabled={habit.isCompleted}
//                   style={{
//                     padding: "15px 10px",
//                     width: "100px",
//                     cursor: habit.isCompleted ? "default" : "pointer",
//                     backgroundColor: completeButtonColor,
//                     color: "white",
//                     border: "none",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {completeButtonText}
//                 </button>

//                 {/* Delete */}
//                 <button
//                   onClick={() => handleHabitDelete(habit._id)}
//                   style={{
//                     padding: "15px 10px",
//                     width: "70px",
//                     cursor: "pointer",
//                     backgroundColor: "#dc3545",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "0 5px 5px 0",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Delete
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Habits;
import React, { useState, useEffect, useContext } from "react";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddHabit from "../componenets/AddHabit";
import { appContent } from "../context/appContext"; // Adjust path if needed

// --- START: CompletionCalendar Component ---
const CompletionCalendar = ({ completionHistory = [] }) => {
  const getPastSevenDays = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      const day = d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
      const isCompleted = completionHistory.includes(dateString);
      dates.push({ day, isCompleted });
    }
    return dates;
  };

  const pastSevenDays = getPastSevenDays();

  return (
    <div style={{ display: "flex", gap: "4px", margin: "0 15px" }}>
      {pastSevenDays.map((day, index) => (
        <div
          key={index}
          title={day.isCompleted ? "Completed" : "Incomplete"}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "3px",
            backgroundColor: day.isCompleted ? "#28a745" : "#6c757d",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
            boxShadow: "0 0 2px rgba(0,0,0,0.5)",
          }}
        >
          {day.day}
        </div>
      ))}
    </div>
  );
};
// --- END: CompletionCalendar Component ---

const Habits = () => {
  const navigate = useNavigate();
  const { userData, setUserData, backendurl, setIsLoggedIn } = useContext(appContent);

  const [habits, setHabits] = useState([]);
  const [userTotalPoints, setUserTotalPoints] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);

  const isCompletedToday = (habit) => {
    const today = new Date().toISOString().split("T")[0];
    return habit.completionHistory && habit.completionHistory.includes(today);
  };

  const fetchUserPoints = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/user/points`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUserTotalPoints(res.data.totalPoints);
      }
    } catch (err) {
      console.error("Error fetching user points:", err);
    }
  };

  const updateStats = (habitList) => {
    const completed = habitList.filter((h) => isCompletedToday(h)).length;
    const maxStreak =
      habitList.length > 0 ? Math.max(...habitList.map((h) => h.streak)) : 0;
    setCompletedToday(completed);
    setLongestStreak(maxStreak);
  };

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/habits`, { withCredentials: true });
      if (res.data.success) {
        const updatedHabits = res.data.habits
          .map((habit) => ({
            ...habit,
            isCompleted: isCompletedToday(habit),
          }))
          .sort((a, b) => b.streak - a.streak);

        setHabits(updatedHabits);
        updateStats(updatedHabits);
      }
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  const handleHabitCompletion = async (id) => {
    try {
      const res = await axios.patch(
        `${backendurl}/api/habits/complete/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setHabits((prevHabits) => {
          const updated = prevHabits.map((habit) =>
            habit._id === id
              ? {
                  ...habit,
                  isCompleted: true,
                  streak: res.data.habit.streak,
                  completionHistory: res.data.habit.completionHistory,
                }
              : habit
          );
          const sorted = [...updated].sort((a, b) => b.streak - a.streak);
          updateStats(sorted);
          return sorted;
        });

        const points = res.data.pointsAwarded;
        alert(
          `${res.data.habit.title} completed! Current Streak: ${res.data.habit.streak} days. You earned ${points} points! 🎉`
        );
        setUserTotalPoints((prevPoints) => prevPoints + points);
      }
    } catch (err) {
      console.error(
        "Error completing habit:",
        err.response ? err.response.data.message : err.message
      );
      alert(err.response?.data?.message || "Failed to mark habit as complete");
    }
  };

  const handleHabitDelete = async (id) => {
    try {
      await axios.delete(`${backendurl}/api/habits/${id}`, { withCredentials: true });
      const updated = habits.filter((h) => h._id !== id);
      setHabits(updated);
      updateStats(updated);
      alert("Habit deleted successfully");
    } catch (err) {
      console.error("Error deleting habit:", err);
      alert("Failed to delete habit");
    }
  };

  const handleLinkAccess = (link, e) => {
    e.stopPropagation();
    if (link) window.open(link, "_blank");
  };

  useEffect(() => {
    fetchHabits();
    fetchUserPoints();
  }, []);

  // --- NAVIGATION BAR ---
  const Navigation = () => (
    <nav className="navbar">
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
        <button onClick={() => navigate("/habits")} className="nav-btn active">
          Habits
        </button>
        <button onClick={() => navigate("/challenges")} className="nav-btn">
          Challenges
        </button>
        <button onClick={() => navigate("/analytics")} className="nav-btn">
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

  return (
    <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", padding: "20px", color: "white" }}>
      <Navigation />

      {/* --- STATS HEADER --- */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "25px", textAlign: "center" }}>
        {/* Today's Progress */}
        <div
          style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            margin: "0 10px",
            boxShadow: "0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          <h3 style={{ color: "#4ade80", marginBottom: "5px" }}>Today's Progress</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
            {completedToday}/{habits.length}
          </p>
          <span style={{ color: "#aaa" }}>Habits Completed</span>
        </div>

        {/* Longest Streak */}
        <div
          style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            margin: "0 10px",
            boxShadow: "0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          <h3 style={{ color: "#facc15", marginBottom: "5px" }}>Longest Streak</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{longestStreak}</p>
          <span style={{ color: "#aaa" }}>Days in a Row</span>
        </div>

        {/* Total Points */}
        <div
          style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            margin: "0 10px",
            boxShadow: "0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          <h3 style={{ color: "#60a5fa", marginBottom: "5px" }}>Total Score</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{userTotalPoints}</p>
          <span style={{ color: "#aaa" }}>Points Earned</span>
        </div>
      </div>

      {/* --- ADD HABIT --- */}
      <AddHabit fetchHabits={fetchHabits} />

      {/* --- HABITS LIST --- */}
      <div style={{ padding: "20px 0" }}>
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#aaa",
            fontSize: "14px",
          }}
        >
          <div style={{ flexGrow: 1, paddingLeft: "10px" }}>Habit | Category (Goal)</div>
          <div style={{ width: "150px", textAlign: "center" }}>Streak</div>
          <div style={{ width: "130px", textAlign: "center" }}>Completion History (7 Days)</div>
          <div style={{ width: "100px" }}></div>
          <div style={{ width: "80px" }}></div>
        </div>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {habits.map((habit) => {
            const completeButtonColor = habit.isCompleted ? "#28a745" : "#555";
            const completeButtonText = habit.isCompleted ? "Completed! ✅" : "Mark Complete";
            const hasLink = !!habit.websiteLink;

            return (
              <li
                key={habit._id}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "stretch",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                {/* Habit Info */}
                <div
                  style={{
                    padding: "15px 10px",
                    flexGrow: 1,
                    backgroundColor: habit.isCompleted ? "#555" : "#444",
                    opacity: habit.isCompleted ? 0.8 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <strong>{habit.title}</strong> - {habit.category}
                    <span style={{ color: "#ccc", fontSize: "0.9em", marginLeft: "10px" }}>
                      (Goal: {habit.targetFrequency || "N/A"})
                    </span>

                    {hasLink && (
                      <button
                        onClick={(e) => handleLinkAccess(habit.websiteLink, e)}
                        title={`Go to ${habit.websiteLink}`}
                        style={{
                          marginLeft: "15px",
                          padding: "5px 8px",
                          backgroundColor: "blue",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        🔗 Link
                      </button>
                    )}
                  </div>
                </div>

                {/* Streak Display */}
                <div
                  style={{
                    width: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: habit.streak > 0 ? "#ffc107" : "#aaa",
                    backgroundColor: "#555",
                  }}
                >
                  🔥 {habit.streak || 0} Days
                </div>

                {/* Calendar */}
                <div
                  style={{
                    width: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#555",
                  }}
                >
                  <CompletionCalendar completionHistory={habit.completionHistory} />
                </div>

                {/* Complete Button */}
                <button
                  onClick={() => handleHabitCompletion(habit._id)}
                  disabled={habit.isCompleted}
                  style={{
                    padding: "15px 10px",
                    width: "100px",
                    cursor: habit.isCompleted ? "default" : "pointer",
                    backgroundColor: completeButtonColor,
                    color: "white",
                    border: "none",
                    fontWeight: "bold",
                  }}
                >
                  {completeButtonText}
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleHabitDelete(habit._id)}
                  style={{
                    padding: "15px 10px",
                    width: "70px",
                    cursor: "pointer",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "0 5px 5px 0",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Habits;
