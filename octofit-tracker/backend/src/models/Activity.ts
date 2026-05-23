import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    points: { type: Number, default: 0, min: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);