import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, Image, MessageSquare, Pin, Reply, Smile } from 'lucide-react';
import io from 'socket.io-client';

export const Chat = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/chat/history', { 
      headers: { 'Authorization': `Bearer ${token}` } 
    })
    .then(res => res.json())
    .then(setMessages);

    socketRef.current = io(window.location.origin);
    socketRef.current.on('new-message', (msg: any) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [token]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    socketRef.current.emit('send-message', {
      user_id: user.id,
      message: input,
      type: 'text'
    });
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-background">
      <div className="glass p-6 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-primary" />
          <h2 className="text-xl font-bold">CHAT GLOBAL</h2>
        </div>
        <div className="text-xs text-white/40">{messages.length} messages</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.user_id === user?.id ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center font-bold text-primary">
              {msg.username[0].toUpperCase()}
            </div>
            <div className={`max-w-[70%] ${msg.user_id === user?.id ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-1 justify-end flex-row-reverse">
                <span className="text-sm font-bold">{msg.username}</span>
                <span className="text-[10px] text-white/20">{new Date(msg.created_at).toLocaleTimeString()}</span>
              </div>
              <div className={`p-4 rounded-2xl inline-block ${msg.user_id === user?.id ? 'bg-primary text-black rounded-tr-none' : 'glass rounded-tl-none'}`}>
                {msg.message}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="p-6 glass border-t border-white/5">
        <form onSubmit={sendMessage} className="flex gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-white/20">
              <Smile size={18} className="hover:text-primary cursor-pointer" />
              <Image size={18} className="hover:text-primary cursor-pointer" />
            </div>
          </div>
          <button type="submit" className="btn-gold px-4 py-3">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
