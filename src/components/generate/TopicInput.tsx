import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TopicInputProps {
  broadTopic: string;
  onTopicChange: (topic: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SUGGESTED_TOPICS = ['Crypto Trends', 'Healthy Living', 'SaaS Growth', 'Remote Work'];

export function TopicInput({ broadTopic, onTopicChange, onSubmit }: TopicInputProps) {
  return (
    <div className="p-8 md:p-12 text-center space-y-8 min-h-[500px] flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">What's your niche?</h2>
        <p className="text-slate-500 text-lg">
          Enter a broad topic (e.g., "Sustainable Fashion" or "AI in Marketing") and let our agents research trends for you.
        </p>
      </div>
      
      <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto relative">
        <Input 
          value={broadTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="Enter a topic..."
          className="h-14 text-lg pl-6 pr-14 rounded-xl shadow-md border-slate-200 focus:border-purple-500"
          autoFocus
        />
        <Button 
          type="submit" 
          disabled={!broadTopic}
          className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg bg-purple-600 hover:bg-purple-700"
        >
          <ArrowRight size={20} />
        </Button>
      </form>

      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {SUGGESTED_TOPICS.map(t => (
          <button 
            key={t} 
            onClick={() => onTopicChange(t)} 
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm rounded-full border border-slate-200 transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
