// ============================================================
// SearchBar.js — A CHILD COMPONENT
//
// REACT CONCEPT: PROPS (short for "properties")
// When App.js does: <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />
// React passes those values into this function as the `props` object.
//
// We DESTRUCTURE them: ({ city, setCity, onSearch })
// This is the same as:
//   const city = props.city;
//   const setCity = props.setCity;
//   const onSearch = props.onSearch;
// ============================================================
export default function SearchBar({ city, setCity, onSearch }) {

  // ==========================================================
  // REACT CONCEPT: CONTROLLED INPUTS
  // In React, form inputs should be "controlled" — meaning React
  // owns the value, not the browser's DOM.
  //
  // How it works:
  //   1. value={city}         → input always shows what React has
  //   2. onChange={...}       → every keystroke updates state
  //   3. setCity(e.target.value) → state updates → re-render → input updates
  //
  // This creates a loop: Type → State → Re-render → Input shows state
  // This is called "single source of truth"
  // ==========================================================
  const handleKeyDown = (e) => {
    // Keyboard event: if user presses Enter, trigger the search
    if (e.key === "Enter") {
      onSearch(city); // This calls fetchWeather() in App.js!
    }
  };

  return (
    <div className="w-full max-w-xl flex gap-3">

      {/* CONTROLLED INPUT — value is always synced with React state */}
      <input
        type="text"
        value={city}                              // ← React controls this
        onChange={(e) => setCity(e.target.value)} // ← Updates state on every keypress
        onKeyDown={handleKeyDown}                 // ← Search on Enter key
        placeholder="Search any city..."
        className="flex-1 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur
                   border border-white/20 text-white placeholder-blue-300
                   focus:outline-none focus:border-blue-400 focus:bg-white/15
                   text-lg transition-all duration-200"
      />

      {/* Button click calls onSearch (which is fetchWeather from App.js) */}
      <button
        onClick={() => onSearch(city)}
        className="px-6 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400
                   text-white font-semibold text-lg transition-all duration-200
                   hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
      >
        Search
      </button>
    </div>
  );
}