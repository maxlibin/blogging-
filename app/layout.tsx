import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { WordPressProvider } from '../contexts/WordPressContext';
import { Sidebar } from '../components/Sidebar';
import { MobileHeader } from '../components/MobileHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AutoBlog Pilot',
  description: 'AI Blog Writer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50/50 min-h-screen font-sans text-slate-900`}>
        <WordPressProvider>
          <div className="flex w-full min-h-screen overflow-hidden">
             <Sidebar className="hidden md:flex z-20" />
             <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <MobileHeader />
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                  <div className="max-w-7xl mx-auto">
                    {children}
                  </div>
                </main>
             </div>
          </div>
        </WordPressProvider>
      </body>
    </html>
  );
}