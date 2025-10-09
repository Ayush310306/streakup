// // // // // // // import React, { useState } from 'react';
// // // // // // // import axios from 'axios';

// // // // // // // const AddHabit = ({ fetchHabits }) => {
// // // // // // //     const [title, setTitle] = useState('');
// // // // // // //     const [category, setCategory] = useState('Fitness');

// // // // // // //     const handleAddHabit = async (e) => {
// // // // // // //         e.preventDefault();
// // // // // // //         try {
// // // // // // //             const token = localStorage.getItem('token'); // assuming you store JWT in localStorage
// // // // // // //             await axios.post('http://localhost:5000/api/habits/add', 
// // // // // // //                 { title, category }, 
// // // // // // //                 { headers: { Authorization: `Bearer ${token}` } }
// // // // // // //             );
// // // // // // //             setTitle('');
// // // // // // //             setCategory('Fitness');
// // // // // // //             fetchHabits(); // refresh habit list
// // // // // // //         } catch (error) {
// // // // // // //             console.error('Error adding habit', error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <form onSubmit={handleAddHabit} className="habit-form">
// // // // // // //             <input
// // // // // // //                 type="text"
// // // // // // //                 placeholder="Habit Title"
// // // // // // //                 value={title}
// // // // // // //                 onChange={(e) => setTitle(e.target.value)}
// // // // // // //                 required
// // // // // // //             />
// // // // // // //             <select value={category} onChange={(e) => setCategory(e.target.value)}>
// // // // // // //                 <option value="Fitness">Fitness</option>
// // // // // // //                 <option value="Learning">Learning</option>
// // // // // // //                 <option value="Wellness">Wellness</option>
// // // // // // //                 <option value="Health">Health</option>
// // // // // // //             </select>
// // // // // // //             <button type="submit">Add Habit</button>
// // // // // // //         </form>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default AddHabit;
// // // // // // import React, { useState } from "react";
// // // // // // import axios from "axios";

// // // // // // const AddHabit = ({ fetchHabits }) => {
// // // // // //   const [title, setTitle] = useState("");
// // // // // //   const [category, setCategory] = useState("Fitness");

// // // // // //   const handleAddHabit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     try {
// // // // // //       const token = localStorage.getItem("token"); // JWT token
// // // // // //       await axios.post(
// // // // // //         "http://localhost:5000/api/habits/add",
// // // // // //         { title, category },
// // // // // //         { headers: { Authorization: `Bearer ${token}` } }
// // // // // //       );
// // // // // //       setTitle("");
// // // // // //       setCategory("Fitness");
// // // // // //       fetchHabits(); // refresh habit list
// // // // // //     } catch (error) {
// // // // // //       console.error("Error adding habit", error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <form onSubmit={handleAddHabit} style={{ marginBottom: "20px" }}>
// // // // // //       <input
// // // // // //         type="text"
// // // // // //         placeholder="Habit Title"
// // // // // //         value={title}
// // // // // //         onChange={(e) => setTitle(e.target.value)}
// // // // // //         required
// // // // // //       />
// // // // // //       <select value={category} onChange={(e) => setCategory(e.target.value)}>
// // // // // //         <option value="Fitness">Fitness</option>
// // // // // //         <option value="Learning">Learning</option>
// // // // // //         <option value="Wellness">Wellness</option>
// // // // // //         <option value="Health">Health</option>
// // // // // //       </select>
// // // // // //       <button type="submit">Add Habit</button>
// // // // // //     </form>
// // // // // //   );
// // // // // // };

// // // // // // export default AddHabit;
// // // // // import React, { useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const AddHabit = ({ fetchHabits }) => {
// // // // //   const [title, setTitle] = useState('');
// // // // //   const [category, setCategory] = useState('Fitness');

// // // // //   const handleAddHabit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     try {
// // // // //       // Use cookies token since backend reads req.cookies.token
// // // // //       await axios.post(
// // // // //         'http://localhost:4000/api/habits/add', // Make sure port & route match backend
// // // // //         { title, category },
// // // // //         { withCredentials: true } // Important! Sends cookies automatically
// // // // //       );

// // // // //       // Reset form
// // // // //       setTitle('');
// // // // //       setCategory('Fitness');

