const mongoose = require("mongoose");

async function connectToMongoDb(url) {
  if (!url) {
    console.error(
      "❌ MONGO_URL is undefined! Please check your env variables."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

module.exports = { connectToMongoDb };
