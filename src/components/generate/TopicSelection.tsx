import React from 'react';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { Badge } from '../ui/badge';
import { SuggestedTopic } from '../../types';

interface TopicSelectionProps {
  topics: SuggestedTopic[];
  onSelectTopic: (topic: SuggestedTopic) => void;
  onRefine: () => void;
}

export function TopicSelection({ topics, onSelectTopic, onRefine }: TopicSelectionProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Suggested Strategies</h2>
        <Badge variant="secondary" className="h-8 px-3 text-sm">Select a topic to generate</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, idx) => (
          <div 
            key={idx}
            onClick={() => onSelectTopic(topic)}
            className="group relative bg-white rounded-xl border border-slate-200 p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 flex flex-col h-full"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-md">
                <ArrowRight size={16} />
              </div>
            </div>
            
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-md mb-3">
                Option {idx + 1}
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-purple-700 transition-colors">
                {topic.title}
              </h3>
            </div>
            
            <p className="text-sm text-slate-500 leading-relaxed flex-1">
              {topic.rationale}
            </p>
            
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2 text-xs font-medium text-slate-400 group-hover:text-purple-600">
              <MousePointerClick size={14} />
              Click to write this article
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
        <p className="text-sm text-slate-500">
          Don't like these? <button onClick={onRefine} className="text-purple-600 font-bold hover:underline">Refine your topic</button>
        </p>
      </div>
    </div>
  );
}
