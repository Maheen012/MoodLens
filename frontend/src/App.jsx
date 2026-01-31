import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import History from './pages/History';
import Support from './pages/Support';

function NavLink({ to, children }) {
  return (
    <Link 
      to={to} 
      className="text-white/50 hover:text-[#E6501B] transition-all text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1"
    >
      {children}
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#280905] text-[#F5F2F0] selection:bg-[#C3110C]/30 font-sans antialiased">
        
        <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#280905]/80 backdrop-blur-xl">
          <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
            
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase text-white hover:text-[#C3110C] transition-colors">
              MoodLens<span className="text-[#C3110C]"></span>
            </Link>
            <div className="flex gap-8 items-center">
              <NavLink to="/history">History</NavLink>
              <NavLink to="/support">Support</NavLink>
                <Link 
                to="/checkin" 
                className="hidden md:block bg-[#C3110C] hover:bg-[#E6501B] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-lg shadow-[#C3110C]/20"
              >
                New Entry
              </Link>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-20 px-8 max-w-[1600px] mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/history" element={<History />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>

        <div className="fixed bottom-0 left-0 w-full h-[300px] bg-[#C3110C]/5 blur-[150px] -z-10 pointer-events-none" />
      </div>
    </Router>
  );
}