import '../styles/habit-tracker.css';
import ProgressBar from '../components/ProgressBar';

function HabitTracker() {
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <main className='habit-tracker-page'>
      <section className='habit-tracker'>
        <header className='habit-tracker__header'>
          <p className='habit-tracker__date'>{formattedDate}</p>

          <h1 className='habit-tracker__title'>DAILY HABIT TRACKER</h1>
        </header>

        <section className='habit-tracker__content'>
          <ProgressBar completedCount={0} totalCount={0} />

          <div className='habit-tracker__list'>
            <p className='habit-tracker__empty-message'>
              No habits yet. Add your first habit.
            </p>
          </div>
        </section>

        <button type='button' className='habit-tracker__add-button'>
          Add New Habit
        </button>
      </section>
    </main>
  );
}

export default HabitTracker;
