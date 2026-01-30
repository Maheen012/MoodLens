import React from 'react';
import { Phone, ExternalLink, ShieldAlert, Heart, LifeBuoy, Globe } from 'lucide-react';

export default function Support() {
  const resources = [
    { 
      name: "9-8-8 Canada", 
      contact: "Call or Text 9-8-8", 
      desc: "Suicide crisis helpline available 24/7 across Canada in English and French.",
      link: "https://988.ca/" 
    },
    { 
      name: "9-8-8 USA", 
      contact: "Call or Text 9-8-8", 
      desc: "Suicide & Crisis Lifeline providing free and confidential support 24/7 in the US.",
      link: "https://988lifeline.org/" 
    },
    { 
      name: "Mental Health Canada", 
      contact: "Health Canada Portal", 
      desc: "Official government resources for mental health and wellness across all provinces.",
      link: "https://www.canada.ca/en/public-health/topics/mental-health-wellness.html" 
    },
    { 
      name: "NIMH USA", 
      contact: "Find Help - NIMH", 
      desc: "Federal resources and help finding mental health services in your state.",
      link: "https://www.nimh.nih.gov/health/find-help" 
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* emergency */}
      <div className="bg-[#492828] border border-red-900/20 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <ShieldAlert size={120} />
        </div>
        <div className="bg-red-500/10 p-5 rounded-full text-red-400 shrink-0">
          <ShieldAlert size={40} />
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-2">Immediate Crisis? Call 911</h2>
          <p className="text-stone-400 text-sm leading-relaxed max-w-2xl">
            If you or someone else is in immediate danger, please do not wait. Contact emergency services or go to the nearest hospital emergency department immediately.
          </p>
        </div>
      </div>

      {/* Resources */}
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((r, i) => (
          <a 
            key={i} 
            href={r.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white/60 backdrop-blur-md border border-[#492828]/5 p-8 rounded-[2rem] hover:bg-white transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#84934A]/10 p-3 rounded-2xl text-[#84934A] group-hover:bg-[#84934A] group-hover:text-white transition-all">
                  <LifeBuoy size={24} />
                </div>
                <ExternalLink size={16} className="text-[#492828]/20 group-hover:text-[#492828] transition-colors" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-[#492828] mb-1">{r.name}</h3>
              <p className="text-[#84934A] font-black text-[10px] uppercase tracking-[0.2em] mb-4">{r.contact}</p>
              <p className="text-[#492828]/50 text-sm leading-relaxed font-medium mb-4">{r.desc}</p>
            </div>
            <div className="pt-4 border-t border-[#492828]/5 flex items-center gap-2 text-[10px] font-bold uppercase text-[#492828]/30 tracking-widest">
              <Globe size={12} />
              Official Government Resource
            </div>
          </a>
        ))}
      </div>

      <div className="text-center pt-10">
        <div className="inline-flex flex-col items-center">
          <Heart className="text-[#84934A] mb-4 animate-pulse" fill="currentColor" size={24} />
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#492828]/30">
            You are not alone.
          </h3>
          <div className="w-12 h-1 bg-[#84934A]/20 rounded-full mt-4"></div>
        </div>
      </div>
    </div>
  );
}