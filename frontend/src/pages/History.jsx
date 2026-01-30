import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { History as HistoryIcon, TrendingUp } from 'lucide-react';

export default function History() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/trends')
      .then(res => setTrends(res.data.trends))
      .catch(err => console.error("Could not fetch trends", err));
  }, []);

  return (
    <div className="space-y-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* chart */}
      <div className="bg-white/60 backdrop-blur-xl border border-[#492828]/10 p-8 rounded-[2.5rem] shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#84934A] p-2 rounded-lg text-white">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-xl font-black text-[#492828] tracking-tight uppercase">Mood Analytics</h2>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#49282815" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#49282860" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#49282860" 
                fontSize={10} 
                domain={[0, 10]} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#492828', 
                  border: 'none', 
                  borderRadius: '16px', 
                  color: '#ECECEC',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }} 
                itemStyle={{ padding: '2px 0' }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#84934A" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#84934A', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#492828" 
                strokeWidth={2} 
                strokeDasharray="6 6" 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex gap-6 mt-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#84934A]"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#492828]/60">Mood</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-[2px] bg-[#492828]"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#492828]/60">Stress</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <HistoryIcon size={18} className="text-[#492828]/40" />
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#492828]/40">Past Reflections</h3>
        </div>

        <div className="grid gap-3">
          {trends.length === 0 ? (
            <div className="bg-white/40 p-12 rounded-[2rem] text-center border border-dashed border-[#492828]/10">
              <p className="text-sm text-[#492828]/40 font-medium italic">No data yet. Log a mood to see history!</p>
            </div>
          ) : (
            trends.map((t, i) => (
              <div key={i} className="group bg-white/60 hover:bg-white p-6 rounded-[2rem] border border-[#492828]/5 flex justify-between items-center transition-all shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-[#84934A] uppercase tracking-widest">{t.date}</span>
                  <p className="text-sm text-[#492828] font-medium leading-relaxed max-w-xl">
                    {t.journal || "No journal entry provided."}
                  </p>
                </div>
                <div className="flex gap-4 items-center pl-8">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-[#492828]/30 uppercase">Mood</p>
                    <p className="text-lg font-black text-[#84934A]">{t.mood}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-[#492828]/5"></div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-[#492828]/30 uppercase">Stress</p>
                    <p className="text-lg font-black text-[#492828]">{t.stress}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}