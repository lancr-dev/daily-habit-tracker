import HabitCompletion from '../config/models/HabitCompletion.js';

export const getHabitCompletionsByDateService = async (date) => {
  const completions = await HabitCompletion.find({ date });

  return completions;
};

export const updateHabitCompletionService = async (
  habitId,
  date,
  completed,
) => {
  const completion = await HabitCompletion.findOneAndUpdate(
    {
      habit: habitId,
      date,
    },
    {
      completed,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    },
  );

  return completion;
};
