// // import React from 'react'
// // import { Route, Routes } from 'react-router-dom'
// // import Login from './pages/login'
// // import EmailVerify from './pages/emailVerify'
// // import ResetPassword from './pages/resetPassword'
// // import Home from './pages/home'

// // // ✅ import Toastify
// // import { ToastContainer } from 'react-toastify'
// // import 'react-toastify/dist/ReactToastify.css'

// // const App = () => {
// //   return (
// //     <div>
// //       <ToastContainer />
// //       <Routes>
// //         <Route path='/' element={<Home />} />
// //         <Route path='/login' element={<Login />} />
// //         <Route path='/email-verify' element={<EmailVerify />} />
// //         <Route path='/reset-password' element={<ResetPassword />} />
// //       </Routes>
// //     </div>
// //   )
// // }

// // export default App


// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Login from './pages/login'
// import EmailVerify from './pages/emailVerify'
// import ResetPassword from './pages/resetPassword'
// import Home from './pages/home'
// import Habits from './pages/Habit' // ✅ new

// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const App = () => {
//   return (
//     <div>
//       <ToastContainer />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/email-verify' element={<EmailVerify />} />
//         <Route path='/reset-password' element={<ResetPassword />} />
//         <Route path='/habits' element={<Habits />} /> {/* ✅ new */}
//       </Routes>
//     </div>
//   )
// }

// export default App

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import EmailVerify from "./pages/emailVerify";
import Habits from "./pages/Habit";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default App;
