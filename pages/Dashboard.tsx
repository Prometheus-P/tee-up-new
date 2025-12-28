
import React from 'react';
import { ChevronRight, Award, Star, ShieldCheck, PlayCircle, Calendar } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const MOCK_STATS = [
  { name: 'Jan', score: 85 }, { name: 'Feb', score: 82 }, { name: 'Mar', score: 84 },
  { name: 'Apr', score: 79 }, { name: 'May', score: 77 }, { name: 'Jun', score: 76 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-1000">
      {/* Hero Section: The Pro Persona */}
      <section className="relative h-[70vh] rounded-[2.5rem] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2000&auto=format&fit=crop" 
          alt="Master Pro" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <div className="relative h-full flex flex-col justify-center px-12 space-y-6 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-amber-400"></span>
            <span className="text-amber-200 text-sm font-bold uppercase tracking-[0.3em]">The Masterclass</span>
          </div>
          <h2 className="text-7xl font-serif font-bold text-white leading-tight">
            Elevate Your <br/> <span className="text-transparent bg-clip-text bg-gold-gradient italic">Game.</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed font-light">
            Welcome to the inner circle. Guided by PGA Master Alex Rivera, TeeUp Pro provides the elite tools and data used by the world's finest golfers.
          </p>
          <div className="flex gap-6 pt-4">
            <button className="bg-gold-gradient text-slate-950 px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-xl shadow-amber-900/20 uppercase">
              Start Masterclass
            </button>
            <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-white/5 transition-all flex items-center gap-2 uppercase">
              <PlayCircle size={18} /> View Method
            </button>
          </div>
        </div>
      </section>

      {/* Your Status: Membership Card Style */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 border border-gold rounded-[2rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Award size={150} className="text-amber-400" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-amber-200 text-xs font-bold uppercase tracking-widest mb-1">Membership Status</h3>
              <p className="text-3xl font-serif font-bold">Premier Elite Member</p>
            </div>
            <div className="flex gap-8">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Current Handicap</span>
                <span className="text-4xl font-serif font-bold text-white">12.4</span>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Season Progress</span>
                <span className="text-4xl font-serif font-bold text-emerald-400">-2.1 <span className="text-xs">HCP</span></span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-64 h-32 relative z-10">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_STATS}>
                  <Area type="monotone" dataKey="score" stroke="#d4af37" strokeWidth={3} fill="transparent" />
                </AreaChart>
             </ResponsiveContainer>
             <p className="text-center text-[10px] text-slate-500 mt-2 font-bold tracking-[0.2em] uppercase">Season Scoring Trend</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-[2rem] p-10 flex flex-col justify-center items-center text-center space-y-4 hover:border-gold transition-all cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
             <Calendar size={28} />
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold">Private Lesson</h4>
            <p className="text-sm text-slate-500">Scheduled for Oct 28 with Alex Rivera</p>
          </div>
          <button className="text-amber-200 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
            Manage Booking <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* Elite Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <ShieldCheck />, title: 'Course Intel', desc: 'Real-time strategic analysis of global greens.' },
          { icon: <Star />, title: 'Pro Analysis', desc: 'AI-driven biomechanical swing insights.' },
          { icon: <Award />, title: 'Exclusive Concierge', desc: 'Priority tee times at top-tier private clubs.' },
          { icon: <PlayCircle />, title: 'Master Library', desc: 'Curated technical drills for elite performance.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 hover:bg-slate-900/60 transition-all">
            <div className="text-amber-400 mb-6">{item.icon}</div>
            <h4 className="font-serif text-lg font-bold mb-2">{item.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Philosophy Section */}
      <section className="text-center max-w-3xl mx-auto py-20 space-y-6">
        <h3 className="text-4xl font-serif font-bold italic text-white">"Golf is a game of precision, patience, and poetry. To master it, one must master themselves."</h3>
        <p className="text-amber-200 text-sm font-bold uppercase tracking-widest">- Alex Rivera</p>
      </section>
    </div>
  );
};

export default Dashboard;
