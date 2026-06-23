import mongoose from "mongoose";
import dotenv from "dotenv";
import { Plan } from "./Models/Plans.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully!");

    const plans = [
      {
        _id: "6a26777cd642e0469e10335d",
        name: "free",
        price: 0,
        limits: {
          aiGeneration: 5,
          aiSummarizer: 5,
        },
      },
      {
        _id: "6a26780de998feaa9868ad7e",
        name: "plus",
        price: 999,
        limits: {
          aiGeneration: 120,
          aiSummarizer: 120,
        },
      },
      {
        _id: "6a26780de998feaa9868ad7d",
        name: "pro",
        price: 499,
        limits: {
          aiGeneration: 50,
          aiSummarizer: 50,
        },
      },
    ];

    for (const plan of plans) {
      await Plan.findByIdAndUpdate(plan._id, plan, { upsert: true, new: true });
      console.log(`Upserted plan: ${plan.name}`);
    }

    console.log("All plans upserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error executing script:", error);
    process.exit(1);
  }
};

run();
