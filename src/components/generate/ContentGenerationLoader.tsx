import React from 'react';
import { Edit3, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PostStatus, SuggestedTopic } from '../../types';

interface ContentGenerationLoaderProps {
  selectedTopic: SuggestedTopic;
  status: PostStatus;
}

export function ContentGenerationLoader({ selectedTopic, status }: ContentGenerationLoaderProps) {
  const isGeneratingImage = status === PostStatus.GENERATING_IMAGE;
  const progress = isGeneratingImage ? 40 : 85;
  const statusText = isGeneratingImage 
    ? "Designing custom featured image..." 
    : "Drafting final paragraphs...";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 min-h-[500px] flex flex-col justify-center items-center text-center">
      <div className="relative mb-8">
        {/* Overlapping avatars for agents */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center text-purple-600 overflow-hidden relative">
            <div className="absolute inset-0 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
            <Edit3 size={24} />
          </div>
          <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-lg z-10 -ml-6 flex items-center justify-center text-orange-500 overflow-hidden relative">
            <div className="absolute inset-0 border-4 border-orange-100 border-b-orange-500 rounded-full animate-spin"></div>
            <ImageIcon size={24} />
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Creating content for <br/>
        <span className="text-purple-600">"{selectedTopic.title}"</span>
      </h3>
      
      <div className="space-y-2 mt-6 max-w-md">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full bg-purple-600 rounded-full transition-all duration-[2000ms]", 
              `w-[${progress}%]`
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-500 pt-2">
          {statusText}
        </p>
      </div>
    </div>
  );
}
