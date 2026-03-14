// ============================================================
// WeatherCard.js — Displays all the weather information
//
// REACT CONCEPT: RECEIVING & USING PROPS
// This component receives `data` from App.js (the API response).
// We destructure it immediately to get the fields we need.
//
// The OpenWeather API returns this structure:
// {
//   name: "London",
//   sys: { country: "GB" },
//   weather: [{ description: "light rain", icon: "10d" }],
//   main: { temp: 15, feels_like: 13, humidity: 80, pressure: 1012 },
//   wind: { speed: 5.2 },
//   visibility: 10000
// }
// ============================================================
export default function WeatherCard({ data }) {

  // Destructuring the API data for cleaner code
  const { name, sys, weather, main, wind, visibility } = data;

  // weather is an array — we only need the first item
  const condition = weather[0];

  // Build the icon URL using OpenWeather's icon system
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;

  // Helper: convert visibility from meters to km
  const visKm = (visibility / 1000).toFixed(1);

  // Helper: get a background gradient based on weather condition
  const getConditionStyle = (main) => {
    const styles = {
      Clear: "from-amber-500/20 to-orange-400/10",
      Clouds: "from-slate-500/20 to-blue-400/10",
      Rain: "from-blue-600/20 to-cyan-400/10",
      Snow: "from-blue-200/20 to-white/10",
      Thunderstorm: "from-purple-800/20 to-slate-600/10",
      Mist: "from-gray-400/20 to-slate-400/10",
    };
    return styles[main] || "from-blue-500/20 to-teal-400/10";
  };

  // ==========================================================
  // REACT CONCEPT: DERIVED STATE
  // You don't need state for everything!
  // Values you can CALCULATE from existing state/props
  // don't need their own useState.
  // `visKm` and `iconUrl` are derived from `data` prop.
  // ==========================================================

  return (
    // Animate in with a fade + slide using Tailwind's animate utility
    <div className={`mt-10 w-full max-w-xl rounded-3xl p-8
                     bg-gradient-to-br ${getConditionStyle(condition.main)}
                     border border-white/10 backdrop-blur
                     shadow-2xl shadow-black/30
                     animate-fadeIn`}>

      {/* ── City & Country ── */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-4xl font-bold text-white">{name}</h2>
          <p className="text-blue-300 text-xl">{sys.country}</p>
        </div>
        {/* Live badge */}
        <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium
                          bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
          Live
        </span>
      </div>

      {/* ── Weather Icon + Temperature ── */}
      <div className="flex items-center justify-between my-4">
        <div>
          <div className="text-8xl font-thin text-white leading-none">
            {Math.round(main.temp)}°
            <span className="text-3xl text-blue-300 ml-1">C</span>
          </div>
          <p className="text-blue-200 text-xl mt-2 capitalize">{condition.description}</p>
          <p className="text-blue-400 mt-1">
            Feels like {Math.round(main.feels_like)}°C
          </p>
        </div>

        <img
          src={iconUrl}
          alt={condition.description}
          className="w-32 h-32 drop-shadow-2xl"
        />
      </div>

      {/* ── Stats Grid ── */}
      {/* ==========================================================
          REACT CONCEPT: REUSABLE COMPONENTS WITH PROPS
          Notice StatCard below — instead of repeating the same div
          4 times with different content, we made ONE component and
          pass different props each time. This is the core idea of
          component-based architecture!
          ========================================================== */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <StatCard icon="💧" label="Humidity" value={`${main.humidity}%`} />
        <StatCard icon="💨" label="Wind Speed" value={`${wind.speed} m/s`} />
        <StatCard icon="🔵" label="Pressure" value={`${main.pressure} hPa`} />
        <StatCard icon="👁" label="Visibility" value={`${visKm} km`} />
      </div>
    </div>
  );
}

// ============================================================
// StatCard — A tiny child component used INSIDE WeatherCard
//
// Notice how we define it in the SAME file as WeatherCard.
// You can do this for small, tightly-coupled components.
//
// Props it receives: icon, label, value
// ============================================================
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4
                    flex items-center gap-3 hover:bg-white/10 transition-colors">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-blue-400 text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-white text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}