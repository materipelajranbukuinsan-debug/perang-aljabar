import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/game';
import { Send, MessageSquare, ChevronUp, ChevronDown, Bell, Zap } from 'lucide-react';

interface ChatOverlayProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  myPlayerId: string;
}

export const ChatOverlay: React.FC<ChatOverlayProps> = ({
  messages,
  onSendMessage,
  myPlayerId
}) => {
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const QUICK_CHATS = [
    'Awas Virus di dekatmu! 🦠',
    'Ada yang mau bantu SPLDV?',
    'Aljabar seru sekali! 📐',
    'Butuh peluru AK-47!',
    'GG Semuanya! 🎯',
    'Kejar Berlian Biru!'
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickChat = (text: string) => {
    onSendMessage(text);
  };

  return (
    <div className={`fixed bottom-2 sm:bottom-4 left-2 sm:left-4 z-40 transition-all duration-300 ${
      isExpanded ? 'w-80 sm:w-96' : 'w-72 sm:w-80'
    }`}>
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 border-b border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-cyan-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Global & Notifikasi Room</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:text-white transition-colors cursor-pointer text-slate-400"
            title={isExpanded ? 'Kecilkan Chat' : 'Perbesar Chat'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Message List */}
        <div
          ref={scrollRef}
          className={`overflow-y-auto p-2.5 space-y-1.5 text-xs transition-all ${
            isExpanded ? 'h-48' : 'h-24'
          }`}
        >
          {messages.length === 0 ? (
            <div className="text-slate-500 italic text-center py-4 text-[11px]">
              Belum ada percakapan. Sapa pemain lain di arena!
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === myPlayerId;

              if (msg.type === 'win') {
                return (
                  <div key={msg.id} className="p-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-amber-400/50 rounded-lg text-amber-300 text-[11px] font-semibold animate-pulse">
                    🏆 {msg.text}
                  </div>
                );
              }

              if (msg.type === 'kill') {
                return (
                  <div key={msg.id} className="px-2 py-1 bg-rose-950/50 border border-rose-800/50 rounded text-rose-300 text-[11px]">
                    {msg.text}
                  </div>
                );
              }

              if (msg.type === 'mission') {
                return (
                  <div key={msg.id} className="px-2 py-1 bg-cyan-950/60 border border-cyan-700/50 rounded text-cyan-300 text-[11px] font-medium">
                    {msg.text}
                  </div>
                );
              }

              if (msg.type === 'join' || msg.type === 'leave') {
                return (
                  <div key={msg.id} className="px-2 py-0.5 text-[10px] text-slate-400 italic">
                    {msg.text}
                  </div>
                );
              }

              return (
                <div key={msg.id} className="leading-snug break-words">
                  <span className={`font-semibold ${isMe ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {msg.senderName}:{' '}
                  </span>
                  <span className="text-slate-200">{msg.text}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Chat Buttons (when expanded) */}
        {isExpanded && (
          <div className="flex flex-wrap gap-1 px-2.5 py-1.5 bg-slate-800/50 border-t border-slate-700/50">
            {QUICK_CHATS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickChat(q)}
                className="px-2 py-0.5 text-[10px] bg-slate-700/60 hover:bg-cyan-600/40 text-slate-300 rounded transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5 p-2 bg-slate-800/90 border-t border-slate-700/80">
          <input
            type="text"
            value={inputText}
            maxLength={120}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ketik pesan global..."
            className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Kirim Pesan"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
