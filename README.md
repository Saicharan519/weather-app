# 🌤 WeatherLens — React Learning Project

## React Concepts You'll Learn
- `useState` — reactive variables
- `useEffect` — side effects (API calls on mount)
- Props — parent → child data flow
- Conditional rendering — show/hide based on state
- Controlled inputs — React owns the input value
- Component composition — small reusable pieces

---

## 📁 File Structure
```
weather-app/
├── src/
│   ├── App.js              ← Root component, holds all state
│   ├── index.css           ← Tailwind imports
│   └── components/
│       ├── SearchBar.js    ← Controlled input + search button
│       ├── WeatherCard.js  ← Displays weather data
│       └── ErrorMessage.js ← Shows errors nicely
├── tailwind.config.js      ← Tailwind setup
└── README.md
```

---

## 🚀 Setup (Run these in order)

### 1. Create the React app
```bash
npx create-react-app weather-app
cd weather-app
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Copy these files
Replace the files in your project with the ones provided.

### 4. Get your API key
- Go to https://openweathermap.org/api
- Sign up (free) → go to "API Keys"
- Copy your key

### 5. Add your API key
In `App.js`, find this line:
```js
const API_KEY = "YOUR_API_KEY_HERE";
```
Replace with your actual key.

### 6. Run the app
```bash
npm start
```

Open http://localhost:3000 — you should see London's weather!

---

## 🧠 Key React Concepts (Quick Reference)

### useState
```js
const [value, setValue] = useState(initialValue);
// value    = current data
// setValue = function to UPDATE it (triggers re-render!)
```

### useEffect
```js
useEffect(() => {
  // runs AFTER render
}, [dependencies]); // [] = run once on mount
```

### Props
```js
// Parent passes data:
<Child name="London" onSearch={fetchWeather} />

// Child receives it:
function Child({ name, onSearch }) { ... }
```

### Conditional Rendering
```jsx
{isLoading && <Spinner />}
{error ? <Error msg={error} /> : <WeatherCard />}
```

---

## 🔗 API Reference
OpenWeather Current Weather:
```
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric
```