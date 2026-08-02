// Must be the first import: other imported modules (e.g. googleAuth.js)
// read process.env at their own module-evaluation time, which in ESM
// happens before any of this file's own top-level code runs. Loading env
// vars via a later `dotenv.config()` call would be too late for them.
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { generalLimiter } from "./middleware/rateLimiter.js";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy (required for Render / Vercel proxies so rate limiting & IP checks work correctly)
app.set("trust proxy", 1);

// Security Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS Configuration
const defaultAllowedOrigins = [
  "http://localhost:5001",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://blog-application-liard-nine.vercel.app",
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOriginsSet = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, server-to-server, Postman)
    if (!origin) return callback(null, true);

    const normalized = origin.trim().replace(/\/$/, "");

    if (allowedOriginsSet.has(normalized) || normalized.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked request from origin: ${origin}`);
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// HTTPS Enforcement in Production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      return next();
    }
    return res.redirect(`https://${req.headers.host}${req.url}`);
  });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Rate Limiting
app.use("/api/", generalLimiter);

// Serve uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Database
connectDB();

// API Routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[${new Date().toISOString()}] Server listening on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  }
});