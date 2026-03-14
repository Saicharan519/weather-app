// ============================================================
// ErrorMessage.js — Simple component for showing errors
//
// This is a "presentational" component — it only displays data.
// It has no state of its own. It just receives a `message` prop
// and renders it nicely.
//
// This is a great pattern: separate HOW data looks (this file)
// from WHERE data comes from (App.js)
// ============================================================
export default function ErrorMessage({ message }) {
  return (
    <div className="mt-10 w-full max-w-xl rounded-2xl p-6
                    bg-red-500/10 border border-red-500/30
                    flex items-center gap-4 animate-fadeIn">
      <span className="text-4xl">⚠️</span>
      <div>
        <p className="text-red-300 font-semibold text-lg">Something went wrong</p>
        <p className="text-red-400 text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}