import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Users, Trophy, Plus, LogIn, Copy, Check } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { appContent } from '../context/appContext';

const Challenge = () => {
  const navigate = useNavigate();
  const { userData, backendurl, isLoggedIn } = useContext(appContent);
  
  const [activeTab, setActiveTab] = useState('challenges');
  const [myGroups, setMyGroups] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMyGroups();
    }
    if (activeTab === 'leaderboard') {
      fetchLeaderboard();
    }
  }, [isLoggedIn, activeTab]);

  const fetchMyGroups = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/groups/my-groups`, {
        withCredentials: true
      });
      if (data.success) {
        setMyGroups(data.groups);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/groups/leaderboard`);
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error('Failed to load leaderboard');
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/groups/create`,
        { groupName },
        { withCredentials: true }
      );
      
      if (data.success) {
        toast.success(data.message);
        setShowCreateModal(false);
        setGroupName('');
        fetchMyGroups();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (!joinCode.trim() || joinCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendurl}/api/groups/join`,
        { groupCode: joinCode },
        { withCredentials: true }
      );
      
      if (data.success) {
        toast.success(data.message);
        setShowJoinModal(false);
        setJoinCode('');
        fetchMyGroups();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join group');
    } finally {
      setLoading(false);
    }
  };

  const copyGroupCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Group code copied!');
  };

  const Navigation = () => (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-box"><Flame size={20} color="white" /></div>
        <span className="logo-text">Streak Up</span>
      </div>

      <div className="nav-links">
        <button onClick={() => navigate('/')} className="nav-btn">Home</button>
        <button onClick={() => navigate('/habits')} className="nav-btn">Habits</button>
        <button onClick={() => navigate('/challenges')} className="nav-btn active">Challenges</button>
        <button onClick={() => navigate('/analytics')} className="nav-btn">Analytics</button>
      </div>

      {userData ? (
        <div className="join-btn" style={{ cursor: 'default' }}>
          {userData.username.toUpperCase()}
        </div>
      ) : (
        <button onClick={() => navigate('/login')} className="join-btn">
          Join Now
        </button>
      )}
    </nav>
  );

  const ChallengesTabs = () => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #333' }}>
      <button
        onClick={() => setActiveTab('challenges')}
        style={{
          padding: '1rem 2rem',
          background: activeTab === 'challenges' ? '#4f46e5' : 'transparent',
          color: 'white',
          border: 'none',
          borderRadius: '8px 8px 0 0',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        <Users size={20} style={{ display: 'inline', marginRight: '8px' }} />
        Group Streaks
      </button>
      <button
        onClick={() => setActiveTab('leaderboard')}
        style={{
          padding: '1rem 2rem',
          background: activeTab === 'leaderboard' ? '#4f46e5' : 'transparent',
          color: 'white',
          border: 'none',
          borderRadius: '8px 8px 0 0',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        <Trophy size={20} style={{ display: 'inline', marginRight: '8px' }} />
        Leaderboard
      </button>
    </div>
  );

  const LeaderboardView = () => (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '12px' }}>
      <h2 style={{ color: '#facc15', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        🏆 Top 10 Leaderboard
      </h2>
      
      {leaderboard.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#aaa' }}>No data available yet</p>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.5rem',
                marginBottom: '1rem',
                backgroundColor: user.rank <= 3 ? '#2d2d2d' : '#222',
                borderRadius: '12px',
                border: user.rank <= 3 ? '2px solid #facc15' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: user.rank === 1 ? '#FFD700' : user.rank === 2 ? '#C0C0C0' : user.rank === 3 ? '#CD7F32' : '#aaa',
                    minWidth: '40px'
                  }}
                >
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                    {user.username}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                {user.totalPoints} pts
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const GroupStreaksView = () => {
    if (!isLoggedIn) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#1a1a1a', borderRadius: '12px' }}>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
            Please Log In
          </h2>
          <p style={{ color: '#aaa', marginBottom: '2rem' }}>
            You need to be logged in to view and join group streaks
          </p>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Login Now
          </button>
        </div>
      );
    }

    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setShowJoinModal(true)}
            style={{
              flex: 1,
              padding: '1.5rem',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <LogIn size={24} />
            Join Group
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              flex: 1,
              padding: '1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Plus size={24} />
            Create Group
          </button>
        </div>

        <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '12px' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            My Groups
          </h2>
          
          {myGroups.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa', padding: '2rem' }}>
              You haven't joined any groups yet. Create or join a group to get started!
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {myGroups.map((group) => (
                <div
                  key={group._id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#222',
                    borderRadius: '12px',
                    border: '1px solid #333'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                        {group.groupName}
                      </h3>
                      <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                        {group.members.length} member{group.members.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => copyGroupCode(group.groupCode)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#334155',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Copy size={16} />
                      {group.groupCode}
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                    <div>
                      <p style={{ color: '#aaa', fontSize: '0.8rem' }}>Group Streak</p>
                      <p style={{ color: '#facc15', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        🔥 {group.groupStreak} days
                      </p>
                    </div>
                    <div>
                      <p style={{ color: '#aaa', fontSize: '0.8rem' }}>Total Points</p>
                      <p style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {group.totalGroupPoints} pts
                      </p>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #333' }}>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Members:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {group.members.map((member, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.3rem 0.8rem',
                            backgroundColor: '#334155',
                            color: 'white',
                            borderRadius: '20px',
                            fontSize: '0.85rem'
                          }}
                        >
                          {member.username}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <Navigation />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <ChallengesTabs />
        
        {activeTab === 'challenges' && <GroupStreaksView />}
        {activeTab === 'leaderboard' && <LeaderboardView />}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: '#334155',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#475569',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Join Group</h2>
            <form onSubmit={handleJoinGroup}>
              <input
                type="text"
                placeholder="Enter 6-digit group code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.slice(0, 6))}
                maxLength={6}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: '#334155',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.5rem'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#475569',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Joining...' : 'Join'}
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