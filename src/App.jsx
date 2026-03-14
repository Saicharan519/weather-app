// ============================================================
// REACT CONCEPT #1: IMPORTS
// In React, every file is a "module". We import tools we need.
// - useState: lets us store data that can change (like city name)
// - useEffect: lets us run code when something happens
// ============================================================
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";

// ============================================================
// REACT CONCEPT #2: COMPONENTS
// A component is just a JavaScript FUNCTION that returns JSX (HTML-like syntax).
// This is your "App" component — the root of your entire UI.
// Every React app has one root component (usually App.js).
// ============================================================
export default function App() {

  // ==========================================================
  // REACT CONCEPT #3: useState
  // Syntax: const [value, setValue] = useState(initialValue)
  //
  // Think of it like a "smart variable":
  //   - `city`        → the current value
  //   - `setCity`     → a function to UPDATE the value
  //
  // The KEY difference from a normal variable:
  // When you call setCity("London"), React RE-RENDERS the UI automatically!
  // Normal variables don't do that.
  // ==========================================================
  const [city, setCity] = useState("");           // what the user types
  const [weather, setWeather] = useState(null);   // weather data from API (starts empty)
  const [loading, setLoading] = useState(false);  // true while waiting for API
  const [error, setError] = useState("");         // error message if something goes wrong

  // Your OpenWeather API Key — paste yours here!
  const API_KEY = "a5d0808e8caa64d654870f56a75507d4";

  // ==========================================================
  // REACT CONCEPT #4: Regular Functions inside components
  // This is a normal async function — nothing React-specific yet.
  // It fetches weather data when the user searches.
  // ==========================================================
  const fetchWeather = async (searchCity) => {
    // Guard clause: don't fetch if input is empty
    if (!searchCity.trim()) return;

    // Update our state variables — this triggers a re-render!
    setLoading(true);   // show the spinner
    setError("");       // clear any old errors
    setWeather(null);   // clear old weather data

    try {
      // fetch() is built into browsers — it gets data from a URL
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );

      // If the city doesn't exist, the API returns a non-OK status
      if (!response.ok) {
        throw new Error("City not found. Please check the spelling.");
      }

      // .json() converts the raw response into a JavaScript object
      const data = await response.json();

      // setWeather() stores the data AND re-renders the UI with it
      setWeather(data);

    } catch (err) {
      // If anything went wrong, store the error message
      setError(err.message);
    } finally {
      // `finally` runs whether success or failure — always stop loading
      setLoading(false);
    }
  };

  // ==========================================================
  // REACT CONCEPT #5: useEffect
  // Syntax: useEffect(() => { code }, [dependencies])
  //
  // useEffect runs AFTER the component renders.
  // The second argument [] is the "dependency array":
  //   - []        → runs ONCE when component first loads (like onMount)
  //   - [city]    → runs every time `city` changes
  //   - no array  → runs on EVERY render (usually avoid this)
  //
  // Here we load a default city when the app first opens.
  // ==========================================================
  useEffect(() => {
    fetchWeather("London"); // Load London weather on startup
  }, []); // Empty array = run once on mount

  // ==========================================================
  // REACT CONCEPT #6: JSX (JavaScript XML)
  // The `return` statement returns JSX — it looks like HTML but it's JavaScript.
  //
  // Key differences from HTML:
  //   - `class` becomes `className` (class is a reserved JS word)
  //   - `{expressions}` — curly braces let you run JS inside JSX
  //   - Self-closing tags need a slash: <img /> not <img>
  //   - You can only return ONE root element (use a wrapper div or <>)
  // ==========================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center px-4 py-12 font-sans">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-white tracking-tight mb-2">
          🌤 WeatherLens
        </h1>
        <p className="text-blue-300 text-lg">
          Real-time weather for any city on Earth
        </p>
      </div>

      {/* =======================================================
          REACT CONCEPT #7: PASSING PROPS
          Props are how parent components talk to child components.
          Think of props like function arguments.

          Here, SearchBar needs:
            - `onSearch` : the function to call when user hits Enter
            - `city`     : the current city text (controlled input)
            - `setCity`  : function to update the city text

          We're "passing" these down to SearchBar as props.
          ======================================================= */}
      <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />

      {/* =======================================================
          REACT CONCEPT #8: CONDITIONAL RENDERING
          In JSX you can't use if/else directly.
          Instead use:
            - Ternary: condition ? <A /> : <B />
            - Short-circuit: condition && <A />

          Order matters: show loading first, then error, then data
          ======================================================= */}
      {loading && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-300 text-lg">Fetching weather data...</p>
        </div>
      )}

      {/* Show error only if not loading AND there's an error message */}
      {!loading && error && <ErrorMessage message={error} />}

      {/* Show weather card only if not loading, no error, and data exists */}
      {!loading && !error && weather && <WeatherCard data={weather} />}

    </div>
  );
}