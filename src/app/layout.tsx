import React from 'react';
import './globals.css';
import { WordPressProvider } from '../contexts/WordPressContext';

export const metadata = {
  title: 'AiWriter',
  description: 'AI Writing Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <WordPressProvider>
          {children}
        </WordPressProvider>
      </body>
    </html>
  );
}