
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './app/layout'; // This is now the dashboard layout
import DashboardPage from './app/page';
import GeneratePage from './app/generate/page';
import SettingsPage from './app/settings/page';
import LandingPage from './app/landing/page';
import { WordPressProvider } from './contexts/WordPressContext';
import './app/globals.css'; 

const App: React.FC = () => {
  return (
    <WordPressProvider>
      <Router>
        <Routes>
          {/* Landing Page (No Layout) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* App Pages (With Layout) */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          } />
          
          <Route path="/generate" element={
            <DashboardLayout>
              <GeneratePage />
            </DashboardLayout>
          } />
          
          <Route path="/settings" element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </WordPressProvider>
  );
};

export default App;
