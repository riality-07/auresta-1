require("dotenv").config({ path: "./backend/.env" });

const express = require("express");
const cors = require("cors");

const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AURESTA backend is running successfully"
  });
});

// AI Agent routes
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`AURESTA backend server running on port ${PORT}`);
});