// // // // //       // Refresh habit list
// // // // //       fetchHabits();
// // // // //     } catch (error) {
// // // // //       console.error('Error adding habit:', error.response?.data || error.message);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <form onSubmit={handleAddHabit}>
// // // // //       <input
// // // // //         type="text"
// // // // //         placeholder="Habit Title"
// // // // //         value={title}
// // // // //         onChange={(e) => setTitle(e.target.value)}
// // // // //         required
// // // // //       />
// // // // //       <select value={category} onChange={(e) => setCategory(e.target.value)}>
// // // // //         <option value="Fitness">Fitness</option>
// // // // //         <option value="Learning">Learning</option>
// // // // //         <option value="Wellness">Wellness</option>
// // // // //         <option value="Health">Health</option>
// // // // //       </select>
// // // // //       <button type="submit">Add Habit</button>
// // // // //     </form>
// // // // //   );
// // // // // };

// // // // // export default AddHabit;
// // // // import React, { useState } from "react";
// // // // import axios from "axios";

// // // // const AddHabit = ({ fetchHabits }) => {
// // // //   const [title, setTitle] = useState("");
// // // //   const [category, setCategory] = useState("Fitness");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handleAddHabit = async (e) => {
// // // //     e.preventDefault();

// // // //     if (!title) {
// // // //       alert("Please enter a habit title");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setLoading(true);

// // // //       // If you store JWT in localStorage
// // // //       const token = localStorage.getItem("token");
      
// // // //       const res = await axios.post(
// // // //         "http://localhost:4000/api/habits/add",
// // // //         { title, category },
// // // //         {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //           withCredentials: true, // required if using cookies
// // // //         }
// // // //       );

// // // //       if (res.data.success) {
// // // //         setTitle(""); // reset input
// // // //         setCategory("Fitness"); // reset category
// // // //         fetchHabits(); // refresh habit list in Habits.jsx
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Error adding habit:", err);
// // // //       alert("Failed to add habit. Check console for details.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <form onSubmit={handleAddHabit} className="habit-form">
// // // //       <input
// // // //         type="text"
// // // //         placeholder="Habit Title"
// // // //         value={title}
// // // //         onChange={(e) => setTitle(e.target.value)}
// // // //         required
// // // //       />
// // // //       <select value={category} onChange={(e) => setCategory(e.target.value)}>
// // // //         <option value="Fitness">Fitness</option>
// // // //         <option value="Learning">Learning</option>
// // // //         <option value="Wellness">Wellness</option>
// // // //         <option value="Health">Health</option>
// // // //       </select>
// // // //       <button type="submit" disabled={loading}>
// // // //         {loading ? "Adding..." : "Add Habit"}
// // // //       </button>
// // // //     </form>
// // // //   );
// // // // };

// // // // // export default AddHabit;
// // // // import React, { useState } from "react";
// // // // import axios from "axios";

// // // // const AddHabit = ({ fetchHabits }) => {
// // // //   const [title, setTitle] = useState("");
// // // //   const [category, setCategory] = useState("Fitness");

// // // //   const handleAddHabit = async (e) => {
// // // //     e.preventDefault();
// // // //     try {
// // // //       const res = await axios.post(
// // // //         "http://localhost:4000/api/habits/add",
// // // //         { title, category },
// // // //         { withCredentials: true } // important for cookies
// // // //       );
// // // //       if (res.data.success) {
// // // //         setTitle("");
// // // //         setCategory("Fitness");
// // // //         fetchHabits();
// // // //       } else {
// // // //         alert("Failed to add habit. Check console.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Failed to add habit", err.response?.data || err.message);
// // // //       alert("Failed to add habit. Check console for details.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <form
// // // //       onSubmit={handleAddHabit}
// // // //       style={{
// // // //         display: "flex",
// // // //         gap: "0.5rem",
// // // //         marginBottom: "1rem",
// // // //         justifyContent: "center",
// // // //       }}
// // // //     >
// // // //       <input
// // // //         type="text"
// // // //         placeholder="Habit Title"
// // // //         value={title}
// // // //         onChange={(e) => setTitle(e.target.value)}
// // // //         required
// // // //         style={{ padding: "0.5rem", flex: 2 }}
// // // //       />
// // // //       <select
// // // //         value={category}
// // // //         onChange={(e) => setCategory(e.target.value)}
// // // //         style={{ padding: "0.5rem", flex: 1 }}
// // // //       >
// // // //         <option value="Fitness">Fitness</option>
// // // //         <option value="Learning">Learning</option>
// // // //         <option value="Wellness">Wellness</option>
// // // //         <option value="Health">Health</option>
// // // //       </select>
// // // //       <button type="submit" style={{ padding: "0.5rem 1rem" }}>
// // // //         Add Habit
// // // //       </button>
// // // //     </form>
// // // //   );
// // // // };

// // // // export default AddHabit;
// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // // List of all categories, must match the Habit model's enum options
// // // const categories = [
// // //     "Fitness",
// // //     "Learning",
// // //     "Wellness",
// // //     "Health",
// // //     "Finance",
// // //     "Creativity",
// // //     "Social",
// // //     "Other", // The new option
// // // ];

