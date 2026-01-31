import { ArrowRight, Brain, Activity, ShieldCheck, ShieldAlert, Lock, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-12 relative overflow-hidden bg-[#280905] text-[#F5F2F0] min-h-screen">

      <section className="max-w-7xl mx-auto px-4 pt-4 md:pt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left panel*/}
          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#E6501B] block ml-1">
                AI Powered Mental Wellness Tracker
              </span>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white leading-none">
                MOODLENS
              </h1>
              <p className="text-xl text-white/70 font-medium leading-relaxed max-w-lg pt-4">
                A mental health tracking tool focused on mood, stress and reflective journaling, 
                using AI-driven insights to identify emotional patterns and provide personalized suggestions and coping exercises.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/checkin" className="group inline-flex items-center gap-4 bg-[#C3110C] text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-[#E6501B] shadow-[0_0_30px_rgba(195,17,12,0.3)] hover:scale-105 active:scale-95">
                Get Started 
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* right panel */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-[#E6501B]/20 blur-[80px] rounded-full scale-75 animate-pulse" />
            <div className="relative z-10 p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] shadow-2xl">
               <Brain size={240} strokeWidth={1} className="text-[#C3110C] drop-shadow-[0_0_15px_rgba(195,17,12,0.5)]" />
               <div className="absolute -bottom-4 -right-4 bg-[#E6501B] text-white p-6 rounded-3xl shadow-2xl">
                 <Activity size={32} />
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        <Link to="/history" className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-[#740A03]/20 transition-all">
          <Activity className="text-[#E6501B] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-white">Track Trends</h3>
          <p className="text-white/60">See how your mood and stress levels fluctuate over time and receive personalized insights into your mental well-being</p>
        </Link>

        <Link to="/checkin" className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-[#740A03]/20 transition-all">
          <Brain className="text-[#C3110C] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-white">AI Reflection</h3>
          <p className="text-white/60">Log your journal entries and receive suggestions and mental health exercises from AI.</p>
        </Link>

        <Link to="/support" className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-[#740A03]/20 transition-all">
          <ShieldCheck className="text-white/40 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-white">Support</h3>
          <p className="text-white/60">Quick access to mental health resources across Canada and the US when you need them.</p>
        </Link>
      </div>

      <footer className="mt-16 border-t border-white/5 pt-12 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-white/30" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  Clinical Disclaimer
                </h4>
              </div>
              <p className="text-[12px] leading-relaxed text-white/50 font-medium italic">
                MoodLens is a digital self-reflection space. It is not a therapy tool and is not intended to provide medical diagnosis, clinical advice or treatment plans. Always consult a healthcare professional for medical concerns.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#C3110C]/50" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C3110C]/60">
                  Privacy & Data Storage
                </h4>
              </div>
              <p className="text-[12px] leading-relaxed text-white/50 font-medium">
                All journal entries and data are stored locally on your device for privacy. No data is shared or stored on external servers. Your entries remain fully under your control.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/20">
              © 2026 MoodLens
            </p>
          </div>
        </div>
      </footer>
            
    </div>
  );
}