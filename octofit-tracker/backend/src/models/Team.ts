import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    coach: { type: String, trim: true },
    members: [{ type: String, trim: true }],
    totalPoints: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export const Team = model('Team', teamSchema);