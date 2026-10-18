require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const medRoute = require("./routes/medicine.routes")
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// JSON Middleware
app.use(express.json());
app.use("/api", medRoute)

//MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
}
connectDB();

// Server Initialization
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
