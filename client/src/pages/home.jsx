
// import React, { useState, useEffect, useContext } from 'react';
// import { Calendar, Trophy, Users, TrendingUp, Bell, Target, Zap, Star, Play, ChevronRight, Check, Award, BarChart3, Flame } from 'lucide-react';
// import './app.css';
// import { useNavigate } from 'react-router-dom';
// import { createContext } from "react";
// import { appContent } from '../context/appContext'; // Adjust the path as needed
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const StreakUp = () => {
  
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [habits, setHabits] = useState([
//     { id: 1, name: 'Morning Workout', streak: 12, completed: true, category: 'Fitness', target: 30 },
//     { id: 2, name: 'Read 30 Minutes', streak: 8, completed: false
//       , category: 'Learning', target: 21 },
//     { id: 3, name: 'Meditation', streak: 15, completed: true, category: 'Wellness', target: 50 },
//     { id: 4, name: 'Drink 8 Glasses Water', streak: 5, completed: true, category: 'Health', target: 14 }
//   ]);
//   const [showNotification, setShowNotification] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowNotification(true), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const motivationalQuotes = [
//     "Success is the sum of small efforts repeated day in and day out.",
//     "Don't break the chain! Every day counts.",
//     "Consistency is the mother of mastery.",
//     "Small habits, big results."
//   ];

 

//   const toggleHabit = (id) => {
//     setHabits(habits.map(habit => 
//       habit.id === id 
//         ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
//         : habit
//     ));
//   };

//   const Navigation = () => {
//     const {  userData ,setUserData ,backendurl,setIsLoggedIn } = useContext(appContent);

//     const sendVerificationOtp = async() => {
//       try{
//         axios.defaults.withCredentials = true;
//         const {data} = await axios.post(`${backendurl}/api/auth/sent-verify-otp`);
//         if(data.success){
//           toast.success(data.message);
//           navigate('/email-verify');
//           toast.success(data.message)
//         }else{
//           toast.error(data.message);
//         }

//       }catch(error){
//         toast.error(error.message);
//       }
//     }
//     const logout = async() => {
//       try {
//         axios.defaults.withCredentials = true;
//         const {data} = await axios.get(`${backendurl}/api/auth/logout`);
//         data.success && setIsLoggedIn(false);
//         data.success && setUserData(null);
//         navigate('/');
//         // e.preventDefault();  
//       }catch(error){
//         toast.error(error.message);

//       }
//     }
//     return (
//       <nav className="navbar">
//         <div className="nav-left">
//           <div className="logo-box"><Flame size={20} color="white" /></div>
//           <span className="logo-text">Streak Up</span>
//         </div>

//         <div className="nav-links">
//           {['Home', 'Habits', 'Challenges', 'Analytics'].map((item) => (
//             <button
//               key={item}
//               onClick={() => setActiveTab(item.toLowerCase())}
//               className={`nav-btn ${activeTab === item.toLowerCase() ? 'active' : ''}`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         {/* {userData ?
//         <div className="join-btn">
          
//           {userData.username.toUpperCase()}
//           <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
//             <ul className = 'list-none m-0 p-2 bg-gray-100 text-sm'>
//               {userData.isAccountVerified  && <li className = 'py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
//               <li className = 'py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Log Out</li>
//             </ul>
//             </div>
//         </div>
//           :<button onClick={() => navigate('/login')} className="join-btn">Join Now</button>
//         } */}
//         {userData ? (
//         <div className="relative group inline-block">
//           {/* Username Button */}
//           <button className="join-btn">
//             {userData.username.toUpperCase()}
//           </button>
//           <div className="absolute hidden group-hover:block top-full right-0 z-[99999] mt-2">
//   <ul className="list-none m-0 p-1.5 space-y-2 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-xl rounded-lg shadow-2xl border border-purple-500/20 min-w-[180px]">
    
//     {!userData.isAccountVerified && (
//       <li onClick={sendVerificationOtp}>
//         <div style={{  paddingLeft: '6px' ,paddingBottom: '8px' , paddingTop : '4px' }} className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-purple-500/20 cursor-pointer transition-all duration-200">
//           <div className="flex items-center gap-3">
//             <svg
//               className="w-5 h-5 text-purple-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span className="text-gray-100 font-medium text-base">
//               Verify Email
//             </span>
//           </div>
//         </div>
//       </li>
//     )}

//     <li onClick={logout}>
//       <div style={{ paddingLeft: '6px' , paddingBottom: '8px' , paddingTop : '4px' }}className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-red-500/20 cursor-pointer transition-all duration-200">
//         <div className="flex items-center gap-3">
//           <svg
//             className="w-5 h-5 text-red-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           <span className="text-gray-100 font-medium text-base">
//             Log Out
//           </span>
//         </div>
//       </div>
//     </li>
//   </ul>
// </div>

// {/* <div className="absolute hidden group-hover:block top-full right-0 z-[99999] mt-2">
//   <ul className="list-none m-0 p-1.5 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-xl rounded-lg shadow-2xl border border-purple-500/20 min-w-[160px] ">
    
//     {userData.isAccountVerified && (
//       <li className="mb-2">
//         <div className="py-3.5 px-4 rounded-md bg-gray-700/50 hover:bg-purple-500/20 cursor-pointer transition-all duration-200">
//           <div className="flex items-center gap-3">
//             <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-gray-100 font-medium text-lg">Verify Email</span>
//           </div>
//         </div>
//       </li>
//     )}
    
//     <li>
//       <div className="py-3.5 px-4 rounded-md bg-gray-700/50 hover:bg-red-500/20 cursor-pointer transition-all duration-200">
//         <div className="flex items-center gap-3">
//           <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//           </svg>
//           <span className="text-gray-100 font-medium text-lg">Log Out</span>
//         </div>
//       </div>
//     </li>
//   </ul>
// </div> */}

//         </div>
//       ) : (
//         <button onClick={() => navigate("/login")} className="join-btn">
//           Join Now
//         </button>
//       )}

//       </nav>
//     );
//   };

//   const Hero = () => (
//     <section className="hero">
//       <h1 className="hero-title">
//         <span className="highlight">Build Habits</span><br />
//         <span className="white-text">That Stick</span>
//       </h1>
//       <p className="hero-subtext">
//         Transform your life with daily streak tracking, smart reminders, and gamified challenges. 
//         Join thousands building better habits together.
//       </p>
//       <div className="hero-buttons">
//         <button className="primary-btn"><Play size={18} /> Start Your Journey</button>
//         {/* <button className="secondary-btn">View Features <ChevronRight size={18} /></button> */}
//       </div>
//     </section>
//   );

//   const Dashboard = () => (
//     <div className="dashboard">
//       <h2 className="section-title">Your Dashboard</h2>
//       <div className="habits-list">
//         {habits.map((habit) => (
//           <div key={habit.id} className="habit-card">
//             <button 
//               className={`check-btn ${habit.completed ? 'done' : ''}`} 
//               onClick={() => toggleHabit(habit.id)}
//             >
//               {habit.completed && <Check size={14} color="white" />}
//             </button>
//             <div className="habit-info">
//               <div className={habit.completed ? "habit-name done-text" : "habit-name"}>{habit.name}</div>
//               <div className="habit-category">{habit.category}</div>
//             </div>
//             <div className="habit-stats">
//               <div>{habit.streak} days</div>
//               <div className="progress-bar">
//                 <div style={{width: `${(habit.streak / habit.target) * 100}%`}}></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const Footer = () => (
//     <footer className="footer">
//       <p>&copy; 2025 Streak Up. All rights reserved.</p>
//     </footer>
//   );

//   return (
//     <div className="app">
//       <Navigation />
//       {activeTab === 'dashboard' && <><Hero /><Dashboard /></>}
//       {activeTab === 'habits' && <Dashboard />}
//       {activeTab === 'challenges' && <div className="placeholder">Leaderboards Coming Soon...</div>}
//       {activeTab === 'analytics' && <div className="placeholder">Analytics Coming Soon...</div>}
//       <Footer />

//     </div>
//   );
// };

// export default StreakUp;

import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Trophy, Users, TrendingUp, Bell, Target, Zap, Star, Play, ChevronRight, Check, Award, BarChart3, Flame } from 'lucide-react';
import './app.css';
import { useNavigate } from 'react-router-dom';
import { createContext } from "react";
import { appContent } from '../context/appContext'; // Adjust the path as needed
import axios from 'axios';
import { toast } from 'react-toastify';

const StreakUp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Workout', streak: 12, completed: true, category: 'Fitness', target: 30 },
    { id: 2, name: 'Read 30 Minutes', streak: 8, completed: false, category: 'Learning', target: 21 },
    { id: 3, name: 'Meditation', streak: 15, completed: true, category: 'Wellness', target: 50 },
    { id: 4, name: 'Drink 8 Glasses Water', streak: 5, completed: true, category: 'Health', target: 14 }
  ]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
        : habit
    ));
  };

  const Navigation = () => {
    const { userData, setUserData, backendurl, setIsLoggedIn } = useContext(appContent);

    const sendVerificationOtp = async() => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendurl}/api/auth/sent-verify-otp`);
        if(data.success){
          toast.success(data.message);
          navigate('/email-verify');
        } else {
          toast.error(data.message);
        }
      } catch(error) {
        toast.error(error.message);
      }
    }

    const logout = async() => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${backendurl}/api/auth/logout`);
        data.success && setIsLoggedIn(false);
        data.success && setUserData(null);
        navigate('/');
      } catch(error) {
        toast.error(error.message);
      }
    }

    return (
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-box"><Flame size={20} color="white" /></div>
          <span className="logo-text">Streak Up</span>
        </div>

        <div className="nav-links">
          {['Home', 'Habits', 'Challenges', 'Analytics'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if(item.toLowerCase() === 'habits') {
                  navigate('/habits'); // <- navigate to new page instead of inline Dashboard
                } else {
                  setActiveTab(item.toLowerCase());
                }
                if(item.toLowerCase() === 'challenges') {
                  navigate('/challenges'); // <- navigate to new page instead of inline Dashboard
                } else {
                  setActiveTab(item.toLowerCase());
                }
                if(item.toLowerCase() === 'analytics') {
                  navigate('/analytics'); // <- navigate to new page instead of inline Dashboard
                } else {
                  setActiveTab(item.toLowerCase());
                }
              }}
              className={`nav-btn ${activeTab === item.toLowerCase() ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>

        {userData ? (
          <div className="relative group inline-block">
            <button className="join-btn">{userData.username.toUpperCase()}</button>
            <div className="absolute hidden group-hover:block top-full right-0 z-[99999] mt-2">
              <ul className="list-none m-0 p-1.5 space-y-2 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-xl rounded-lg shadow-2xl border border-purple-500/20 min-w-[180px]">
                {!userData.isAccountVerified && (
                  <li onClick={sendVerificationOtp}>
                    <div className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-purple-500/20 cursor-pointer transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-100 font-medium text-base">Verify Email</span>
                      </div>
                    </div>
                  </li>
                )}
                <li onClick={logout}>
                  <div className="py-3 px-4 rounded-md bg-gray-700/50 hover:bg-red-500/20 cursor-pointer transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-gray-100 font-medium text-base">Log Out</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="join-btn">Join Now</button>
        )}
      </nav>
    );
  };

  const Hero = () => (
    <section className="hero">
      <h1 className="hero-title">
        <span className="highlight">Build Habits</span><br />
        <span className="white-text">That Stick</span>
      </h1>
      <p className="hero-subtext">
        Transform your life with daily streak tracking, smart reminders, and gamified challenges. 
        Join thousands building better habits together.
      </p>
      <div className="hero-buttons">
        
          <div>
            <button
              onClick={() => navigate("/habits")}
              className="primary-btn"
            >
              <Play size={18} /> Start Your Journey
            </button>
          </div>
      </div>
    </section>
  );

  const Dashboard = () => (
    <div className="dashboard">
      {/* <h2 className="section-title">Your Dashboard</h2>
      <div className="habits-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-card">
            <button className={`check-btn ${habit.completed ? 'done' : ''}`} onClick={() => toggleHabit(habit.id)}>
              {habit.completed && <Check size={14} color="white" />}
            </button>
            <div className="habit-info">
              <div className={habit.completed ? "habit-name done-text" : "habit-name"}>{habit.name}</div>
              <div className="habit-category">{habit.category}</div>
            </div>
            <div className="habit-stats">
              <div>{habit.streak} days</div>
              <div className="progress-bar">
                <div style={{width: `${(habit.streak / habit.target) * 100}%`}}></div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );

  const Footer = () => (
    <footer className="footer">
      <p>&copy; 2025 Streak Up. All rights reserved.</p>
    </footer>
  );

  return (
    <div className="app">
      <Navigation />
      {activeTab === 'dashboard' && <><Hero /><Dashboard /></>}
      {activeTab === 'challenges' && <div className="placeholder">Leaderboards Coming Soon...</div>}
      {activeTab === 'analytics' && <div className="placeholder">Analytics Coming Soon...</div>}
      <Footer />
    </div>
  );
};

export default StreakUp;
