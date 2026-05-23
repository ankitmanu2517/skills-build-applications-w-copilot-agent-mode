import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    team: { type: String, trim: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true }
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);