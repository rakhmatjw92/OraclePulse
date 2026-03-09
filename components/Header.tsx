
import React from 'react';
import type { ConnectionDetails } from '../types';
import { DatabaseIcon } from '../constants';

interface HeaderProps {
  isConnected: boolean;
  connectionDetails: ConnectionDetails | null;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ isConnected, connectionDetails, onDisconnect }) => {
  return (
    <header className="flex items-center justify-between pb-4 border-b border-red-500/30">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 flex items-center justify-center bg-red-900/50 border-2 border-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]">
          <DatabaseIcon className="w-6 h-6 text-red-400" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-orbitron font-bold text-white tracking-widest uppercase" style={{ textShadow: '0 0 8px rgba(239, 68, 68, 0.7)' }}>
          Oracle Pulse
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.7)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]'}`}></div>
          <span className="hidden sm:block text-sm font-semibold uppercase tracking-wider">{isConnected ? `Connected: ${connectionDetails?.user}@${connectionDetails?.host}` : 'Disconnected'}</span>
        </div>
        {isConnected && (
          <button
            onClick={onDisconnect}
            className="px-4 py-2 text-xs font-bold text-red-400 uppercase bg-red-900/50 border border-red-500/50 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-red-500/50"
          >
            Disconnect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
