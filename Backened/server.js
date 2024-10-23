import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use((req, res) => {
  res.status(404).send({ success: false, message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
