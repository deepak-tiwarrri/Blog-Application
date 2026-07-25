import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { generalLimiter } from "./middleware/rateLimiter.js";

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

console.log('ALLOWED_ORIGINS env ->', JSON.stringify(process.env.ALLOWED_ORIGINS));

// Log incoming Origin header to help debug CORS mismatches
app.use((req, res, next) => {
  console.log('Incoming Origin header ->', req.headers.origin);
  next();
});

// Normalize configured origins (trim + remove trailing slash)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5001,https://blog-application-liard-nine.vercel.app")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

// Use function form for origin so we can normalize the incoming origin and log decisions
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no Origin header)
      if (!origin) {
        console.log('CORS: no origin (non-browser) - allowed');
        return callback(null, true);
      }
      const normalized = origin.replace(/\/$/, "");
      const allowed = allowedOrigins.includes(normalized);
      console.log(`CORS: incoming origin=${origin} normalized=${normalized} allowed=${allowed}`);
      return callback(null, allowed);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Log what Access-Control-Allow-Origin header was set (or not) for each response
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Access-Control-Allow-Origin ->", res.getHeader("Access-Control-Allow-Origin"));
  });
  next();
});
console.log('ALLOWED_ORIGINS=', JSON.stringify(process.env.ALLOWED_ORIGINS));
app.use(
  cors({
    origin: [
      "http://localhost:5001",
      "https://blog-application-liard-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Rate Limiting
app.use("/api/", generalLimiter);
// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve uploads folder as static
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});


app.use((req, res, next) => {
  console.log('Incoming Origin header ->', req.headers.origin);
  next();
});

// Global Error Handler (must be last)
app.use(errorHandler);
const PORT = process.env.PORT || 8000;

// HTTPS Enforcement in Production
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.debug = () => {};
  app.use((req, res, next) => {
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      return next();
    }
    return res.redirect(`https://${req.headers.host}${req.url}`);
  });
}



app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});