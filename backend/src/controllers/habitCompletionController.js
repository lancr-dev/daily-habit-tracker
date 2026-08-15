import mongoose from 'mongoose';

import Habit from '../config/models/Habit.js';

import {
  getHabitCompletionsByDateService,
  updateHabitCompletionService,
} from '../services/habitCompletionService.js';

export const getHabitCompletionsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required.',
      });
    }

    const completions = await getHabitCompletionsByDateService(date);

    return res.status(200).json({
      success: true,
      data: completions,
    });
  } catch (error) {
    console.error('Error in getHabitCompletionsByDate controller:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch habit completions.',
    });
  }
};

export const updateHabitCompletion = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid habit ID.',
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required.',
      });
    }

    if (typeof completed !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Completed must be a boolean value.',
      });
    }

    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found.',
      });
    }

    const completion = await updateHabitCompletionService(
      habitId,
      date,
      completed,
    );

    return res.status(200).json({
      success: true,
      message: 'Habit completion updated successfully.',
      data: completion,
    });
  } catch (error) {
    console.error('Error in updateHabitCompletion controller:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to update habit completion.',
    });
  }
};
