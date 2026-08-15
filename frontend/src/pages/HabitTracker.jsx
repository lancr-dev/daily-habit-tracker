import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import HabitItem from '../components/HabitItem';
import HabitModal from '../components/HabitModal';
import ProgressBar from '../components/ProgressBar';

import {
  createHabit,
  deleteHabit,
  getAllHabits,
  getHabitCompletionsByDate,
  updateHabit,
  updateHabitCompletion,
} from '../services/habitService';

import '../styles/habit-tracker.css';

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitName, setHabitName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const dateKey = currentDate.toLocaleDateString('en-CA');

  useEffect(() => {
    fetchHabitData();
  }, []);

  const fetchHabitData = async () => {
    try {
      setIsLoading(true);

      const [habitsResponse, completionsResponse] = await Promise.all([
        getAllHabits(),
        getHabitCompletionsByDate(dateKey),
      ]);

      setHabits(habitsResponse.data);

      const completedHabitIds = completionsResponse.data
        .filter((completion) => completion.completed)
        .map((completion) => completion.habit);

      setCompletedHabits(completedHabitIds);
    } catch (error) {
      console.error('Failed to fetch habit data:', error);

      const message =
        error.response?.data?.message || 'Failed to fetch habit data.';

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingHabit(null);
    setHabitName('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (habit) => {
    setEditingHabit(habit);
    setHabitName(habit.habitName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsModalOpen(false);
    setEditingHabit(null);
    setHabitName('');
  };

  const handleHabitNameChange = (event) => {
    setHabitName(event.target.value);
  };

  const handleSubmitHabit = async (event) => {
    event.preventDefault();

    const trimmedHabitName = habitName.trim();

    if (!trimmedHabitName) {
      toast.error('Habit name is required.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingHabit) {
        const response = await updateHabit(editingHabit._id, trimmedHabitName);

        setHabits((currentHabits) =>
          currentHabits.map((habit) =>
            habit._id === editingHabit._id ? response.data : habit,
          ),
        );

        toast.success('Habit updated successfully.');
      } else {
        const response = await createHabit(trimmedHabitName);

        setHabits((currentHabits) => [response.data, ...currentHabits]);

        toast.success('Habit created successfully.');
      }

      setIsModalOpen(false);
      setEditingHabit(null);
      setHabitName('');
    } catch (error) {
      console.error('Failed to save habit:', error);

      const message = error.response?.data?.message || 'Failed to save habit.';

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteHabit = async (habit) => {
    try {
      await deleteHabit(habit._id);

      setHabits((currentHabits) =>
        currentHabits.filter((currentHabit) => currentHabit._id !== habit._id),
      );

      setCompletedHabits((currentCompletedHabits) =>
        currentCompletedHabits.filter((id) => id !== habit._id),
      );

      toast.success('Habit deleted successfully.');
    } catch (error) {
      console.error('Failed to delete habit:', error);

      const message =
        error.response?.data?.message || 'Failed to delete habit.';

      toast.error(message);
    }
  };

  const handleToggleHabit = async (habitId) => {
    const isCurrentlyCompleted = completedHabits.includes(habitId);
    const newCompletedStatus = !isCurrentlyCompleted;

    try {
      await updateHabitCompletion(habitId, dateKey, newCompletedStatus);

      setCompletedHabits((currentCompletedHabits) => {
        if (newCompletedStatus) {
          return [...currentCompletedHabits, habitId];
        }

        return currentCompletedHabits.filter((id) => id !== habitId);
      });
    } catch (error) {
      console.error('Failed to update habit completion:', error);

      const message =
        error.response?.data?.message || 'Failed to update habit completion.';

      toast.error(message);
    }
  };

  const completedCount = completedHabits.length;
  const totalCount = habits.length;

  return (
    <main className='habit-tracker-page'>
      <section className='habit-tracker'>
        <header className='habit-tracker__header'>
          <p className='habit-tracker__date'>{formattedDate}</p>

          <h1 className='habit-tracker__title'>DAILY HABIT TRACKER</h1>
        </header>

        <section className='habit-tracker__content'>
          <ProgressBar
            completedCount={completedCount}
            totalCount={totalCount}
          />

          <div className='habit-tracker__list'>
            {isLoading ? (
              <p className='habit-tracker__empty-message'>Loading habits...</p>
            ) : habits.length === 0 ? (
              <p className='habit-tracker__empty-message'>
                No habits yet. Add your first habit.
              </p>
            ) : (
              habits.map((habit) => (
                <HabitItem
                  key={habit._id}
                  habit={habit}
                  isCompleted={completedHabits.includes(habit._id)}
                  onToggle={handleToggleHabit}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteHabit}
                />
              ))
            )}
          </div>
        </section>

        <button
          type='button'
          className='habit-tracker__add-button'
          onClick={handleOpenCreateModal}
        >
          Add New Habit
        </button>
      </section>

      {isModalOpen && (
        <HabitModal
          habitName={habitName}
          isEditing={Boolean(editingHabit)}
          isSubmitting={isSubmitting}
          onChange={handleHabitNameChange}
          onClose={handleCloseModal}
          onSubmit={handleSubmitHabit}
        />
      )}
    </main>
  );
}

export default HabitTracker;
