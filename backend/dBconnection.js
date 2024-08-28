const mongoose = require("mongoose");

const conn = async () => {
  try {
    const response = await mongoose.connect(
      "mongodb+srv://guptakashishh13:kashishh13@cluster0.3dorust.mongodb.net/task-manager",
    
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

conn();