// // // const AddHabit = ({ fetchHabits }) => {
// // //   const [title, setTitle] = useState("");
// // //   const [category, setCategory] = useState(categories[0]); // Default to the first category

// // //   const handleAddHabit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const res = await axios.post(
// // //         "http://localhost:4000/api/habits/add",
// // //         { title, category },
// // //         { withCredentials: true } // important for cookies
// // //       );
// // //       if (res.data.success) {
// // //         setTitle("");
// // //         setCategory(categories[0]); // Reset to default category
// // //         fetchHabits();
// // //         alert("Habit added successfully!");
// // //       } else {
// // //         alert("Failed to add habit. Check console.");
// // //       }
// // //     } catch (err) {
// // //       console.error("Failed to add habit", err.response?.data || err.message);
// // //       alert("Failed to add habit. Check console for details.");
// // //     }
// // //   };

// // //   // --- Inline Styles for Dark Theme Visibility and Aesthetics ---
// // //   const formContainerStyle = {
// // //     display: "flex",
// // //     gap: "10px",
// // //     marginBottom: "30px",
// // //     padding: "15px",
// // //     borderRadius: "8px",
// // //     backgroundColor: "#333", // Dark container background
// // //     alignItems: "center",
// // //   };

// // //   const inputAndSelectBaseStyle = {
// // //     padding: "10px",
// // //     border: "1px solid #555",
// // //     borderRadius: "5px",
// // //     backgroundColor: "#444", // Slightly lighter than container background
// // //     color: "white",
// // //     fontSize: "16px",
// // //   };

// // //   const buttonStyle = {
// // //     padding: "10px 20px",
// // //     backgroundColor: "#007bff", // Blue button
// // //     color: "white",
// // //     border: "none",
// // //     borderRadius: "5px",
// // //     cursor: "pointer",
// // //     fontWeight: "bold",
// // //     fontSize: "16px",
// // //     transition: 'background-color 0.2s',
// // //   };
// // //   // ----------------------------------------------------------------

// // //   return (
// // //     <form onSubmit={handleAddHabit} style={formContainerStyle}>
// // //       <input
// // //         type="text"
// // //         placeholder="Habit Title"
// // //         value={title}
// // //         onChange={(e) => setTitle(e.target.value)}
// // //         required
// // //         style={{ ...inputAndSelectBaseStyle, flexGrow: 3 }} // Give more space to the title
// // //       />
      
// // //       <select
// // //         value={category}
// // //         onChange={(e) => setCategory(e.target.value)}
// // //         style={{ ...inputAndSelectBaseStyle, flexGrow: 1 }}
// // //       >
// // //         {/* Map over the new categories list */}
// // //         {categories.map((cat) => (
// // //             <option key={cat} value={cat} style={{ backgroundColor: '#444', color: 'white' }}>
// // //                 {cat}
// // //             </option>
// // //         ))}
// // //       </select>
      
// // //       <button 
// // //         type="submit" 
// // //         style={buttonStyle}
// // //       >
// // //         Add Habit
// // //       </button>
// // //     </form>
// // //   );
// // // };

// // // export default AddHabit;
// // import React, { useState } from "react";
// // import axios from "axios";

// // // List of all categories
// // const categories = [
// //     "Fitness",
// //     "Learning",
// //     "Wellness",
// //     "Health",
// //     "Finance",
// //     "Creativity",
// //     "Social",
// //     "Other",
// // ];

// // // Options for frequency selector (1-7 days per week)
// // const frequencyOptions = [7, 6, 5, 4, 3, 2, 1];

// // const AddHabit = ({ fetchHabits }) => {
// //   const [title, setTitle] = useState("");
// //   const [category, setCategory] = useState(categories[0]);
// //   // 🆕 NEW STATE: For target frequency, default to 7 (Daily)
// //   const [targetFrequency, setTargetFrequency] = useState(7); 

// //   const handleAddHabit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(
// //         "http://localhost:4000/api/habits/add",
// //         // 🆕 Include targetFrequency in the payload
// //         { title, category, targetFrequency },
// //         { withCredentials: true }
// //       );
// //       if (res.data.success) {
// //         setTitle("");
// //         setCategory(categories[0]);
// //         setTargetFrequency(7); // Reset frequency
// //         fetchHabits();
// //         alert("Habit added successfully!");
// //       } else {
// //         alert("Failed to add habit. Check console.");
// //       }
// //     } catch (err) {
// //       console.error("Failed to add habit", err.response?.data || err.message);
// //       alert("Failed to add habit. Check console for details.");
// //     }
// //   };

