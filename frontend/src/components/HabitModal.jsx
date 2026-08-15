import { X } from 'lucide-react';

import '../styles/habit-modal.css';

function HabitModal({
  habitName,
  isEditing,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {
  const modalTitle = isEditing ? 'Edit Habit' : 'Add New Habit';
  const submitText = isEditing ? 'Save Changes' : 'Add Habit';

  return (
    <div
      className='habit-modal'
      role='dialog'
      aria-modal='true'
      aria-labelledby='habit-modal-title'
    >
      <div className='habit-modal__backdrop' onClick={onClose} />

      <div className='habit-modal__content'>
        <div className='habit-modal__header'>
          <h2 id='habit-modal-title' className='habit-modal__title'>
            {modalTitle}
          </h2>

          <button
            type='button'
            className='habit-modal__close-button'
            onClick={onClose}
            aria-label='Close modal'
            disabled={isSubmitting}
          >
            <X size={22} />
          </button>
        </div>

        <form className='habit-modal__form' onSubmit={onSubmit}>
          <label htmlFor='habitName' className='habit-modal__label'>
            Habit Name
          </label>

          <input
            id='habitName'
            name='habitName'
            type='text'
            className='habit-modal__input'
            value={habitName}
            onChange={onChange}
            placeholder='Enter your habit'
            autoComplete='off'
            autoFocus
            disabled={isSubmitting}
            required
          />

          <div className='habit-modal__buttons'>
            <button
              type='button'
              className='habit-modal__cancel-button'
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type='submit'
              className='habit-modal__submit-button'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HabitModal;
