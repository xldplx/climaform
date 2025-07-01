// src/App.tsx
import HomePage from './pages/HomePage';

function App() {
  return (
    // Added the `uppercase` class here
    <div className="text-slate-800 font-sans min-h-screen w-full flex flex-col justify-center items-center p-4 uppercase">
      <HomePage />
    </div>
  );
}

export default App;