// src/components/ForecastItem.tsx
import type { ForecastDay } from '../types/weather';

interface ForecastItemProps {
  day: ForecastDay;
  unit: 'metric' | 'imperial'; // Accept the unit prop
}

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default function ForecastItem({ day, unit }: ForecastItemProps) {
  const maxTemp = unit === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f;
  const minTemp = unit === 'metric' ? day.day.mintemp_c : day.day.mintemp_f;

  return (
    <div className="flex items-center justify-between w-full py-2">
      <div className="flex-1">
        <p className="font-semibold text-slate-800 text-sm">{getDayName(day.date)}</p>
        <p className="text-xs text-slate-500">{day.day.condition.text}</p>
      </div>
      
      <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} className="w-12 h-12 mx-4" />

      <div className="text-right flex-1">
        <span className="font-semibold text-slate-800">{Math.round(maxTemp)}°</span>
        <span className="text-slate-500 ml-2">{Math.round(minTemp)}°</span>
      </div>
    </div>
  );
}