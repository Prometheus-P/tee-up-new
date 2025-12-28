
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Save, Wind, Thermometer, ChevronDown } from 'lucide-react';
import { getSmartCaddyAdvice } from '../services/geminiService';

const LiveRound: React.FC = () => {
  const [currentHole, setCurrentHole] = useState(1);
  const [strokes, setStrokes] = useState(0);
  const [putts, setPutts] = useState(0);
  const [caddyAdvice, setCaddyAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const fetchAdvice = async () => {
    setLoadingAdvice(true);
    const advice = await getSmartCaddyAdvice("St. Andrews", currentHole, 4, "Calm, Clear Skies");
    setCaddyAdvice(advice);
    setLoadingAdvice(false);
  };

  useEffect(() => {
    setCaddyAdvice(null);
    setStrokes(0);
    setPutts(0);
  }, [currentHole]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-2">
        <h2 className="text-amber-200 text-xs font-bold uppercase tracking-[0.4em]">Active Tournament</h2>
        <h3 className="text-4xl font-serif font-bold">St. Andrews Old Course</h3>
        <div className="flex justify-center gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-2">
          <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck size={12}/> Certified Round</span>
          <span>•</span>
          <span>Oct 24, 2023</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Main Interface: Watch Face Style */}
        <div className="lg:col-span-3 bg-slate-900/40 border border-gold rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient opacity-30"></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-10">
            <div className="flex items-center gap-12">
              <button 
                disabled={currentHole <= 1}
                onClick={() => setCurrentHole(h => h - 1)}
                className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-all disabled:opacity-20"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="text-center">
                <span className="text-amber-200 text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Hole</span>
                <h3 className="text-8xl font-serif font-bold leading-none tracking-tighter">{currentHole}</h3>
                <span className="text-slate-500 text-xs font-bold tracking-widest mt-4 block">PAR 4 | 455 YARDS</span>
              </div>
              <button 
                disabled={currentHole >= 18}
                onClick={() => setCurrentHole(h => h + 1)}
                className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-all disabled:opacity-20"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="w-full grid grid-cols-2 gap-10">
              <div className="space-y-4 text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Strokes</p>
                <div className="flex items-center justify-center gap-6">
                  <button onClick={() => setStrokes(Math.max(0, strokes - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10">-</button>
                  <span className="text-4xl font-serif font-bold text-white w-10">{strokes}</span>
                  <button onClick={() => setStrokes(strokes + 1)} className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold">+</button>
                </div>
              </div>
              <div className="space-y-4 text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Putts</p>
                <div className="flex items-center justify-center gap-6">
                  <button onClick={() => setPutts(Math.max(0, putts - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10">-</button>
                  <span className="text-4xl font-serif font-bold text-white w-10">{putts}</span>
                  <button onClick={() => setPutts(putts + 1)} className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: AI Caddy and Environment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-slate-950">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold">Alex Rivera's Insight</h4>
                <p className="text-[10px] text-amber-200 uppercase font-bold tracking-widest">Master Strategy</p>
              </div>
            </div>

            <div className="min-h-[120px] flex items-center justify-center">
              {loadingAdvice ? (
                <div className="flex flex-col items-center gap-3 opacity-50">
                  <RotateCcw className="animate-spin" size={20} />
                  <span className="text-[10px] uppercase tracking-widest">Calculating trajectory...</span>
                </div>
              ) : caddyAdvice ? (
                <p className="text-sm text-slate-300 italic leading-relaxed animate-in slide-in-from-bottom-2">
                  "{caddyAdvice}"
                </p>
              ) : (
                <button 
                  onClick={fetchAdvice}
                  className="w-full py-6 border border-gold rounded-2xl text-amber-200 text-xs font-bold uppercase tracking-widest hover:bg-gold-gradient hover:text-slate-950 transition-all shadow-lg"
                >
                  Consult the Master
                </button>
              )}
            </div>
            
            <div className="pt-6 border-t border-white/5 flex justify-between">
               <div className="flex items-center gap-2 text-slate-500 text-xs">
                 <Wind size={14} /> <span>12 MPH NE</span>
               </div>
               <div className="flex items-center gap-2 text-slate-500 text-xs">
                 <Thermometer size={14} /> <span>68°F</span>
               </div>
            </div>
          </div>

          <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold tracking-widest uppercase text-xs shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all">
            <Save size={18} /> Save Hole Performance
          </button>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
)

export default LiveRound;
