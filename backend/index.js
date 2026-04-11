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
app.use(helmet());  // Secure HTTP headers
app.use(express.json({ limit: '10mb' }));  // Limit payload size
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ["http://localhost:5173", "http://localhost:3000", "http://localhost:5001", "http://localhost:5001"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// HTTPS Enforcement in Production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.status(403).json({
        success: false,
        message: 'HTTPS required in production'
      });
    }
    next();
  });
}

// Rate Limiting
app.use('/api/', generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
