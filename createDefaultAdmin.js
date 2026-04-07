require("dotenv").config();
const mongoose = require("mongoose");
const ensureDefaultAdmin = require("./src/utils/ensureDefaultAdmin");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await ensureDefaultAdmin();
    console.log("Default admin is ready.");
  } catch (error) {
    console.log("Failed to create default admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
