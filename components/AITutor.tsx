import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ExternalLink, Bot } from 'lucide-react';
import { Button } from './ui/Button';
import { generateAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { clsx } from 'clsx';

export const AITutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      text: "Hi! I'm your Monday.com AI Tutor. Ask me anything about boards, automations, or the API!",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await generateAIResponse(userMsg.text, messages);
    
    setMessages(prev => [...prev, response]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all hover:scale-105",
          "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
          isOpen && "hidden"
        )}
      >
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <span className="font-medium hidden sm:inline">Ask AI Tutor</span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-indigo-600 rounded-t-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-semibold">Monday.com AI Tutor</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={clsx(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={clsx(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                    msg.role === 'user'
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                  
                  {/* Sources rendering */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs font-semibold mb-1 opacity-70">Sources:</p>
                      <ul className="space-y-1">
                        {msg.sources.map((source, sIdx) => (
                          <li key={sIdx}>
                            <a 
                              href={source.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs underline hover:no-underline opacity-80 hover:opacity-100"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {source.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 rounded-b-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about API, automations..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <Button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="rounded-xl w-10 h-10 p-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="mt-2 text-center">
                <p className="text-[10px] text-slate-400">
                   Powered by Gemini 2.5 Flash • Answers may vary
                </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
