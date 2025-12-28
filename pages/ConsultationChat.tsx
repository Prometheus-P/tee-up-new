
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, RefreshCw, Award, Loader2 } from 'lucide-react';
import { getConsultationChat } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ConsultationChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the inner circle. I am Alex Rivera. How can I refine your strategy today, Champ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ballAction, setBallAction] = useState<'none' | 'user-putt' | 'master-chip'>('none');
  
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = getConsultationChat();
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setBallAction('user-putt');
    
    // Animation delay
    setTimeout(async () => {
      setMessages(prev => [...prev, { role: 'user', text: userText }]);
      setBallAction('none');
      setIsTyping(true);

      try {
        const stream = await chatRef.current.sendMessageStream({ message: userText });
        setBallAction('master-chip');
        setMessages(prev => [...prev, { role: 'model', text: '' }]);
        let fullText = '';

        for await (const chunk of stream) {
          fullText += (chunk.text || '');
          setMessages(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, text: fullText }];
          });
        }
      } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Apologies, the connection is in the rough. Let's try again." }]);
      } finally {
        setIsTyping(false);
        setBallAction('none');
      }
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto h-[82vh] flex flex-col glass border border-white/40 rounded-[3rem] overflow-hidden shadow-2xl relative bg-white/30">
      
      {/* Interactive Ball Layer */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        {ballAction === 'user-putt' && (
          <div className="absolute bottom-24 right-24 animate-putt">
            <div className="w-6 h-6 bg-white rounded-full shadow-lg border border-slate-300">
               <div className="w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] bg-[length:3px_3px]"></div>
            </div>
          </div>
        )}
        {ballAction === 'master-chip' && (
          <div className="absolute top-24 left-24 animate-chip">
            <div className="w-8 h-8 bg-white rounded-full shadow-xl border border-slate-300">
               <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_#000_1.5px,_transparent_1.5px)] bg-[length:5px_5px]"></div>
            </div>
          </div>
        )}
      </div>

      <header className="p-8 border-b border-black/5 flex items-center justify-between bg-white/40 backdrop-blur-md">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gold-gradient p-0.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-emerald-900">
                <Bot size={28} />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="font-serif font-bold text-2xl text-slate-900">Alex Rivera</h3>
            <p className="text-[10px] text-amber-600 uppercase font-bold tracking-[0.2em]">PGA Master Pro</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-3 hover:bg-black/5 rounded-full transition-all text-slate-400 hover:text-amber-600">
          <RefreshCw size={20} />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`group relative max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
            }`}>
              {msg.text || (isTyping && i === messages.length - 1 ? <Loader2 className="animate-spin text-amber-500" size={16} /> : '')}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-white/50 border-t border-black/5">
        <div className="relative max-w-3xl mx-auto">
          <input 
            type="text" 
            placeholder="Discuss your mechanics or mental game..."
            className="w-full bg-white border border-slate-200 rounded-full py-5 px-8 pr-20 text-sm outline-none focus:border-emerald-900/30 transition-all placeholder:text-slate-400 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-900 text-white rounded-full flex items-center justify-center hover:bg-emerald-800 transition-all disabled:opacity-30 shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes putt {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(-300px, -500px) scale(0.5) rotate(720deg); opacity: 0; }
        }
        @keyframes chip {
          0% { transform: translate(0, 0) scale(0.5) rotate(0deg); opacity: 0; }
          30% { transform: translate(150px, -150px) scale(1.6) rotate(180deg); opacity: 1; }
          100% { transform: translate(500px, 400px) scale(1) rotate(360deg); opacity: 0; }
        }
        .animate-putt { animation: putt 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-chip { animation: chip 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default ConsultationChat;
