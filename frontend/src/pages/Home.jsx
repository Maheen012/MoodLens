import { ArrowRight, Brain, Activity, ShieldCheck } from 'lucide-react';
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

      <div className="grid md:grid-cols-3 gap-8">
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
    </div>
  );
}