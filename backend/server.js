require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "10kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AURESTA backend is running successfully"
  });
});

app.use("/api/auth", authRoutes);
// AI Agent routes
app.use("/api/ai", aiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AURESTA backend server running on port ${PORT}`);
});
