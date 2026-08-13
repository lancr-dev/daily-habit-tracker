import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    habitName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
