"use client";

import React, { useState } from 'react';
import { Menu, X, PenTool } from 'lucide-react';
import { Button } from './ui/button';
import { Sidebar } from './Sidebar';

export const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2 text-slate-900">
          <div className="bg-slate-900 text-white p-1.5 rounded-md">
            <PenTool className="w-4 h-4" />
          </div>
          <span className="text-base font-bold">AutoBlog Pilot</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar className="h-full shadow-xl" onLinkClick={() => setIsOpen(false)} />
      </div>
    </>
  );
};