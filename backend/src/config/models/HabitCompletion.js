import mongoose from 'mongoose';

const habitCompletionSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit',
      required: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

habitCompletionSchema.index({ habit: 1, date: 1 }, { unique: true });

const HabitCompletion = mongoose.model(
  'HabitCompletion',
  habitCompletionSchema,
);

export default HabitCompletion;
