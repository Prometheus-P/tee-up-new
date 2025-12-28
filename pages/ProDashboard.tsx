
import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, DollarSign, Calendar, Clock, 
  ArrowUpRight, MessageSquare, Video, Settings, 
  ChevronRight, MoreHorizontal, Brain
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { getProBusinessStrategy } from '../services/geminiService';

const REVENUE_DATA = [
  { month: 'May', revenue: 12400 },
  { month: 'Jun', revenue: 15600 },
  { month: 'Jul', revenue: 18900 },
  { month: 'Aug', revenue: 14200 },
  { month: 'Sep', revenue: 21000 },
];

const ProDashboard: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(true);

  useEffect(() => {
    const loadStrategy = async () => {
      const strategy = await getProBusinessStrategy(REVENUE_DATA);
      setAiInsight(strategy);
      setLoadingInsight(false);
    };
    loadStrategy();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header with Luxury Stats */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-amber-200 text-xs font-bold uppercase tracking-[0.4em] mb-2">Director's Office</h2>
          <h1 className="text-4xl font-serif font-bold">Business Overview</h1>
        </div>
        <div className="flex gap-4">
          <div className="glass border border-white/10 px-6 py-3 rounded-2xl flex flex-col">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Active Members</span>
            <span className="text-2xl font-serif font-bold">42 <span className="text-emerald-400 text-xs ml-1">+12%</span></span>
          </div>
          <div className="bg-gold-gradient text-slate-950 px-6 py-3 rounded-2xl flex flex-col shadow-xl shadow-amber-900/20">
            <span className="text-slate-900/60 text-[10px] uppercase font-bold tracking-widest">Monthly Rev</span>
            <span className="text-2xl font-serif font-bold">$21,000</span>
          </div>
        </div>
      </header>

      {/* AI Strategy Insights Card */}
      <section className="bg-slate-900/40 border border-gold rounded-[2.5rem] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Brain size={140} className="text-amber-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-950">
              <Brain size={16} />
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-200">Elite Business Strategy</h3>
          </div>
          {loadingInsight ? (
            <div className="flex items-center gap-3 text-slate-500 animate-pulse">
              <Clock size={16} className="animate-spin" />
              <span className="text-sm font-medium tracking-wide uppercase text-[10px]">Analyzing market position...</span>
            </div>
          ) : (
            <p className="text-slate-300 italic leading-relaxed max-w-3xl whitespace-pre-wrap">
              {aiInsight}
            </p>
          )}
        </div>
      </section>

      {/* Main Business Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Lessons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold flex items-center gap-2">
              <Calendar size={20} className="text-amber-400" />
              Today's Schedule
            </h3>
            <button className="text-[10px] font-bold text-amber-200 uppercase tracking-widest hover:underline">Full Calendar</button>
          </div>
          
          <div className="space-y-3">
            {[
              { time: '14:00', student: 'Michael Chang', type: 'Swing Masterclass', status: 'In Session' },
              { time: '15:30', student: 'Sarah Jenkins', type: 'Putting Analysis', status: 'Confirmed' },
              { time: '17:00', student: 'David Oh', type: 'Junior Elite', status: 'Pending' },
            ].map((lesson, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-slate-800 transition-all group">
                <div className="flex items-center gap-6">
                  <span className="text-lg font-serif font-bold text-amber-200">{lesson.time}</span>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-amber-200 transition-colors">{lesson.student}</h4>
                    <p className="text-xs text-slate-500">{lesson.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest ${
                    lesson.status === 'In Session' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {lesson.status}
                  </span>
                  <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-600">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-8 h-80">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">Revenue Performance</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}} />
                <Bar dataKey="revenue" radius={[10, 10, 0, 0]}>
                  {REVENUE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === REVENUE_DATA.length - 1 ? '#d4af37' : '#1e293b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar: New Lesson Log & Members */}
        <div className="space-y-6">
          <div className="bg-emerald-600 hover:bg-emerald-500 p-8 rounded-[2rem] text-white space-y-4 shadow-xl shadow-emerald-900/20 transition-all cursor-pointer group">
            <Video size={32} className="group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="text-2xl font-serif font-bold">New Lesson Log</h4>
              <p className="text-emerald-100/80 text-sm font-light mt-1">Upload and analyze new session data.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2">
              Start Session <ChevronRight size={14} />
            </div>
          </div>

          <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 space-y-6">
            <h3 className="font-serif font-bold text-lg flex items-center gap-2">
              <Users size={18} className="text-amber-200" />
              Elite Members
            </h3>
            <div className="space-y-4">
              {['James Wilson', 'Clara Kim', 'Robert Chen'].map((name, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-xs font-bold uppercase">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold">{name}</h5>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase">Diamond Plan</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-full text-slate-500">
                    <MessageSquare size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              Manage All Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProDashboard;
