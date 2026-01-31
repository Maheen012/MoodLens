import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, Clock, History as HistoryIcon, Sparkles, Trash2, RefreshCw } from 'lucide-react';

export default function History() {
  const [allTrends, setAllTrends] = useState([]);
  const [insight, setInsight] = useState("Ready to analyze your patterns. Click generate to start!");
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchData = () => {
    axios.get(`http://127.0.0.1:8000/trends?v=${Date.now()}`)
      .then(res => setAllTrends(res.data.trends || []))
      .catch(err => console.error("Data fetch error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateInsight = () => {
    setLoadingInsight(true);
    axios.get(`http://127.0.0.1:8000/analyze`)
      .then(res => {
        setInsight(res.data.insight);
        setLoadingInsight(false);
      })
      .catch(err => {
        console.error("AI Analysis error:", err);
        setInsight("Quota reached or server error. Try again later!");
        setLoadingInsight(false);
      });
  };

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure? This will delete all logged entries.")) {
      try {
        await axios.delete('http://127.0.0.1:8000/clear');
        setAllTrends([]);
        setInsight("History cleared. Start logging to see new patterns!");
      } catch (err) {
        alert("Failed to clear history.");
      }
    }
  };

  const chartData = allTrends.slice(-10).map((item, index) => ({
    ...item,
    logIndex: index + 1, 
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
      
      {/* AI insight */}
      <div className="bg-[#C3110C]/10 border border-[#C3110C]/20 p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-[-10px] right-[-10px] opacity-10 text-[#E6501B]">
          <Sparkles size={80} />
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="bg-[#C3110C] p-3 rounded-2xl text-white shadow-lg shadow-[#C3110C]/20">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E6501B] mb-2">
                AI Behavioral Insight
              </h4>
              <div className={`text-sm text-white/80 font-semibold leading-relaxed max-w-md prose prose-sm prose-invert ${loadingInsight ? 'animate-pulse' : ''}`}>
                <ReactMarkdown>{insight}</ReactMarkdown>
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerateInsight}
            disabled={loadingInsight}
            className="flex items-center gap-2 bg-[#C3110C] hover:bg-[#E6501B] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {loadingInsight ? <RefreshCw size={18} className="animate-spin" /> : <TrendingUp size={18} />}
            {loadingInsight ? "Analyzing..." : "Generate Insight"}
          </button>
        </div>
      </div>

      {/* chart */}
      <div className="bg-white/5 backdrop-blur-md p-8 rounded-[3rem] border border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#E6501B] p-2 rounded-xl text-white">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Recent Check-ins</h2>
          </div>
          
          <button 
            onClick={handleClearHistory}
            className="flex items-center gap-2 text-[10px] font-bold text-red-400 hover:text-red-300 bg-red-500/10 px-4 py-2 rounded-full uppercase transition-all hover:bg-red-500/20"
          >
            <Trash2 size={12} /> Clear History
          </button>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
              
              <XAxis 
                dataKey="logIndex" 
                fontSize={9} 
                tickLine={false} 
                axisLine={false} 
                stroke="#ffffff40"
                tickFormatter={(val) => `Log ${val}`}
              />
              
              <YAxis domain={[0, 10]} fontSize={10} tickLine={false} axisLine={false} tickCount={6} stroke="#ffffff40" />
              
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ backgroundColor: '#280905', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontSize: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                labelFormatter={(value) => {
                  const entry = chartData.find(d => d.logIndex === value);
                  return entry ? `Entry ${value}: ${entry.date}` : `Entry ${value}`;
                }}
              />
              
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} 
              />
              
              <Bar name="Mood" dataKey="mood" fill="#E6501B" radius={[6, 6, 0, 0]} barSize={18} />
              <Bar name="Stress" dataKey="stress" fill="#C3110C" radius={[6, 6, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <HistoryIcon size={18} className="text-white/20" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white/20">Log History</h3>
        </div>

        <div className="grid gap-3">
          {[...allTrends].reverse().map((entry, idx) => (
            <div key={`full-${idx}`} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 flex justify-between items-center transition-all hover:bg-white/10 shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-[#E6501B] uppercase">{entry.date}</span>
                  <div className="flex items-center gap-1 text-white/30">
                    <Clock size={10} />
                    <span className="text-[9px] font-bold uppercase">{entry.time || "Logged"}</span>
                  </div>
                </div>
                <p className="text-sm text-white/70 font-medium leading-relaxed max-w-xl">{entry.journal}</p>
              </div>

              <div className="flex gap-6 items-center pl-8 border-l border-white/10">
                <div className="text-center">
                  <span className="text-[8px] font-black uppercase text-white/30">Mood</span>
                  <p className="text-lg font-black text-[#E6501B] leading-none mt-1">{entry.mood}</p>
                </div>
                <div className="text-center">
                  <span className="text-[8px] font-black uppercase text-white/30">Stress</span>
                  <p className="text-lg font-black text-[#C3110C] leading-none mt-1">{entry.stress}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}