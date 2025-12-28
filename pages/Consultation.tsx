
import React, { useState } from 'react';
import { Send, User, Target, MessageSquare, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { analyzeConsultationRequest } from '../services/geminiService';

const Consultation: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiBriefing, setAiBriefing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handicap: '',
    goals: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // AI 브리핑 생성 (시뮬레이션 - 실제 서비스에서는 프로 전용 대시보드로 전송됨)
    const briefing = await analyzeConsultationRequest(formData);
    setAiBriefing(briefing);
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-amber-900/30">
          <CheckCircle size={48} className="text-slate-950" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-serif font-bold">Request Received</h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Thank you, <span className="text-white font-bold">{formData.name}</span>. Your inquiry has been prioritized. Alex Rivera will review your profile and contact you within 24 hours.
          </p>
        </div>
        {aiBriefing && (
          <div className="bg-slate-900/40 border border-amber-400/20 p-6 rounded-3xl text-left space-y-3">
            <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> AI Internal Briefing (For Coach Rivera)
            </div>
            <p className="text-sm text-slate-300 italic">"{aiBriefing}"</p>
          </div>
        )}
        <button 
          onClick={() => setSubmitted(false)}
          className="text-amber-200 text-xs font-bold uppercase tracking-widest hover:underline"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <div>
          <h2 className="text-amber-200 text-xs font-bold uppercase tracking-[0.4em] mb-4">Elite Access</h2>
          <h1 className="text-5xl font-serif font-bold leading-tight">Private <br/> Consultation</h1>
          <p className="text-slate-400 mt-6 font-light leading-relaxed">
            Reserve a one-on-one session to audit your game mechanics, mental fortitude, and competitive strategy with a PGA Master Professional.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-amber-200"><User size={20}/></div>
            <div>
              <h4 className="font-bold text-white">Tailored Methodology</h4>
              <p className="text-xs text-slate-500 mt-1">Every swing is unique. We build on your natural biomechanics.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-emerald-400"><Target size={20}/></div>
            <div>
              <h4 className="font-bold text-white">Performance Roadmap</h4>
              <p className="text-xs text-slate-500 mt-1">Clear milestones and data-driven progress tracking.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass border border-white/10 rounded-[3rem] p-10 shadow-2xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gold-gradient rounded-full opacity-50"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                required
                type="text" 
                placeholder="Ex. Alexander Smith"
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-amber-400/50 transition-all outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Handicap</label>
              <input 
                type="text" 
                placeholder="Ex. 12.4"
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:border-amber-400/50 transition-all outline-none"
                value={formData.handicap}
                onChange={e => setFormData({...formData, handicap: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Season Goal</label>
              <input 
                type="text" 
                placeholder="Ex. Breaking 80"
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:border-amber-400/50 transition-all outline-none"
                value={formData.goals}
                onChange={e => setFormData({...formData, goals: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-6 text-slate-500" size={16} />
              <textarea 
                rows={4}
                placeholder="Describe your current struggle or specific needs..."
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-amber-400/50 transition-all outline-none resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-gradient py-5 rounded-2xl text-slate-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={16} /> Submit Inquiry</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Consultation;
