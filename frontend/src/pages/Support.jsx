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
      
      <div className="bg-[#C3110C]/10 border-2 border-[#C3110C] p-10 rounded-[3rem] shadow-[0_0_40px_rgba(195,17,12,0.15)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C3110C]/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="bg-[#C3110C] p-5 rounded-3xl text-white shadow-lg shrink-0 animate-pulse">
            <ShieldAlert size={36} strokeWidth={2.5} />
          </div>
          
          <div className="relative z-10 text-center md:text-left space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
              Immediate Crisis? <span className="text-[#C3110C]">Call 911</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl font-medium">
              If you or someone else is in immediate danger, please do not wait. Contact emergency services or go to the nearest hospital emergency department immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((r, i) => (
          <a 
            key={i} 
            href={r.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#C3110C]/10 p-3 rounded-2xl text-[#C3110C] group-hover:bg-[#C3110C] group-hover:text-white transition-all">
                  <LifeBuoy size={24} />
                </div>
                <ExternalLink size={16} className="text-white/20 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">{r.name}</h3>
              <p className="text-[#C3110C] font-black text-[10px] uppercase tracking-[0.2em] mb-4">{r.contact}</p>
              <p className="text-white/40 text-sm leading-relaxed font-medium mb-4">{r.desc}</p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold uppercase text-white/30 tracking-widest">
              <Globe size={12} />
              Official Government Resource
            </div>
          </a>
        ))}
      </div>

      <div className="text-center pt-10">
        <div className="inline-flex flex-col items-center">
          <Heart className="text-[#C3110C] mb-4 animate-pulse" fill="currentColor" size={24} />
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/10">
            You are not alone.
          </h3>
          <div className="w-12 h-1 bg-[#C3110C]/20 rounded-full mt-4"></div>
        </div>
      </div>
    </div>
  );
}