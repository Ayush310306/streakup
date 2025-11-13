// // // import express from "express";
// // // import cors from "cors";
// // // import 'dotenv/config';
// // // import cookieParser from "cookie-parser";
// // // import connectDB from "./config/mongodb.js";
// // // import authRoutes from "./routes/authRoutes.js";
// // // import userroutes from "./routes/userroutes.js";
// // // import habitRoutes from "./routes/habitroutes.js";

// // // const app = express();
// // // const port = process.env.PORT || 4000
// // // connectDB();


// // // console.log(port);
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));
// // // app.use(cookieParser());
// // // const allowedorigins = ["http://localhost:5173"];

// // // // Add this line after middleware like express.json()
// // // app.use("/api/habits", habitRoutes);
// // // // app.use(cors({
// // // //     origin: allowedorigins,
// // // //     credentials: true,
// // // // }));


// // // // import cors from 'cors';
// // // app.use(cors({
// // //   origin: 'http://localhost:5173', // your frontend
  
// // //   credentials: true,
// // // }));

// // // // api endpoints
// // // app.get('/',(req,res)=>{
// // //     res.send("api workine ncgv n vsffrvfsvgb 343");
// // // })
// // // app.get('/', (req, res) => {
// // //   res.send("Welcome to the homepage! No login needed.");
// // // });
// // // app.use('/api/auth', authRoutes);
// // // //auth routes
// // // app.use('/api/user', userroutes); //user routes
// // // app.listen(port, ()=>console.log('server started on PORT:',port));
// // // console.log("serverrrr");
// // import express from "express";
// // import cors from "cors";
// // import 'dotenv/config';
// // import cookieParser from "cookie-parser";
// // import connectDB from "./config/mongodb.js";
// // import authRoutes from "./routes/authRoutes.js";
// // import userroutes from "./routes/userroutes.js";
// // import habitRoutes from "./routes/habitroutes.js";

// // const app = express();
// // const port = process.env.PORT || 4000;

// // // Connect to MongoDB
// // connectDB();

// // // Middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // CORS
// // app.use(cors({
// //   origin: 'http://localhost:5173', // frontend origin
// //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //   credentials: true,
// // }));

// // // Routes
// // app.get('/', (req, res) => {
// //   res.send("Welcome to the homepage! No login needed.");
// // });

// // app.use('/api/auth', authRoutes);
// // app.use('/api/user', userroutes);
// // app.use('/api/habits', habitRoutes);

// // // Start server
// // app.listen(port, () => {
// //   console.log(`Server started on PORT: ${port}`);
// // });
// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
// import authRoutes from "./routes/authRoutes.js";
// import userroutes from "./routes/userroutes.js";
// import habitRoutes from "./routes/habitroutes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // CORS – must come BEFORE your routes
// app.use(cors({
//   origin: 'http://localhost:5173', // your React frontend
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));

// // Test route
// app.get('/', (req, res) => {
//   res.send("API working. Homepage accessible without login.");
// });

// // Auth routes
// app.use('/api/auth', authRoutes);

// // User routes
// app.use('/api/user', userroutes);

// // Habit routes
// app.use('/api/habits', habitRoutes);

// // Start server
// app.listen(port, () => {
//   console.log(`Server started on PORT: ${port}`);
// });
// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import cookieParser from "cookie-parser";
// import connectDB from "./config/mongodb.js";
// import authRoutes from "./routes/authRoutes.js";
// import userroutes from "./routes/userroutes.js";
// import habitRoutes from "./routes/habitroutes.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // ✅ CORS – must come BEFORE routes
// app.use(cors({
//   origin: 'http://localhost:5173', // your React frontend
//   credentials: true,               // allow cookies
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow PATCH
// }));

// // Test route
// app.get('/', (req, res) => {
//   res.send("API working. Homepage accessible without login.");
// });

// // Routes
// app.use('/api/auth', authRoutes);     // Auth routes (signup/login)
// app.use('/api/user', userroutes);     // User routes (profile, settings)
// app.use('/api/habits', habitRoutes);  // Habit routes (get/add/complete)

// // Start server
// app.listen(port, () => {
//   console.log(`Server started on PORT: ${port}`);
// });
import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import userroutes from "./routes/userroutes.js";
import habitRoutes from "./routes/habitroutes.js";
import groupRoutes from "./routes/groupRoutes.js"; // ✅ NEW

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS – must come BEFORE routes
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true,               // allow cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow PATCH
}));

// Test route
app.get('/', (req, res) => {
  res.send("API working. Homepage accessible without login.");
});

// Routes
app.use('/api/auth', authRoutes);     // Auth routes (signup/login)
app.use('/api/user', userroutes);     // User routes (profile, settings)
app.use('/api/habits', habitRoutes);  // Habit routes (get/add/complete)
app.use('/api/groups', groupRoutes);  // ✅ Group routes (create/join/leaderboard)

// Start server
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});