import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import RefreshToken from "./models/RefreshToken.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

async function run() {
  await mongoose.connect(process.env.MONGODB_URL);
  
  const allTokens = await RefreshToken.find({});
  console.log("Total tokens in DB:", allTokens.length);
  if (allTokens.length > 0) {
    console.log("Sample token hash:", allTokens[0].token);
    console.log("Sample token used:", allTokens[0].used);
    console.log("Sample token userId:", allTokens[0].userId);
  }

  await mongoose.disconnect();
}

run().catch(console.error);
