// Challenge.jsx — Part 1/3
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Users, Trophy, Plus, LogIn, Copy } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { appContent } from "../context/appContext";

// charts (recharts)
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Full-featured Challenge.jsx
 * - fixes leaderboard keys/undefined username issues
 * - robust fetch with withCredentials
 * - charts handle empty data
 * - copy/paste into one file (3 parts)
 */

const Challenge = () => {
  const navigate = useNavigate();
  const { userData, backendurl, isLoggedIn } = useContext(appContent);

  // user id normalization (handle different shapes)
  const myUserId = userData?.userId || userData?.id || userData?._id || null;

  const [activeTab, setActiveTab] = useState("challenges");
  const [myGroups, setMyGroups] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // UI small state for charts
  console.log("USERDATA:", userData);
  console.log("myUserId resolved:", myUserId);
  const [chartRangeDays, setChartRangeDays] = useState(7); // last N days

  // fetch my groups
  const fetchMyGroups = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/groups/my-groups`, {
        withCredentials: true,
      });
      if (data?.success) {
        setMyGroups(data.groups || []);
      } else {
        setMyGroups([]);
      }
    } catch (err) {
      console.error("fetchMyGroups error:", err);
      setMyGroups([]);
    }
  };

  // fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/groups/leaderboard`, {
        withCredentials: true,
      });
      if (data?.success && Array.isArray(data.leaderboard)) {
        // Normalize entries to ensure username & totalPoints exist
        const normalized = data.leaderboard.map((u, i) => ({
          rank: u.rank ?? i + 1,
          username: u.username ?? `User ${u.rank ?? i + 1}`,
          totalPoints: u.totalPoints ?? u.totalPoints === 0 ? u.totalPoints : u.totalPoints || 0,
        }));
        setLeaderboard(normalized);
      } else {
        setLeaderboard([]);
      }
    } catch (err) {
      console.error("fetchLeaderboard error:", err);
      setLeaderboard([]);
      toast.error("Failed to load leaderboard");
    }
  };

  useEffect(() => {
    // initial loads
    if (isLoggedIn) fetchMyGroups();
    if (activeTab === "leaderboard") fetchLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, activeTab]);

  // helpers
  const copyGroupCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code || "");
      toast.success("Group code copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  // create group
  const handleCreateGroup = async (e) => {
    e?.preventDefault();
    if (!groupName?.trim()) return toast.error("Enter group name");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/groups/create`,
        { groupName },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data.message || "Group created");
        setGroupName("");
        setShowCreateModal(false);
        fetchMyGroups();
      } else {
        toast.error(data?.message || "Create failed");
      }
    } catch (err) {
      console.error("create group err", err);
      toast.error(err?.response?.data?.message || "Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  // join group



  const handleJoinGroup = async (e) => {
    e?.preventDefault();
    if (!joinCode?.trim() || joinCode.length !== 6)
      return toast.error("Enter valid 6-digit code");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/groups/join`,
        { groupCode: joinCode },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success(data.message || "Joined group");
        setJoinCode("");
        setShowJoinModal(false);
        fetchMyGroups();
      } else {
        toast.error(data?.message || "Join failed");
      }
    } catch (err) {
      console.error("join err", err);
      toast.error(err?.response?.data?.message || "Failed to join group");
    } finally {
      setLoading(false);
    }
  };
