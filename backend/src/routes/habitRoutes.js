import express from 'express';
import {
  createHabit,
  getAllHabit,
  getHabit,
  updateHabit,
  deleteHabit,
} from '../controllers/habitController.js';

const router = express.Router();

router.post('/', createHabit);
router.get('/', getAllHabit);

router.get('/:id', getHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

export default router;
