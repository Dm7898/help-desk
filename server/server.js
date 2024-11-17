import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/tickets.js";
import adminRoutes from "./routes/admin.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://help-desk-1.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests
      } else {
        callback(new Error("Not allowed by CORS")); // Block requests
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies and headers like Authorization
  })
);
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});
// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
