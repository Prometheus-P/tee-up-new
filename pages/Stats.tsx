
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Target, TrendingDown, Award, Brain, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeRoundPerformance } from '../services/geminiService';

const MOCK_HISTORICAL_DATA = [
  { date: '10/01', score: 85, putts: 34, greens: 40 },
  { date: '10/05', score: 82, putts: 31, greens: 45 },
  { date: '10/12', score: 88, putts: 36, greens: 35 },
  { date: '10/18', score: 79, putts: 29, greens: 55 },
  { date: '10/25', score: 81, putts: 32, greens: 50 },
];

const Stats: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<any>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const insights = await analyzeRoundPerformance(MOCK_HISTORICAL_DATA);
      setAiInsights(insights);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-1">Performance Center</h2>
          <p className="text-slate-400">Deep analysis of your last 5 rounds.</p>
        </div>
        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 text-sm font-bold flex items-center gap-2">
          <Target size={16} />
          PRO STATUS: ACTIVE
        </div>
      </header>

      {/* AI Summary Card */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-8">
        <div className="absolute top-0 right-0 p-4">
          <Brain className="text-emerald-500/20" size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <h3 className="text-xl font-bold">AI Season Review</h3>
          </div>
          
          {loading ? (
            <div className="flex items-center gap-3 text-slate-500 animate-pulse">
              <Loader2 className="animate-spin" size={20} />
              <span>Analyzing mechanics and trends...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-slate-300 italic leading-relaxed text-lg">
                "{aiInsights?.summary}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Key Strengths</h4>
                  {aiInsights?.strengths.map((s: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      {s}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-widest">Growth Areas</h4>
                  {aiInsights?.weaknesses.map((w: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <TrendingDown size={18} className="text-emerald-400" />
            Scoring Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_HISTORICAL_DATA}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[70, 95]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-2xl p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Award size={18} className="text-amber-400" />
            Putting Precision (Avg Putts)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_HISTORICAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="putts" radius={[4, 4, 0, 0]}>
                  {MOCK_HISTORICAL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.putts < 32 ? '#10b981' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Personalized Tips */}
      <section>
        <h3 className="text-xl font-serif font-bold mb-6">Pro Tips for Your Next Round</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights?.tips.map((tip: string, idx: number) => (
            <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-xl p-5 hover:bg-slate-800 transition-all cursor-default group">
              <div className="text-emerald-400 mb-3 bg-emerald-400/10 w-fit p-2 rounded-lg group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
                <Brain size={20} />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stats;
