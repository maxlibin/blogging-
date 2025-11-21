import React from 'react';
import { Search, LayoutTemplate, Edit3, Circle, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface ThinkingStep {
  id: string;
  label: string;
  status: 'waiting' | 'processing' | 'completed' | 'error';
  icon?: React.ElementType;
}

interface ProcessStepperProps {
  steps: ThinkingStep[];
}

export function ProcessStepper({ steps }: ProcessStepperProps) {
  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Process</h3>
        <div className="space-y-0 relative">
          {/* Connecting line background */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-100 z-0" />
          
          {steps.map((step, index) => {
            const Icon = step.icon || Circle;
            const isActive = step.status === 'processing';
            const isCompleted = step.status === 'completed';
            const isWaiting = step.status === 'waiting';
            
            return (
              <div key={step.id} className="relative z-10 flex items-start gap-4 pb-8 last:pb-0 group">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300 bg-white", 
                  isCompleted ? "border-green-500 text-green-600" :
                  isActive ? "border-purple-500 text-purple-600 shadow-[0_0_0_4px_rgba(168,85,247,0.1)]" :
                  step.status === 'error' ? "border-red-200 text-red-500" :
                  "border-slate-100 text-slate-300"
                )}>
                  {isCompleted ? <CheckCircle2 size={18} strokeWidth={2.5} /> : 
                   isActive ? <Loader2 size={20} className="animate-spin" /> : 
                   <Icon size={18} />}
                </div>
                <div className="pt-2">
                  <h4 className={cn("font-bold text-sm leading-none", isActive ? "text-purple-900" : isCompleted ? "text-slate-900" : "text-slate-400")}>
                    {step.label}
                  </h4>
                  {isActive && (
                    <p className="text-[11px] text-purple-500 font-medium mt-1.5 animate-pulse">
                      {step.id === 'research' ? 'Scanning...' : step.id === 'production' ? 'Drafting...' : 'Thinking...'}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
