// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { fetchWeather } from '../services/weatherService';
import type { WeatherData } from '../types/weather';
import Searchbar from '../components/Searchbar';
import StatCard from '../components/StatCard';
import ForecastItem from '../components/ForecastItem';
import UnitToggle from '../components/UnitToggle';
import { WiThermometer, WiStrongWind, WiHumidity } from 'react-icons/wi';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function HomePage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const handleUnitToggle = () => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  const handleSearch = async (location: { lat: number; lon: number } | string) => {
    if (!initialLoading) setIsSearching(true);
    setError(null);
    try {
      const query = typeof location === 'string'
        ? location
        : `${location.lat},${location.lon}`;
      
      const data = await fetchWeather(query);
      setWeatherData(data);
    } catch (err) {
      setError(`DATA NOT AVAILABLE. PLEASE TRY AGAIN.`);
    } finally {
      setInitialLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSearch({ lat: latitude, lon: longitude });
        },
        () => {
          setError("COULDN'T ACCESS LOCATION. SHOWING DEFAULT.");
          handleSearch('Cikarang');
        }
      );
    } else {
      setError("GEOLOCATION NOT SUPPORTED. SHOWING DEFAULT.");
      handleSearch('Cikarang');
    }
  }, []);

  const temp = unit === 'metric' ? weatherData?.current.temp_c : weatherData?.current.temp_f;
  const feelsLike = unit === 'metric' ? weatherData?.current.feelslike_c : weatherData?.current.feelslike_f;
  const windSpeed = unit === 'metric' ? weatherData?.current.wind_kph : weatherData?.current.wind_mph;
  const tempUnit = unit === 'metric' ? 'C' : 'F';
  const windUnit = unit === 'metric' ? 'KM/H' : 'MPH';

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-widest">
          CLIMAFORM
        </h1>
      </div>
      <div className="mb-6 flex justify-center">
        <UnitToggle unit={unit} onToggle={handleUnitToggle} />
      </div>
      <Searchbar onSearch={handleSearch} isSearching={isSearching} />

      <div className="mt-6">
        {initialLoading ? (
          <div className="text-center text-slate-600 py-10">FETCHING WEATHER DATA...</div>
        ) : error && !weatherData ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          weatherData && (
            <div className="p-6 bg-white/50 rounded-2xl shadow-lg backdrop-blur-lg border border-white/30">
              {/* CURRENT WEATHER SECTION */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <p className="text-xl text-slate-700">{weatherData.location.name}</p>
                  <div className="flex items-center gap-2">
                    <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} className="w-16 h-16 -ml-2" />
                    <p className="text-xs text-slate-600 -ml-2">{weatherData.current.condition.text}</p>
                  </div>
                  <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {Math.round(temp ?? 0)}°{tempUnit}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <StatCard icon={WiThermometer} label="FEELS LIKE" value={`${Math.round(feelsLike ?? 0)}°`} unit={tempUnit} />
                  <StatCard icon={WiStrongWind} label="WIND SPEED" value={windSpeed ?? 0} unit={windUnit} />
                  <StatCard icon={WiHumidity} label="HUMIDITY" value={weatherData.current.humidity} unit="%" />
                </div>
              </div>

              {/* TOGGLE BUTTON */}
              <div
                className="mt-6 pt-4 border-t border-black/10 flex items-center justify-center text-xs font-semibold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors tracking-wider"
                onClick={() => setIsForecastOpen(!isForecastOpen)}
              >
                <span>{isForecastOpen ? 'HIDE' : 'VIEW'} FORECAST</span>
                {isForecastOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
              </div>

              {/* EXPANDABLE FORECAST SECTION */}
              <AnimatePresence>
                {isForecastOpen && (
                  <motion.div
                    key="forecast"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 flex flex-col gap-2">
                      {weatherData.forecast.forecastday.map((day) => (
                        <ForecastItem key={day.date} day={day} unit={unit} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        )}
      </div>
      
      {/* GITHUB NAME FOOTER */}
      <footer className="w-full text-center mt-6">
        <a 
          href="https://github.com/xldplx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-slate-800/40 hover:text-slate-800/70 transition-colors tracking-widest"
        >
          BY XLDPLX
        </a>
      </footer>
    </div>
  );
}