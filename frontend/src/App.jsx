import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import History from './pages/History';
import Support from './pages/Support';

function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-[#492828]/70 hover:text-[#492828] transition-colors text-sm font-bold tracking-tight px-2 py-1">
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F2F0] text-[#492828] selection:bg-[#84934A]/20">
        <nav className="fixed top-0 w-full z-50 border-b border-[#492828]/10 bg-[#ECECEC]/80 backdrop-blur-md">
          <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-black tracking-tighter uppercase text-[#492828]">
              MoodLens
            </Link>
            <div className="flex gap-6">
              <NavLink to="/checkin">Check-in</NavLink>
              <NavLink to="/history">History</NavLink>
              <NavLink to="/support">Support</NavLink>
            </div>
          </div>
        </nav>

        <main className="pt-28 pb-20 px-6 max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/history" element={<History />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}