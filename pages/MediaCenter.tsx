
import React from 'react';
import { Play, Youtube, Instagram, ExternalLink, Share2, BookOpen, Globe, MessageCircle } from 'lucide-react';

const SOCIAL_CHANNELS = [
  { 
    name: 'Instagram', 
    icon: <Instagram size={24}/>, 
    color: 'text-amber-200', 
    count: '120K', 
    label: 'Followers',
    url: 'https://www.instagram.com'
  },
  { 
    name: 'YouTube', 
    icon: <Youtube size={24}/>, 
    color: 'text-rose-500', 
    count: '45K', 
    label: 'Subscribers',
    url: 'https://www.youtube.com'
  },
  { 
    name: 'Blog', 
    icon: <BookOpen size={24}/>, 
    color: 'text-emerald-400', 
    count: '8.5K', 
    label: 'Monthly Readers',
    url: 'https://medium.com'
  }
];

const MEDIA_CONTENT = [
  {
    id: '1',
    title: 'Mastering the Draw: Technical Breakdown',
    thumbnail: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=800',
    platform: 'YouTube',
    views: '12K',
    duration: '08:24',
    link: '#'
  },
  {
    id: '2',
    title: 'Daily Mobility Routine for Elite Golfers',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=800',
    platform: 'Instagram',
    views: '45K',
    duration: '01:00',
    link: '#'
  },
  {
    id: '3',
    title: 'Pro Blog: The Mental Mechanics of Course Management',
    thumbnail: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=800',
    platform: 'Blog',
    views: '3.2K',
    duration: '6 min read',
    link: '#'
  }
];

const MediaCenter: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="text-amber-200 text-xs font-bold uppercase tracking-[0.4em] mb-3">Master's Presence</h2>
          <h1 className="text-5xl font-serif font-bold text-white">Digital Academy</h1>
          <p className="text-slate-500 mt-4 max-w-lg font-light">Join the global community and access world-class insights across all elite channels.</p>
        </div>
        <div className="flex gap-3">
          {SOCIAL_CHANNELS.map(ch => (
            <a 
              key={ch.name} 
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 glass border border-white/10 rounded-2xl hover:bg-white/5 transition-all group"
            >
              <div className={`${ch.color} group-hover:scale-110 transition-transform`}>{ch.icon}</div>
            </a>
          ))}
        </div>
      </header>

      {/* Featured Insight Section */}
      <section className="relative h-[55vh] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1592919016327-5117f7815340?q=80&w=1600" 
          alt="Featured Video" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow-2xl group-hover:scale-110 transition-transform ring-4 ring-amber-400/20">
            <Play size={28} fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-12 left-12 space-y-3">
          <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">New Masterclass</span>
          <h3 className="text-4xl font-serif font-bold text-white leading-tight">Short Game Secrets:<br/>The Art of Scrambling</h3>
          <p className="text-slate-300 max-w-md font-light">Exclusive technical breakdown from the practice facility at TPC Sawgrass.</p>
        </div>
      </section>

      {/* Social Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SOCIAL_CHANNELS.map((ch) => (
          <div key={ch.name} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 text-center space-y-4 hover:border-white/20 transition-all group">
            <div className={`mx-auto w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${ch.color} group-hover:rotate-12 transition-transform`}>
              {ch.icon}
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-white">{ch.count}</span>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{ch.label}</p>
            </div>
            <a 
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-amber-200 font-bold uppercase tracking-widest pt-2 flex items-center justify-center gap-2 mx-auto hover:gap-3 transition-all"
            >
              Connect Channel <ExternalLink size={12}/>
            </a>
          </div>
        ))}
      </div>

      {/* Grid Content */}
      <div className="space-y-8">
        <h3 className="text-2xl font-serif font-bold flex items-center gap-3">
          <Globe size={24} className="text-amber-400" /> Latest Updates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEDIA_CONTENT.map((content) => (
            <div key={content.id} className="group bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-900/10 transition-all">
              <div className="relative h-52 overflow-hidden">
                <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play size={32} className="text-white" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10 backdrop-blur-md ${
                    content.platform === 'YouTube' ? 'bg-rose-500/80 text-white' : 
                    content.platform === 'Instagram' ? 'bg-amber-400/80 text-slate-950' : 'bg-emerald-500/80 text-white'
                  }`}>
                    {content.platform}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h4 className="font-serif font-bold text-lg text-slate-100 group-hover:text-amber-200 transition-colors">
                  {content.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-4 border-t border-white/5">
                  <span>{content.views} Views</span>
                  <div className="flex gap-4">
                    <Share2 size={14} className="hover:text-white cursor-pointer" />
                    <ExternalLink size={14} className="hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Consultation CTA */}
      <section className="bg-gold-gradient rounded-[3rem] p-12 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-4xl font-serif font-bold leading-tight">Need a Private <br/> Mechanical Audit?</h3>
          <p className="font-medium opacity-80 max-w-sm">Connect directly with Alex for a personalized biomechanical swing analysis.</p>
        </div>
        <button className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center gap-3">
          <MessageCircle size={18} /> Start Consultation
        </button>
      </section>
    </div>
  );
};

export default MediaCenter;
