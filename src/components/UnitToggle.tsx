// src/components/UnitToggle.tsx

interface UnitToggleProps {
    unit: 'metric' | 'imperial';
    onToggle: () => void;
  }
  
  export default function UnitToggle({ unit, onToggle }: UnitToggleProps) {
    return (
      <div className="flex items-center justify-center gap-3 bg-white/40 p-2 rounded-full backdrop-blur-sm border border-black/10 text-xs tracking-widest">
        <button
          onClick={unit === 'imperial' ? onToggle : undefined}
          className={`px-4 py-1 rounded-full transition-colors duration-300 ${
            unit === 'metric' ? 'bg-white/60 text-slate-900 font-bold' : 'text-slate-600'
          }`}
        >
          °C
        </button>
        <button
          onClick={unit === 'metric' ? onToggle : undefined}
          className={`px-4 py-1 rounded-full transition-colors duration-300 ${
            unit === 'imperial' ? 'bg-white/60 text-slate-900 font-bold' : 'text-slate-600'
          }`}
        >
          °F
        </button>
      </div>
    );
  }