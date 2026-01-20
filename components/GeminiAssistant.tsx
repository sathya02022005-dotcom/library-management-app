
import React, { useState } from 'react';
import { getBookRecommendation } from '../services/geminiService';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';

const GeminiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);
    const rec = await getBookRecommendation(input);
    setResponse(rec);
    setLoading(false);
  };

  return (
    <div className="glass-dark rounded-3xl p-6 md:p-8 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
          <Bot className="text-slate-900" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Lumina AI Assistant</h2>
          <p className="text-sm text-slate-400">Personalized recommendations for your mood</p>
        </div>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleAsk} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what you feel like reading today..."
            className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          />
          <button 
            type="submit"
            disabled={loading || !input}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-amber-500 text-slate-900 rounded-xl flex items-center justify-center hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>

        <div className="min-h-[100px] flex items-center justify-center relative">
          {loading && (
            <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
              <Sparkles className="text-amber-500" />
              <p className="text-sm italic">Curating your perfect list...</p>
            </div>
          )}
          
          {response && !loading && (
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{response}</p>
            </div>
          )}

          {!loading && !response && (
            <div className="text-center text-slate-500 max-w-sm px-4">
              <p className="text-sm">Try saying: "I want a mystery novel set in London" or "Something uplifting to read on a rainy day"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
