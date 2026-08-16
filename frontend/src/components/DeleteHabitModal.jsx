import { Trash2, X } from 'lucide-react';
import '../styles/delete-habit-modal.css';

function DeleteHabitModal({ habit, isDeleting, onCancel, onConfirm }) {
  if (!habit) {
    return null;
  }

  return (
    <div
      className='delete-habit-modal'
      role='dialog'
      aria-modal='true'
      aria-labelledby='delete-habit-modal-title'
    >
      <div className='delete-habit-modal__backdrop' />

      <div className='delete-habit-modal__content'>
        <button
          type='button'
          className='delete-habit-modal__close-button'
          onClick={onCancel}
          disabled={isDeleting}
          aria-label='Close delete confirmation'
        >
          <X size={20} />
        </button>

        <div className='delete-habit-modal__icon'>
          <Trash2 size={28} />
        </div>

        <h2 id='delete-habit-modal-title' className='delete-habit-modal__title'>
          Delete Habit?
        </h2>

        <p className='delete-habit-modal__message'>
          Are you sure you want to delete <strong>{habit.habitName}</strong>?
          This action cannot be undone.
        </p>

        <div className='delete-habit-modal__actions'>
          <button
            type='button'
            className='delete-habit-modal__cancel-button'
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            type='button'
            className='delete-habit-modal__confirm-button'
            onClick={() => onConfirm(habit)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHabitModal;
