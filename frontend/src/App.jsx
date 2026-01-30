export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          MoodLens is Ready
        </h1>
        <p className="text-slate-400 mb-6">
          If you see a dark background with a blurry "glass" card, Tailwind v4 is working perfectly.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95">
          Let's Build the 4 Pages
        </button>
      </div>
    </div>
  )
}