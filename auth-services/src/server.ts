import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  });