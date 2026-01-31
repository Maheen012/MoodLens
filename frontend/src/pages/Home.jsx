import { ArrowRight, Brain, Activity, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center space-y-6 pt-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-[#492828]">
            MOODLENS <br/>
          </h1>
        </div>
        <p className="text-xl text-[#492828]/60 max-w-2xl mx-auto font-medium">
          AI-Powered Mental Wellness Tracker
        </p>
        <Link to="/checkin" className="inline-flex items-center gap-2 bg-[#84934A] hover:bg-[#656D3F] text-[#ECECEC] px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-md">
          Get Started <ArrowRight size={20} />
        </Link>
      </section>

      <div className="grid md:grid-cols-3 gap-8 px-4">
        {/* Trends */}
        <Link to="/history" className="group bg-white/40 border border-[#492828]/10 p-8 rounded-3xl hover:bg-[#84934A]/10 transition-all">
          <Activity className="text-[#84934A] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-[#492828]">Track Trends</h3>
          <p className="text-[#492828]/70">See how your mood and stress levels fluctuate over time.</p>
        </Link>

        {/*  Check-in */}
        <Link to="/checkin" className="group bg-white/40 border border-[#492828]/10 p-8 rounded-3xl hover:bg-[#84934A]/10 transition-all">
          <Brain className="text-[#656D3F] mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-[#492828]">AI Reflection</h3>
          <p className="text-[#492828]/70">Log your journal entries and receive suggestions and mental health exercises from AI.</p>
        </Link>

        {/* Support */}
        <Link to="/support" className="group bg-white/40 border border-[#492828]/10 p-8 rounded-3xl hover:bg-[#84934A]/10 transition-all">
          <ShieldCheck className="text-[#492828]/60 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-[#492828]">Support</h3>
          <p className="text-[#492828]/70">Quick access to mental health resources across Canada and the US when you need them.</p>
        </Link>
      </div>

      <footer className="mt-28 border-t border-[#492828]/5 pt-12 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* Medical Disclaimer */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-[#492828]/30" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#492828]/40">
                  Clinical Disclaimer
                </h4>
              </div>
              <p className="text-[12px] leading-relaxed text-[#492828]/50 font-medium italic">
                MoodLens is a digital self-reflection space. It is not a therapy tool and is not intended to provide medical diagnosis, clinical advice or treatment plans. Always consult a healthcare professional for medical concerns.
              </p>
            </div>

            {/* Ethics*/}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#84934A]/50" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#84934A]/60">
                  Privacy & Data Storage
                </h4>
              </div>
              <p className="text-[12px] leading-relaxed text-[#492828]/50 font-medium">
              All journal entries and data are stored locally on your device for privacy. No data is shared or stored on external servers. Your entries remain fully under your control.              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#492828]/5 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#492828]/20">
              © 2026 MoodLens
            </p>
          </div>
        </div>
      </footer>
            
    </div>
  );
}