import Habit from '../config/models/Habit.js';
import HabitCompletion from '../config/models/HabitCompletion.js';

export const createHabitService = async ({ habitName }) => {
  const habit = await Habit.create({
    habitName,
  });

  return habit;
};

export const getAllHabitService = async () => {
  const habits = await Habit.find().sort({ createdAt: -1 });

  return habits;
};

export const getHabitService = async (id) => {
  const habit = await Habit.findById(id);

  return habit;
};

export const updateHabitService = async (id, habitName) => {
  const habit = await Habit.findById(id);

  if (!habit) {
    return null;
  }

  habit.habitName = habitName;

  await habit.save();

  return habit;
};

export const deleteHabitService = async (id) => {
  const habit = await Habit.findById(id);

  if (!habit) {
    return null;
  }

  await HabitCompletion.deleteMany({
    habit: habit._id,
  });

  await habit.deleteOne();

  return habit;
};
