import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
//load environment variable
dotenv.config();
const app = express();
app.use(express.json());
//connect mongodb
app.use(
  cors({
    origin: ["http://localhost:5001", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
connectDB();

app.use("/api/user", userRouter);
//http://localhost:5000/api/user
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//deepak@99
