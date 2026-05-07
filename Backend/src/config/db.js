const mongoose = require("mongoose");
require("dotenv").config();

async function connectWithFallback() {
  const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/gayatri";

  try {
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("MongoDB connected successfully →", mongoURL);
    return;
  } catch (err) {
    console.error("Primary DB connection failed:", err?.message || err);
    console.log("Falling back to in-memory MongoDB for local development...");
  }

  // Fallback: in-memory MongoDB
  const { MongoMemoryServer } = require("mongodb-memory-server");
  const mem = await MongoMemoryServer.create();
  const uri = mem.getUri();
  await mongoose.connect(uri);
  console.log("Connected to in-memory MongoDB.");
}

const connectDB = () => connectWithFallback();

module.exports = { connectDB };