// //   // --- Inline Styles for Dark Theme Visibility ---
// //   const formContainerStyle = {
// //     display: "flex",
// //     gap: "10px",
// //     marginBottom: "30px",
// //     padding: "15px",
// //     borderRadius: "8px",
// //     backgroundColor: "#333",
// //     alignItems: "center",
// //   };

// //   const inputAndSelectBaseStyle = {
// //     padding: "10px",
// //     border: "1px solid #555",
// //     borderRadius: "5px",
// //     backgroundColor: "#444",
// //     color: "white",
// //     fontSize: "16px",
// //   };

// //   const buttonStyle = {
// //     padding: "10px 20px",
// //     backgroundColor: "#007bff",
// //     color: "white",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //     fontWeight: "bold",
// //     fontSize: "16px",
// //     transition: 'background-color 0.2s',
// //   };
// //   // ----------------------------------------------------------------

// //   return (
// //     <form onSubmit={handleAddHabit} style={formContainerStyle}>
// //       <input
// //         type="text"
// //         placeholder="Habit Title"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         required
// //         style={{ ...inputAndSelectBaseStyle, flexGrow: 3 }}
// //       />
      
// //       <select
// //         value={category}
// //         onChange={(e) => setCategory(e.target.value)}
// //         style={{ ...inputAndSelectBaseStyle, flexGrow: 1 }}
// //       >
// //         {categories.map((cat) => (
// //             <option key={cat} value={cat} style={{ backgroundColor: '#444', color: 'white' }}>
// //                 {cat}
// //             </option>
// //         ))}
// //       </select>

// //       {/* 🆕 Target Frequency Dropdown */}
// //       <select
// //         value={targetFrequency}
// //         onChange={(e) => setTargetFrequency(Number(e.target.value))}
// //         style={{ ...inputAndSelectBaseStyle, flexGrow: 0, width: '150px' }}
// //       >
// //         {frequencyOptions.map((freq) => (
// //             <option key={freq} value={freq} style={{ backgroundColor: '#444', color: 'white' }}>
// //                 {freq} time{freq > 1 ? 's' : ''} / week
// //             </option>
// //         ))}
// //       </select>
      
// //       <button 
// //         type="submit" 
// //         style={buttonStyle}
// //       >
// //         Add Habit
// //       </button>
// //     </form>
// //   );
// // };

// // export default AddHabit;
// import React, { useState } from "react";
// import axios from "axios";

// // List of all categories
// const categories = [
//     "Fitness",
//     "Learning",
//     "Wellness",
//     "Health",
//     "Finance",
//     "Creativity",
//     "Social",
//     "Other",
// ];

// // ⚡ MODIFIED: Custom options for frequency selector
// const frequencyOptions = [
//     { value: "7/week", label: "7 times a week" },
//     { value: "5/week", label: "5 times a week" },
//     { value: "3/week", label: "3 times a week" },
//     { value: "None", label: "None" },
// ];

// const AddHabit = ({ fetchHabits }) => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState(categories[0]);
//   // ⚡ MODIFIED: Default targetFrequency to the first option's value (7/week)
//   const [targetFrequency, setTargetFrequency] = useState(frequencyOptions[0].value); 

//   const handleAddHabit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/habits/add",
//         { title, category, targetFrequency },
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setTitle("");
//         setCategory(categories[0]);
//         setTargetFrequency(frequencyOptions[0].value); // Reset frequency
//         fetchHabits();
//         alert(`Habit added: ${res.data.habit.title} (${res.data.habit.targetFrequency})`);
//       } else {
//         alert("Failed to add habit. Check console.");
//       }
//     } catch (err) {
//       console.error("Failed to add habit", err.response?.data || err.message);
//       alert("Failed to add habit. Check console for details.");
//     }
//   };

//   // --- Inline Styles for Dark Theme Visibility and Spacing ---
//   const formContainerStyle = {
//     display: "flex",
//     gap: "10px", // Increased space between elements
//     marginBottom: "30px",
//     padding: "15px",
//     borderRadius: "8px",
//     backgroundColor: "#333",
//     alignItems: "center",
//   };

//   const inputAndSelectBaseStyle = {
//     padding: "10px",
//     border: "1px solid #555",
//     borderRadius: "5px",
//     backgroundColor: "#444",
//     color: "white",
//     fontSize: "16px",
//   };

//   const buttonStyle = {
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     fontSize: "16px",
//     transition: 'background-color 0.2s',
//   };
//   // ----------------------------------------------------------------

