import { Pencil, Trash2 } from 'lucide-react';

import '../styles/habit-item.css';

function HabitItem({ habit, isCompleted, onToggle, onEdit, onDelete }) {
  return (
    <article className='habit-item'>
      <label className='habit-item__label'>
        <input
          type='checkbox'
          className='habit-item__checkbox'
          checked={isCompleted}
          onChange={() => onToggle(habit._id)}
          aria-label={`Mark ${habit.habitName} as completed`}
        />

        <span className='habit-item__name'>{habit.habitName}</span>
      </label>

      <div className='habit-item__actions'>
        <button
          type='button'
          className='habit-item__action-button'
          onClick={() => onEdit(habit)}
          aria-label={`Edit ${habit.habitName}`}
        >
          <Pencil size={20} strokeWidth={2} />
        </button>

        <button
          type='button'
          className='habit-item__action-button habit-item__action-button--delete'
          onClick={() => onDelete(habit)}
          aria-label={`Delete ${habit.habitName}`}
        >
          <Trash2 size={20} strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

export default HabitItem;
