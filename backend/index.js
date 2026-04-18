import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Security Middleware
app.use(helmet()); // Secure HTTP headers
app.use(express.json({ limit: "10mb" })); // Limit payload size
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://143.110.176.25.nip.io",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// HTTPS Enforcement in Production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      return next();
    }
    return res.redirect(`https://${req.headers.host}${req.url}`);
  });
}