//   return (
//     <form onSubmit={handleAddHabit} style={formContainerStyle}>
//       <input
//         type="text"
//         placeholder="Habit Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//         style={{ ...inputAndSelectBaseStyle, flexGrow: 3 }}
//       />
      
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         style={{ ...inputAndSelectBaseStyle, flexGrow: 1 }}
//       >
//         {categories.map((cat) => (
//             <option key={cat} value={cat} style={{ backgroundColor: '#444', color: 'white' }}>
//                 {cat}
//             </option>
//         ))}
//       </select>

//       {/* ⚡ MODIFIED: Target Frequency Dropdown using custom options */}
//       <select
//         value={targetFrequency}
//         onChange={(e) => setTargetFrequency(e.target.value)}
//         style={{ ...inputAndSelectBaseStyle, flexGrow: 0, width: '200px' }} 
//       >
//         {frequencyOptions.map((opt) => (
//             <option key={opt.value} value={opt.value} style={{ backgroundColor: '#444', color: 'white' }}>
//                 {opt.label}
//             </option>
//         ))}
//       </select>
      
//       <button 
//         type="submit" 
//         style={buttonStyle}
//       >
//         Add Habit
//       </button>
//     </form>
//   );
// };

// export default AddHabit;
import React, { useState } from "react";
import axios from "axios";

// List of all categories
const categories = [
    "Fitness",
    "Learning",
    "Wellness",
    "Health",
    "Finance",
    "Creativity",
    "Social",
    "Other",
];

// Custom options for frequency selector
const frequencyOptions = [
    { value: "7/week", label: "7 times a week" },
    { value: "5/week", label: "5 times a week" },
    { value: "3/week", label: "3 times a week" },
    { value: "none", label: "None" },
];

const AddHabit = ({ fetchHabits }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [targetFrequency, setTargetFrequency] = useState(frequencyOptions[0].value); 
  // 🆕 NEW STATE: For the optional website link
  const [websiteLink, setWebsiteLink] = useState(""); 

  const handleAddHabit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/habits/add",
        // 🆕 Include websiteLink in the payload
        { title, category, targetFrequency, websiteLink },
        { withCredentials: true }
      );
      if (res.data.success) {
        setTitle("");
        setCategory(categories[0]);
        setTargetFrequency(frequencyOptions[0].value);
        setWebsiteLink(""); // Reset the link field
        fetchHabits();
        alert(`Habit added: ${res.data.habit.title}`);
      } else {
        alert("Failed to add habit. Check console.");
      }
    } catch (err) {
      console.error("Failed to add habit", err.response?.data || err.message);
      alert("Failed to add habit. Check console for details.");
    }
  };

  // --- Inline Styles for Dark Theme Visibility and Spacing ---
  const mainFormRowStyle = {
    display: "flex",
    gap: "10px", 
    marginBottom: "10px", // Reduced margin for the row
    alignItems: "center",
  };
  
  const linkRowStyle = {
    marginBottom: "30px", // Larger margin for separation before list
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#333",
  };

  const inputAndSelectBaseStyle = {
    padding: "10px",
    border: "1px solid #555",
    borderRadius: "5px",
    backgroundColor: "#444",
    color: "white",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: 'background-color 0.2s',
  };
  // ----------------------------------------------------------------

  return (
    <form onSubmit={handleAddHabit} style={linkRowStyle}>
        
      {/* FIRST ROW: Title, Category, Frequency, Button */}
      <div style={mainFormRowStyle}>
        <input
          type="text"
          placeholder="Habit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ ...inputAndSelectBaseStyle, flexGrow: 3 }}
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ ...inputAndSelectBaseStyle, flexGrow: 1 }}
        >
          {categories.map((cat) => (
              <option key={cat} value={cat} style={{ backgroundColor: '#444', color: 'white' }}>
                  {cat}
              </option>
          ))}
        </select>

        <select
          value={targetFrequency}
          onChange={(e) => setTargetFrequency(e.target.value)}
          style={{ ...inputAndSelectBaseStyle, flexGrow: 0, width: '200px' }} 
        >
          {frequencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ backgroundColor: '#444', color: 'white' }}>
                  {opt.label}
              </option>
          ))}
        </select>
        
        <button 
          type="submit" 
          style={buttonStyle}
        >
          Add Habit
        </button>
      </div>

      {/* SECOND ROW: Website Link */}
      <div style={{...mainFormRowStyle, marginBottom: 0, marginTop: '10px'}}>
        <input
          type="url" // Use type="url" for better validation
          placeholder="Optional: Website Link (e.g., https://youtube.com/meditation)"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
          style={{ ...inputAndSelectBaseStyle, flexGrow: 1 }}
        />
      </div>
    </form>
  );
};

export default AddHabit;