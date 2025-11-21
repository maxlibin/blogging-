
"use client";

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PenTool, Settings, LogOut, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useWordPress } from '../contexts/WordPressContext';

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void;
  showLabels?: boolean;
}

// Simple internal Tooltip component for the sidebar
const SidebarItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  onClick, 
  showLabel 
}: { 
  to: string; 
  icon: any; 
  label: string; 
  isActive: boolean; 
  onClick?: () => void;
  showLabel: boolean;
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={cn(
        "group relative flex items-center transition-all duration-200 rounded-xl",
        showLabel 
          ? "gap-3 px-4 py-3 w-full" 
          : "justify-center w-12 h-12",
        isActive 
          ? "bg-purple-50 text-purple-600" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      
      {showLabel && (
        <span className="font-semibold text-sm">{label}</span>
      )}

      {/* Tooltip for Icon-only mode */}
      {!showLabel && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 z-50 whitespace-nowrap shadow-xl">
          {label}
          {/* Little arrow pointing left */}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ className, onLinkClick, showLabels = false }) => {
  const { settings, isLoaded } = useWordPress();

  const links = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/generate', icon: PenTool, label: 'AI Writer' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={cn(
      "flex flex-col bg-white/80 backdrop-blur-xl border-r border-slate-100 h-full transition-all duration-300",
      showLabels ? "w-72" : "w-24 items-center", 
      className
    )}>
      {/* Logo Section */}
      <div className={cn("h-24 flex items-center", showLabels ? "px-8" : "justify-center")}>
        <NavLink to="/" className="flex items-center gap-2 text-slate-900 group">
           <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-xl transform transition-transform group-hover:rotate-3 shadow-lg shadow-purple-200">
             <div className="w-3 h-3 bg-white rounded-full" />
           </div>
           {showLabels && (
             <span className="text-xl font-bold tracking-tight animate-in fade-in duration-300">
               Ai<span className="text-purple-600">Writer</span>
             </span>
           )}
        </NavLink>
      </div>
      
      {/* Navigation */}
      <nav className={cn("flex-1 space-y-4 py-4", showLabels ? "px-4" : "px-0 w-full flex flex-col items-center")}>
        {links.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) => {
                // We use a render prop to pass isActive state to our custom component
                return "block"; 
            }}
          >
            {({ isActive }) => (
               <SidebarItem 
                 to={link.href}
                 icon={link.icon}
                 label={link.label}
                 isActive={isActive}
                 onClick={onLinkClick}
                 showLabel={showLabels}
               />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className={cn("pb-8 space-y-6", showLabels ? "px-6" : "px-0 w-full flex flex-col items-center")}>
         
         {/* Pro Trigger */}
         {showLabels ? (
            <div className="bg-slate-900 rounded-xl p-5 text-white relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
               <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-xl -mr-10 -mt-10"></div>
               <div className="flex items-center gap-2 mb-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                 <Zap size={12} fill="currentColor" /> Pro Plan
               </div>
               <p className="text-sm font-medium mb-3 text-slate-200">Upgrade to unlock unlimited generations.</p>
            </div>
         ) : (
            <div className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer">
               <Zap size={20} fill="currentColor" />
               <div className="absolute left-full ml-4 px-3 py-1.5 bg-purple-900 text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 z-50 whitespace-nowrap shadow-xl">
                  Upgrade to Pro
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-purple-900 rotate-45"></div>
               </div>
            </div>
         )}

         {/* Connection Status / Profile */}
         <div className={cn("pt-4 border-t border-slate-100", showLabels ? "w-full" : "w-12 border-t-0 pt-0 flex justify-center")}>
            {isLoaded && (
               <div 
                 className={cn("flex items-center gap-2 mb-4", showLabels ? "px-2" : "justify-center")}
                 title={settings.isConnected ? "WordPress Connected" : "Offline Mode"}
               >
                 {settings.isConnected ? (
                    showLabels ? (
                        <>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-medium text-slate-500">Connected</span>
                        </>
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    )
                 ) : (
                    showLabels ? (
                        <>
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <span className="text-xs font-medium text-slate-400">Offline</span>
                        </>
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    )
                 )}
               </div>
            )}
            
            <NavLink 
               to="/" 
               className={cn(
                  "flex items-center transition-colors", 
                  showLabels 
                     ? "gap-2 text-slate-400 hover:text-slate-600 text-xs px-2 font-medium" 
                     : "justify-center text-slate-400 hover:text-red-500 w-12 h-12 hover:bg-red-50 rounded-xl"
               )}
               title="Sign Out"
            >
                <LogOut size={18} />
                {showLabels && <span>Sign Out</span>}
            </NavLink>
         </div>
      </div>
    </aside>
  );
};
