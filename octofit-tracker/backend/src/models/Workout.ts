import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    activityTypes: [{ type: String, trim: true }],
    estimatedMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);