import mongoose from "mongoose";

export async function connectDB(uri) {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, maxPoolSize: 10 });
  return mongoose.connection;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState === 0) return;
  await mongoose.disconnect();
}
