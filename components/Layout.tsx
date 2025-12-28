
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, PlusCircle, 
  Briefcase, Video, MessageSquareText
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Master', path: '/' },
    { icon: <Video size={20} />, label: 'Media', path: '/media' },
    { icon: <PlusCircle size={32} />, label: 'Round', path: '/new-round', highlight: true },
    { icon: <MessageSquareText size={20} />, label: 'Chat', path: '/chat' },
    { icon: <Briefcase size={20} />, label: 'Pro OS', path: '/pro' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Refined Navigation Header */}
      <header className="sticky top-0 z-50 glass border-b border-black/5 px-10 py-5 flex justify-between items-center shadow-sm">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-900 flex items-center justify-center text-white font-bold text-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">T</div>
          <h1 className="text-xl font-serif font-bold tracking-tight text-slate-900">
            TEEUP <span className="font-light text-amber-600">PRO</span>
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link to="/membership" className="hover:text-emerald-900 transition-colors">Elite Tiers</Link>
            <Link to="/consult" className="hover:text-emerald-900 transition-colors">Private Inquiry</Link>
          </nav>
          <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-emerald-900/10 p-0.5 hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-emerald-900 text-xs font-bold">AR</div>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 pb-32">
        {children}
      </main>

      {/* Floating Tab Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit glass border border-black/10 rounded-full px-8 py-4 z-50 shadow-2xl">
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                location.pathname === item.path
                  ? 'text-emerald-900 scale-110'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={item.highlight ? 'bg-emerald-900 p-2.5 rounded-full -mt-2 shadow-xl text-white' : ''}>
                {item.icon}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Decorative Accents */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40 z-[-1] overflow-hidden">
         <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-200/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[150px]"></div>
      </div>
    </div>
  );
};

export default Layout;
