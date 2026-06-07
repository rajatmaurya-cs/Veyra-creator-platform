import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    aiGenerationUsed: {
      type: Number,
      default: 0,
    },

    aiSummarizerUsed: {
      type: Number,
      default: 0,
    },

    currentPeriodStart: {
      type: Date,
      default: Date.now,
    },
    
    currentPeriodEnd: {
      type: Date,
    }
  },

  {
    timestamps: true,
  }
);

export const AIUsage =
  mongoose.models.AIUsage || mongoose.model("AIUsage", usageSchema);