// Challenge.jsx — Part 2/3
  // add habit (creator)
  const addHabit = async (groupId, title) => {
    if (!title?.trim()) return;
    try {
      const { data } = await axios.post(
        `${backendurl}/api/groups/${groupId}/habits`,
        { title },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success("Habit added");
        fetchMyGroups();
      } else {
        toast.error(data?.message || "Add habit failed");
      }
    } catch (err) {
      console.error("addHabit err", err);
      toast.error(err?.response?.data?.message || "Failed to add habit");
    }
  };

  // mark habit done
  const markDone = async (groupId, habitIndex) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/groups/${groupId}/habits/${habitIndex}/complete`,
        {},
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success("Marked done");
        fetchMyGroups();
      } else {
        toast.error(data?.message || "Failed to mark done");
      }
    } catch (err) {
      console.error("markDone err", err);
      toast.error(err?.response?.data?.message || "Failed to mark done");
    }
  };

  // Small UI components
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
            <button onClick={() => navigate("/challenges")} className="nav-btn  active">
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

  // Leaderboard view + Charts
  const LeaderboardView = () => {
    // prepare data for charts aggregated across groups (take last N days)
    const dailyMap = {}; // date => { pointsSum, countGroupsWithData }
    myGroups.forEach((g) => {
      const hist = g.dailyHistory || [];
      // if no history, optionally add a zero record for today to keep chart consistent
      hist.slice(-chartRangeDays).forEach((d) => {
        const date = d.date ?? String(d._id) ?? new Date().toDateString();
        if (!dailyMap[date]) dailyMap[date] = { points: 0, groups: 0 };
        dailyMap[date].points += d.points || 0;
        dailyMap[date].groups += 1;
      });
    });

    // create sorted array dates ascending — if empty, create placeholders (last N days)
    let dailyArray = Object.keys(dailyMap)
      .sort()
      .map((date) => ({
        date,
        avgPoints: dailyMap[date].groups ? Math.round(dailyMap[date].points / dailyMap[date].groups) : 0,
        totalPoints: dailyMap[date].points,
      }));

    if (dailyArray.length === 0) {
      // create N-day placeholders (so chart doesn't break)
      const today = new Date();
      dailyArray = Array.from({ length: chartRangeDays }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (chartRangeDays - 1 - i));
        const label = d.toLocaleDateString();
        return { date: label, avgPoints: 0, totalPoints: 0 };
      });
    }

    // Bar chart: current total points per group
    const barData = myGroups.map((g) => ({
      name: g.groupName || `Group ${g._id?.slice?.(0, 6)}`,
      points: g.totalGroupPoints || 0,
      id: g._id,
    }));

    // Pie chart: top contributors of the first group (if any) for "today" snapshot
    const pieData = [];
    if (myGroups.length > 0) {
      const first = myGroups[0];
      const counts = {};
      first.habits?.forEach((h) => {
        h.completions.forEach((c) => {
          const uid = String(c.userId);
          if (!counts[uid]) counts[uid] = 0;
          if (c.isDone) counts[uid] += 1;
        });
      });
      Object.keys(counts).forEach((uid) => {
        const member = first.members?.find((m) => String(m.userId) === uid);
        pieData.push({ name: member?.username || uid.slice(0, 6), value: counts[uid], uid });
      });
    }

    const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#a78bfa"];

    return (
      <div style={{ display: "grid", gap: 18 }}>
        <h2 style={{ color: "#facc15", textAlign: "center" }}>🏆 Leaderboard & Insights</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#111827", padding: 12, borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>Avg Group Points (last {chartRangeDays} days)</div>
              <select value={chartRangeDays} onChange={(e) => setChartRangeDays(Number(e.target.value))}>
                <option value={3}>3d</option>
                <option value={7}>7d</option>
                <option value={14}>14d</option>
              </select>
            </div>

            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <LineChart data={dailyArray}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgPoints" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: "#111827", padding: 12, borderRadius: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Current Points per Group</div>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="points" name="Points">
                    {barData.map((entry, idx) => (
                      <Cell key={entry.id ?? `bar-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
