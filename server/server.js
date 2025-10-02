import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import userroutes from "./routes/userroutes.js";

const app = express();
const port = process.env.PORT || 4000
connectDB();


console.log(port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedorigins = ["http://localhost:5173"];

app.use(cors({
    origin: allowedorigins,
    credentials: true,
}));

// api endpoints
app.get('/',(req,res)=>{
    res.send("api workine ncgv n vsffrvfsvgb 343");
})
app.get('/', (req, res) => {
  res.send("Welcome to the homepage! No login needed.");
});
app.use('/api/auth', authRoutes);
//auth routes
app.use('/api/user', userroutes); //user routes
app.listen(port, ()=>console.log('server started on PORT:',port));
console.log("serverrrr");

