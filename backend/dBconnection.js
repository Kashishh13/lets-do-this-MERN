const mongoose = require("mongoose");

const conn = async () => {
  try {
    const response = await mongoose.connect(
      "mongo db uri here",
    
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

conn();
