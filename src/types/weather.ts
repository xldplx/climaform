// src/types/weather.ts

export interface ForecastDay {
    date: string;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      maxtemp_f: number; // Add Fahrenheit
      mintemp_f: number; // Add Fahrenheit
      condition: {
        text: string;
        icon: string;
      };
    };
  }
  
  export interface WeatherData {
    location: {
      name: string;
    };
    current: {
      temp_c: number;
      temp_f: number; // Add Fahrenheit
      feelslike_c: number;
      feelslike_f: number; // Add Fahrenheit
      humidity: number;
      wind_kph: number;
      wind_mph: number; // Add Imperial
      condition: {
        text: string;
        icon: string;
      };
    };
    forecast: {
      forecastday: ForecastDay[];
    };
  }