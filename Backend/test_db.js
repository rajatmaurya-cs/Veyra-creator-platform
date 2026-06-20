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
  const userId = "698e05f05e8afff72723802a";
  const tokens = await RefreshToken.find({ userId });
  console.log("Tokens for user:", tokens);
  
  const hashToFind = "77c52c90b01991cf060428345f648a8c54ab568f07814151210403ed24671125";
  const specificToken = await RefreshToken.findOne({ token: hashToFind });
  console.log("Found specific token?", !!specificToken);

  await mongoose.disconnect();
}

run().catch(console.error);
