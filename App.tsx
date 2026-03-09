
import React, { useState } from 'react';
import ConnectionModal from './components/ConnectionModal';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import type { ConnectionDetails } from './types';

const App: React.FC = () => {
  const [connection, setConnection] = useState<ConnectionDetails | null>(null);

  const handleConnect = (details: ConnectionDetails) => {
    setConnection(details);
  };

  const handleDisconnect = () => {
    setConnection(null);
  };

  return (
    <div className="bg-black min-h-screen text-gray-200 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDAsIDAsIDAuMDUpIi8+PC9zdmc+')] opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <Header 
          isConnected={!!connection} 
          connectionDetails={connection} 
          onDisconnect={handleDisconnect} 
        />
        <main className="flex-grow mt-6">
          {!connection ? (
            <ConnectionModal onConnect={handleConnect} />
          ) : (
            <Dashboard />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
