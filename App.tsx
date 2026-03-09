
import React, { useState } from 'react';
import ConnectionModal from './components/ConnectionModal';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import type { ConnectionDetails, Session } from './types';

const SESSION_COLORS = [
  '#ef4444', // red
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
];

const App: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const handleConnect = (details: ConnectionDetails) => {
    const newSession: Session = {
      id: Math.random().toString(36).substring(2, 9),
      details,
      color: SESSION_COLORS[sessions.length % SESSION_COLORS.length],
    };
    setSessions([...sessions, newSession]);
    setActiveSessionId(newSession.id);
  };

  const handleSessionSelect = (id: string) => {
    setActiveSessionId(id);
  };

  const handleNewSession = () => {
    setActiveSessionId(null);
  };

  const handleCloseSession = (id: string) => {
    const updatedSessions = sessions.filter(s => s.id !== id);
    setSessions(updatedSessions);
    if (activeSessionId === id) {
      setActiveSessionId(updatedSessions.length > 0 ? updatedSessions[updatedSessions.length - 1].id : null);
    }
  };

  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="bg-black min-h-screen text-gray-200 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDAsIDAsIDAuMDUpIi8+PC9zdmc+')] opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <Header 
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSessionSelect={handleSessionSelect}
          onNewSession={handleNewSession}
          onCloseSession={handleCloseSession}
        />
        <main className="flex-grow mt-6">
          {!activeSessionId ? (
            <ConnectionModal onConnect={handleConnect} />
          ) : activeSession ? (
            <Dashboard key={activeSession.id} session={activeSession} />
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default App;
