// import mongoose from "mongoose";

// const connectDB = async () => {
//     console.log("connect");
//     await mongoose.connect(process.env.MONGODB_URI).then(() => {
//         console.log("MongoDB connected");
//     }).catch((err) => {
//         console.error("MongoDB connection error:", err);
//     });
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌:", err);
    // Exit process if DB connection fails
    process.exit(1);
  }
};

export default connectDB;
