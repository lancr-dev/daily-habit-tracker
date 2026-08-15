import '../styles/progress-bar.css';

function ProgressBar({ completedCount, totalCount }) {
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className='progress-bar'>
      <span className='progress-bar__text'>{progress}%</span>

      <div
        className='progress-bar__track'
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${progress}% of habits completed`}
      >
        <div className='progress-bar__fill' style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
