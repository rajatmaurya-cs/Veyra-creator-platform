import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

async function run() {
  await mongoose.connect(process.env.MONGODB_URL);
  
  const userId = "698e05f05e8afff72723802a";
  const user = await User.findById(userId);
  console.log("User found?", !!user);
  if (user) {
    console.log("User email:", user.email);
  }

  await mongoose.disconnect();
}

run().catch(console.error);
