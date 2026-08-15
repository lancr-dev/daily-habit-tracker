import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HabitTracker from './pages/HabitTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HabitTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
