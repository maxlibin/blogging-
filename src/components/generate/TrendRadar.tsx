import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';
import { ResearchResult } from '../../types';

interface TrendRadarProps {
  researchData: ResearchResult;
}

export function TrendRadar({ researchData }: TrendRadarProps) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-500">
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trend Radar</h3>
        <BarChart2 size={14} className="text-slate-400" />
      </div>
      <CardContent className="p-6 space-y-6">
        {/* Sentiment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Market Sentiment</span>
            <Badge 
              variant={
                researchData.trendAnalysis.sentiment === 'positive' ? 'success' : 
                researchData.trendAnalysis.sentiment === 'negative' ? 'destructive' : 
                'secondary'
              } 
              className="text-[10px] px-2 py-0 h-5"
            >
              {researchData.trendAnalysis.sentiment}
            </Badge>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all duration-1000 ease-out", 
              researchData.trendAnalysis.sentiment === 'positive' ? "bg-green-500 w-[85%]" :
              researchData.trendAnalysis.sentiment === 'negative' ? "bg-red-500 w-[25%]" : 
              "bg-slate-400 w-[50%]"
            )} />
          </div>
        </div>

        {/* Key Events */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-500">Key Events & Signals</span>
          <div className="space-y-2">
            {researchData.trendAnalysis.key_events.slice(0, 3).map((event, i) => (
              <div key={i} className="flex gap-2 items-start p-2 bg-slate-50 rounded-md border border-slate-100">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <p className="text-xs text-slate-700 leading-relaxed">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
