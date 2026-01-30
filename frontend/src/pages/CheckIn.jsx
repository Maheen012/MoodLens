import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Sparkles, MessageSquare, StickyNote, Lightbulb, Quote } from 'lucide-react';

export default function CheckIn() {
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [journal, setJournal] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });
  
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [journal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: 'info' });
    try {
      const res = await axios.post('http://127.0.0.1:8000/submit', { 
        mood: parseInt(mood), 
        stress: parseInt(stress), 
        journal 
      });
      setStatus({ loading: false, message: res.data.ai_reflection, type: 'success' });
    } catch (err) {
      setStatus({ loading: false, message: 'AI Unavailable, check if server is running.', type: 'error' });
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start w-full">
        
        {/* left panel */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* check in form */}
          <div className="bg-white/80 border border-[#492828]/10 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#84934A] p-2 rounded-lg text-[#ECECEC]">
                <StickyNote size={18} />
              </div>
              <h2 className="text-xl font-black text-[#492828] tracking-tight uppercase">Check-In</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="flex justify-between font-bold text-[#492828]/50 uppercase text-[9px] tracking-[0.2em]">
                  Mood <span>{mood}/10</span>
                </label>
                <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} 
                  className="w-full h-1 bg-[#492828]/10 rounded-lg appearance-none cursor-pointer accent-[#84934A]" />
              </div>

              <div className="space-y-3">
                <label className="flex justify-between font-bold text-[#492828]/50 uppercase text-[9px] tracking-[0.2em]">
                  Stress <span>{stress}/10</span>
                </label>
                <input type="range" min="1" max="10" value={stress} onChange={(e) => setStress(e.target.value)} 
                  className="w-full h-1 bg-[#492828]/10 rounded-lg appearance-none cursor-pointer accent-[#492828]" />
              </div>

              <div className="space-y-3">
                <label className="font-bold text-[#492828]/50 uppercase text-[9px] tracking-[0.2em]">Journal Entry</label>
                <textarea 
                  ref={textAreaRef}
                  value={journal} 
                  onChange={(e) => setJournal(e.target.value)}
                  className="w-full bg-[#ECECEC]/40 border border-[#492828]/5 rounded-xl p-4 text-[#492828] focus:bg-white focus:ring-4 focus:ring-[#84934A]/5 outline-none transition-all placeholder-[#492828]/20 text-sm min-h-[100px] leading-relaxed"
                  placeholder="What's on your mind?" 
                />
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#492828] text-[#ECECEC] rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-[#656D3F] transition-all shadow-md active:scale-[0.98] text-xs">
                {status.loading ? 'Reflecting...' : 'Log Entry'}
              </button>
            </form>
          </div>


        </div>

        {/* right panel AI suggestions and exercises */}
        <div className="bg-[#492828] p-8 md:p-12 rounded-[2.5rem] text-[#ECECEC] shadow-2xl relative min-h-[85vh] flex flex-col justify-start overflow-hidden w-full border border-white/5">
        <Sparkles className="absolute top-10 right-10 text-[#84934A] opacity-10" size={120} />
        
        <div className="relative z-10 w-full"> 
            <div className="flex items-center gap-3 mb-10 text-[#84934A] font-black uppercase text-[10px] tracking-[0.4em]">
            <MessageSquare size={16} /> 
            <span>MoodLens AI</span>
            </div>

            {status.loading ? (
            <div className="space-y-4 animate-pulse">
                <div className="h-3 bg-white/5 rounded-full w-full"></div>
                <div className="h-3 bg-white/5 rounded-full w-full"></div>
                <div className="h-3 bg-white/5 rounded-full w-full"></div>
            </div>
            ) : status.message ? (
            <div className="prose prose-invert max-w-none">
                <ReactMarkdown 
                components={{
                    p: ({node, ...props}) => <p className="text-base md:text-lg leading-relaxed mb-6 text-stone-300 font-light w-full" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-[#84934A] font-bold" {...props} />,
                    li: ({node, ...props}) => <li className="text-sm mb-2 ml-4 list-disc text-stone-400" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-3xl font-black uppercase tracking-tight mb-6 text-white w-full" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-4 text-[#84934A] w-full" {...props} />,
                }}
                >
                {status.message}
                </ReactMarkdown>
            </div>
            ) : (
            <div className="flex flex-col items-start justify-start text-left space-y-3 pt-4">
                <p className="text-sm text-stone-500 font-medium italic opacity-50 max-w-xs leading-relaxed">
                Share your thoughts to generate  suggestions...
                </p>
                <div className="w-8 h-[1px] bg-[#84934A]/20"></div>
            </div>
            )}
        </div>
        </div>

      </div>
    </div>
  );
}