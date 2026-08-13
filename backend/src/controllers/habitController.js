import {
  createHabitService,
  getAllHabitService,
  getHabitService,
  updateHabitService,
  deleteHabitService,
} from '../services/habitService.js';

export const createHabit = async (req, res) => {
  try {
    const { habitName } = req.body;

    if (!habitName) {
      return res.status(400).json({
        success: false,
        message: 'Habit name is required.',
      });
    }

    const habit = await createHabitService({
      habitName,
    });

    return res.status(201).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    console.error('Error in createHabit controller: ', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create habit.',
    });
  }
};

export const getAllHabit = async (req, res) => {
  try {
    const habits = await getAllHabitService();

    return res.status(200).json({
      success: true,
      data: habits,
    });
  } catch (error) {
    console.error('Error in getAllHabitService controller: ', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch habits.',
    });
  }
};

export const getHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await getHabitService(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    console.error('Error in getHabit controller: ', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch habit.',
    });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { habitName } = req.body;

    if (!habitName) {
      return res.status(400).json({
        success: false,
        message: 'Habit name is required.',
      });
    }

    const habit = await updateHabitService(id, habitName);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Habit updated successfully.',
      data: habit,
    });
  } catch (error) {
    console.error('Error in updateHabit controller: ', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update habit.',
    });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await deleteHabitService(id);

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: 'Habit not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Habit deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteHabit: ', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete habit',
    });
  }
};
