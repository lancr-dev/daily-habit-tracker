import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HabitTracker from './pages/HabitTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HabitTracker />} />
      </Routes>

      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
