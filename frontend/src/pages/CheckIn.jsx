import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom'; 
import { Sparkles, MessageSquare, StickyNote, AlertTriangle, HeartHandshake, Mic, MicOff, Volume2 } from 'lucide-react';

export default function CheckIn() {
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [journal, setJournal] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });
  const [showWarning, setShowWarning] = useState(false); 
  
  const textAreaRef = useRef(null);
  const recognitionRef = useRef(null); //control microphone
  const audioRef = useRef(null); //control speaker
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [journal]);

  // STT feature
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser does not support Speech Recognition.");

    if (!isListening) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setJournal(transcript);
      };

      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    }
  };

  // TTS feature
  const playReflection = (text) => {
    if (!text) return;

    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_]/g, '').trim();
    setIsSpeaking(true);
    
    const audio = new Audio(`http://127.0.0.1:8000/speak?text=${encodeURIComponent(cleanText)}`);
    audioRef.current = audio;
    
    audio.play().catch(() => setIsSpeaking(false));
    audio.onended = () => setIsSpeaking(false);
  };

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
      if (res.data.crisis_warning === true) {
        setShowWarning(true);
      }
    } catch (err) {
      setStatus({ loading: false, message: 'AI Unavailable, check if server is running.', type: 'error' });
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start w-full">
        
        {/* left panel */}
        <div className="space-y-6 lg:sticky lg:top-32">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#C3110C] p-2 rounded-lg text-white">
                <StickyNote size={18} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight uppercase">Check-In</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="flex justify-between font-bold text-white/50 uppercase text-[9px] tracking-[0.2em]">
                  Mood <span>{mood}/10</span>
                </label>
                <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} 
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#E6501B]" />
              </div>

              <div className="space-y-3">
                <label className="flex justify-between font-bold text-white/50 uppercase text-[9px] tracking-[0.2em]">
                  Stress <span>{stress}/10</span>
                </label>
                <input type="range" min="1" max="10" value={stress} onChange={(e) => setStress(e.target.value)} 
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C3110C]" />
              </div>

              <div className="space-y-1"> 
                <label className="block mb-4 font-bold text-white/50 uppercase text-[9px] tracking-[0.2em]">
                  Journal Entry
                </label>
                <div className="relative group">
                  <textarea 
                    ref={textAreaRef}
                    value={journal} 
                    onChange={(e) => setJournal(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-12 text-white focus:bg-white/10 focus:ring-4 focus:ring-[#C3110C]/20 outline-none transition-all placeholder-white/20 text-sm min-h-[100px] leading-relaxed resize-none"
                    placeholder="What's on your mind?" 
                  />
                  
                  <button 
                    type="button"
                    onClick={toggleListening}
                    className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all z-20 
                      ${isListening 
                        ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/20' 
                        : 'text-white/20 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#C3110C] text-white rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-[#E6501B] transition-all shadow-md active:scale-[0.98] text-xs">
                {status.loading ? 'Reflecting...' : 'Log Entry'}
              </button>
            </form>
          </div>
        </div>

        {/* right panel */}
        <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] text-[#F5F2F0] shadow-2xl relative min-h-[85vh] flex flex-col justify-start overflow-hidden w-full border border-white/10">
          <Sparkles className={`absolute top-10 right-10 text-[#E6501B] transition-opacity duration-700 ${isSpeaking ? 'opacity-40 animate-pulse scale-110' : 'opacity-10 scale-100'}`} size={120} />
          
          <div className="relative z-10 w-full"> 
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3 text-[#E6501B] font-black uppercase text-[10px] tracking-[0.4em]">
                <MessageSquare size={16} /> 
                <span>MoodLens AI Reflection</span>
              </div>
              
              {status.message && !status.loading && (
                <button 
                  onClick={() => playReflection(status.message)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-[10px] font-black uppercase tracking-widest
                    ${isSpeaking 
                      ? 'bg-[#E6501B] border-[#E6501B] text-white shadow-lg shadow-[#E6501B]/40' 
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-[#E6501B] hover:text-[#E6501B]'
                    }`}
                >
                  {isSpeaking ? (
                    <>
                      <div className="flex gap-0.5">
                        <span className="w-1 h-3 bg-white animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-3 bg-white animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-3 bg-white animate-bounce"></span>
                      </div>
                      <span>Stop AI</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={14} />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {status.loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-3 bg-white/10 rounded-full w-full"></div>
                <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
                <div className="h-3 bg-white/10 rounded-full w-full"></div>
              </div>
            ) : status.message ? (
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown 
                  components={{
                    p: ({node, ...props}) => <p className="text-base md:text-lg leading-relaxed mb-6 text-white/80 font-medium w-full" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-[#E6501B] font-bold" {...props} />,
                    li: ({node, ...props}) => <li className="text-sm mb-2 ml-4 list-disc text-white/60" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-3xl font-black uppercase tracking-tight mb-6 text-white w-full" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-4 text-[#E6501B] w-full" {...props} />,
                  }}
                >
                  {status.message}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start text-left space-y-3 pt-4">
                <p className="text-sm text-white/40 font-medium italic max-w-xs leading-relaxed">
                  Share your thoughts to generate AI-driven insights and coping exercises...
                </p>
                <div className="w-8 h-[1px] bg-[#E6501B]/20"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* warning modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#280905]/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-[#280905] border border-white/10 rounded-[3rem] p-10 max-w-md w-full shadow-2xl text-center space-y-6 animate-in zoom-in">
            <div className="bg-[#C3110C]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-[#C3110C]">
              <AlertTriangle size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Checking in</h2>
              <p className="text-sm text-white/60 leading-relaxed font-medium">
                We've noticed you've been feeling low for a while. You're not alone. Would you like to view our support resources?
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => navigate('/support')}
                className="bg-[#C3110C] hover:bg-[#E6501B] text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake size={20} /> Get Support
              </button>
              <button onClick={() => setShowWarning(false)} className="text-[10px] font-black uppercase text-white/30 pt-2 hover:text-white/50 transition-colors">
                Continue for now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}