import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/config/db.js";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
//load environment variable
dotenv.config();
const app = express();
app.use(express.json());
//connect mongodb
app.use(cors());
connectDB();

app.use("/api/user", userRouter);
//http://localhost:5000/api/user
app.use("/api/blog", blogRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//deepak@99