// Challenge.jsx — Part 3/3
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#111827", padding: 12, borderRadius: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Top 10 Global Leaderboard</div>
            {leaderboard.length === 0 ? (
              <p style={{ color: "#9CA3AF" }}>No leaderboard data yet</p>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                {leaderboard.slice(0, 10).map((u) => {
                  // unique key using username + rank fallback
                  const key = `${u.username ?? "user"}-${u.rank ?? Math.random()}`;
                  return (
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 8,
                        background: "#0b1220",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ fontSize: 18 }}>
                          {u.rank === 1 ? "🥇" : u.rank === 2 ? "🥈" : u.rank === 3 ? "🥉" : `#${u.rank}`}
                        </div>
                        <div>{u.username ?? `User ${u.rank ?? ""}`}</div>
                      </div>
                      <div style={{ fontWeight: 700 }}>{(u.totalPoints ?? 0) + " pts"}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ background: "#111827", padding: 12, borderRadius: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Top Contributors (example group snapshot)</div>
            {pieData.length === 0 ? (
              <p style={{ color: "#9CA3AF" }}>No contributor data</p>
            ) : (
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {pieData.map((entry, idx) => (
                        <Cell key={entry.uid ?? `p-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // GroupStreaks view
  const GroupStreaksView = () => {
    if (!isLoggedIn) {
      return (
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Please log in</h2>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <button onClick={() => setShowJoinModal(true)} style={{ flex: 1,textAlign: "center",marginBottom : "10px",  padding: 12, borderRadius: 10, background: "#374151" }}>
            <LogIn /> Join Group
          </button>
          <button onClick={() => setShowCreateModal(true)} style={{flex: 1, padding: 12,marginBottom : "10px", borderRadius: 10, background: "#059669",textAlign: "center" }}>
            <Plus /> Create Group
          </button>
        </div>

        <div style={{ background: "#0b1220", padding: 16, borderRadius: 12 }}>
          <h3 style={{ marginBottom: 12 }}>My Groups</h3>

          {myGroups.length === 0 ? (
            <div style={{ color: "#9CA3AF" }}>No groups yet</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {myGroups.map((group) => {
                console.log("DEBUG GROUP:", group);
                console.log("group.createdBy:", group.createdBy);
                console.log("myUserId:", myUserId);

                const isCreator = String(group.createdBy) === String(myUserId);
                return (
                  <div key={group._id} style={{ background: "#111827", padding: 12, borderRadius: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{group.groupName}</div>
                        <div style={{ color: "#9CA3AF", fontSize: 13 }}>{group.members?.length || 0} members</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => copyGroupCode(group.groupCode)} style={{ padding: "6px 10px", borderRadius: 8 }}>
                          <Copy size={14} /> {group.groupCode}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
                      <div>
                        <div style={{ color: "#9CA3AF", fontSize: 12 }}>Streak</div>
                        <div style={{ color: "#facc15", fontWeight: 700 }}>{group.groupStreak} days</div>
                      </div>
                      <div>
                        <div style={{ color: "#9CA3AF", fontSize: 12 }}>Total Points</div>
                        <div style={{ color: "#34d399", fontWeight: 700 }}>{group.totalGroupPoints || 0} pts</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 12, borderTop: "1px solid #1f2937", paddingTop: 12 }}>
                      <div style={{ color: "#9CA3AF", marginBottom: 8 }}>Members</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {group.members?.map((m) => (
                          <div key={String(m.userId) || m.username} style={{ padding: "6px 10px", background: "#0f172a", borderRadius: 20 }}>
                            {m.username}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add habit input (creator only) */}
                    {isCreator && (
                      <div style={{ marginTop: 12 }}>
                        <input
                          placeholder="Add a habit and press Enter"
                          onKeyDown={async (e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              await addHabit(group._id, e.target.value.trim());
                              e.target.value = "";
                            }
                          }}
                          style={{ width: "100%", padding: 10, borderRadius: 8, background: "#0b1220", color: "white", border: "1px solid #1f2937" }}
                        />
                      </div>
                    )}

                    {/* Habits list */}
                    {group.habits?.length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ color: "#9CA3AF", marginBottom: 8 }}>Group Habits</div>

                        {group.habits.map((habit, idx) => {
                          const userCompletion = habit.completions?.find((c) => String(c.userId) === String(myUserId));
                          return (
                            <div key={`${group._id}-habit-${idx}`} style={{ background: "#081024", padding: 10, borderRadius: 8, marginBottom: 8 }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ fontWeight: 700 }}>{habit.title}</div>
                                <div style={{ color: "#9CA3AF", fontSize: 12 }}>{habit.completions?.length || 0} checks</div>
                              </div>

                              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                                {habit.completions?.map((c, i) => {
                                  const member = group.members?.find((m) => String(m.userId) === String(c.userId));
                                  return (
                                    <div
                                      key={`${group._id}-habit-${idx}-member-${String(c.userId) || i}`}
                                      style={{
                                        padding: "6px 8px",
                                        borderRadius: 6,
                                        border: `1px solid ${c.isDone ? "#10b981" : "#ef4444"}`,
                                        color: c.isDone ? "#10b981" : "#ef4444",
                                      }}
                                    >
                                      {member?.username || String(c.userId).slice(0, 6)} {c.isDone ? "✔" : "✘"}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Mark done button */}
                              {!userCompletion?.isDone && (
                                <div style={{ marginTop: 8 }}>
                                  <button onClick={() => markDone(group._id, idx)} style={{ padding: "8px 12px", borderRadius: 8, background: "#2563eb", color: "white" }}>
                                    Mark Done
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: "#05060a", minHeight: "100vh", color: "white", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
        <Navigation />

        {/* Tabs */}
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <button onClick={() => setActiveTab("challenges")} style={{ padding: "10px 16px", background: activeTab === "challenges" ? "#4f46e5" : "transparent", borderRadius: 8 }}>
            <Users /> Group Streaks
          </button>
          <button
            onClick={() => {
              setActiveTab("leaderboard");
              fetchLeaderboard();
            }}
            style={{ padding: "10px 16px", background: activeTab === "leaderboard" ? "#4f46e5" : "transparent", borderRadius: 8 }}
          >
            <Trophy /> Leaderboard
          </button>
        </div>

        {/* Content */}
        <div>{activeTab === "challenges" ? <GroupStreaksView /> : <LeaderboardView />}</div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,23,0.7)" }}>
          <div style={{ width: 480, background: "#0b1220", borderRadius: 12, padding: 20 }}>
            <h3>Create Group</h3>
            <form onSubmit={handleCreateGroup}>
              <input
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={{ width: "100%", padding: 10, borderRadius: 8, marginTop: 12, background: "#071029", color: "white", border: "1px solid #1f2937" }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1 }}>
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,6,23,0.7)" }}>
          <div style={{ width: 420, background: "#0b1220", borderRadius: 12, padding: 20 }}>
            <h3>Join Group</h3>
            <form onSubmit={handleJoinGroup}>
              <input
                placeholder="6-digit code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.slice(0, 6))}
                style={{ width: "100%", padding: 10, borderRadius: 8, marginTop: 12, background: "#071029", color: "white", border: "1px solid #1f2937", textAlign: "center", fontSize: 18 }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button type="button" onClick={() => setShowJoinModal(false)} style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1 }}>
                  {loading ? "Joining..." : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenge;
