import React from 'react';
import { Search } from 'lucide-react';

interface ResearchingLoaderProps {
  topic: string;
}

export function ResearchingLoader({ topic }: ResearchingLoaderProps) {
  return (
    <div className="p-12 min-h-[500px] flex flex-col justify-center items-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search size={24} className="text-purple-600" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-2">Analyzing the web for "{topic}"</h3>
      <p className="text-slate-500 animate-pulse">Reading latest news • Identifying trends • Checking sources</p>
    </div>
  );
}
