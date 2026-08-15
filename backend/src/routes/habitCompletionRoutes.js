import express from 'express';

import {
  getHabitCompletionsByDate,
  updateHabitCompletion,
} from '../controllers/habitCompletionController.js';

const router = express.Router();

router.get('/', getHabitCompletionsByDate);
router.put('/:habitId', updateHabitCompletion);

export default router;
