import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

// ✅ 1. CREATE app FIRST
const app = express();

// ✅ 2. MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ 3. ROUTES (AFTER app is created)
app.use("/api/todos", todoRoutes);

// ✅ 4. TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running...");
});

// ✅ 5. DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// ✅ 6. START SERVER (LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

