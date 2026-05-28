import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    console.log("📡 Connecting to MongoDB...");
    console.log("📍 URI:", mongoURI);

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully!");
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    console.error("💡 Make sure MongoDB is running: mongod");
    process.exit(1);
  }
};

export default connectDB;
