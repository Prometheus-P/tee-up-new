
import React from 'react';
import { CreditCard, CheckCircle, Crown, Shield, ArrowRight, Zap } from 'lucide-react';

const Membership: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="text-center space-y-4">
        <h2 className="text-amber-200 text-xs font-bold uppercase tracking-[0.4em]">Investment in Excellence</h2>
        <h1 className="text-5xl font-serif font-bold">The TEEUP Elite Tiers</h1>
        <p className="text-slate-400 max-w-xl mx-auto font-light">
          Unlock the full potential of your game with dedicated coach access, AI-driven biomechanical analysis, and priority booking.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            tier: 'Standard', 
            price: '$199', 
            features: ['4 Lessons / Month', 'Basic AI Summary', 'Mobile App Access'],
            color: 'slate-800'
          },
          { 
            tier: 'Diamond', 
            price: '$499', 
            popular: true,
            features: ['8 Lessons / Month', 'Pro Video Analysis', '2-Way Calendar Sync', 'VIP Concierge'],
            color: 'emerald-600'
          },
          { 
            tier: 'Master', 
            price: '$999', 
            features: ['Unlimited Access', 'Biomechanical Audit', 'Tournament Support', 'Luxury Gifts'],
            color: 'amber-600'
          },
        ].map((item, idx) => (
          <div key={idx} className={`relative flex flex-col bg-slate-900/60 border ${item.popular ? 'border-amber-400' : 'border-white/5'} rounded-[3rem] p-10 overflow-hidden group hover:scale-[1.02] transition-all`}>
            {item.popular && (
              <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-bl-3xl">
                Most Exclusive
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-2">{item.tier}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-serif font-bold">{item.price}</span>
                <span className="text-slate-500 text-sm">/ Month</span>
              </div>
            </div>

            <div className="flex-1 space-y-5">
              {item.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-emerald-400" />
                  {f}
                </div>
              ))}
            </div>

            <button className={`mt-10 w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
              item.popular ? 'bg-gold-gradient text-slate-950 shadow-xl shadow-amber-900/20' : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>

      <section className="bg-slate-900/30 border border-white/5 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
             <Shield className="text-amber-200" size={32} />
             <h3 className="text-3xl font-serif font-bold">Secure Professional Billing</h3>
          </div>
          <p className="text-slate-400 leading-relaxed font-light">
            Integrated with Toss Payments for seamless billing. All memberships include automated invoicing and membership cards compatible with major golf club entry systems.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <CreditCard size={16} /> Automated Invoicing
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Zap size={16} /> Instant Activation
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center gap-2">
            View Billing History <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Membership;
