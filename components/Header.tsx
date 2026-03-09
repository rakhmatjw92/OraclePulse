
import React from 'react';
import type { Session } from '../types';
import { DatabaseIcon } from '../constants';

interface HeaderProps {
  sessions: Session[];
  activeSessionId: string | null;
  onSessionSelect: (id: string) => void;
  onNewSession: () => void;
  onCloseSession: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ sessions, activeSessionId, onSessionSelect, onNewSession, onCloseSession }) => {
  return (
    <header className="flex flex-col space-y-4 pb-4 border-b border-red-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center bg-red-900/50 border-2 border-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]">
            <DatabaseIcon className="w-6 h-6 text-red-400" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-orbitron font-bold text-white tracking-widest uppercase" style={{ textShadow: '0 0 8px rgba(239, 68, 68, 0.7)' }}>
            Oracle Pulse
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onNewSession}
            className="px-4 py-2 text-xs font-bold text-red-400 uppercase bg-red-900/50 border border-red-500/50 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-red-500/50"
          >
            + New Session
          </button>
        </div>
      </div>
      
      {sessions.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-red-500/50 scrollbar-track-black">
          {sessions.map(session => (
            <div 
              key={session.id}
              onClick={() => onSessionSelect(session.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-md cursor-pointer border-t-2 border-l-2 border-r-2 transition-all duration-200 ${
                activeSessionId === session.id 
                  ? 'bg-gray-900 text-white shadow-[0_-4px_10px_rgba(0,0,0,0.5)]' 
                  : 'bg-black text-gray-400 hover:bg-gray-900/50 border-transparent'
              }`}
              style={{ borderColor: activeSessionId === session.id ? session.color : 'transparent' }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: session.color, boxShadow: `0 0 8px ${session.color}` }}></div>
              <span className="text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                {session.details.user}@{session.details.host}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); onCloseSession(session.id); }}
                className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
