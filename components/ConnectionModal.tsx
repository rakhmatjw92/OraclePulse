
import React, { useState, useEffect } from 'react';
import type { ConnectionDetails, SavedConnection } from '../types';
import { PowerIcon, DatabaseIcon } from '../constants';

interface ConnectionModalProps {
  onConnect: (details: ConnectionDetails) => void;
}

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, placeholder, onChange, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-red-400 uppercase tracking-wider mb-2">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-gray-900/50 border-2 border-gray-700 focus:border-red-500 focus:ring-0 text-white rounded-md px-3 py-2 transition-all duration-300 placeholder-gray-500 shadow-inner"
      required={required}
    />
  </div>
);

const ConnectionModal: React.FC<ConnectionModalProps> = ({ onConnect }) => {
  const [details, setDetails] = useState({
    host: 'localhost',
    port: 1521,
    serviceName: 'ORCLPDB1',
    user: 'system',
    password: '',
  });
  const [error, setError] = useState('');
  const [savedConnections, setSavedConnections] = useState<SavedConnection[]>([]);
  const [saveName, setSaveName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('oraclePulseConnections');
    if (saved) {
      try {
        setSavedConnections(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved connections');
      }
    }
  }, []);

  const saveConnectionsToStorage = (connections: SavedConnection[]) => {
    localStorage.setItem('oraclePulseConnections', JSON.stringify(connections));
    setSavedConnections(connections);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: name === 'port' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.host || !details.port || !details.serviceName || !details.user || !details.password) {
      setError('All fields are required.');
      return;
    }
    setError('');
    
    if (isSaving && saveName) {
      const newSaved: SavedConnection = {
        id: Math.random().toString(36).substring(2, 9),
        name: saveName,
        host: details.host,
        port: details.port,
        serviceName: details.serviceName,
        user: details.user,
      };
      saveConnectionsToStorage([...savedConnections, newSaved]);
    }

    const { password, ...connectionInfo } = details;
    onConnect(connectionInfo);
  };

  const loadSavedConnection = (conn: SavedConnection) => {
    setDetails(prev => ({
      ...prev,
      host: conn.host,
      port: conn.port,
      serviceName: conn.serviceName,
      user: conn.user,
    }));
  };

  const deleteSavedConnection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    saveConnectionsToStorage(savedConnections.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch justify-center h-full gap-6 max-w-5xl mx-auto">
      {savedConnections.length > 0 && (
        <div className="w-full md:w-1/3 p-6 bg-black/60 border-2 border-gray-700 rounded-lg shadow-xl backdrop-blur-sm flex flex-col">
          <h3 className="text-xl font-orbitron text-white mb-4 border-b border-gray-700 pb-2">Saved Sessions</h3>
          <div className="flex-grow overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {savedConnections.map(conn => (
              <div 
                key={conn.id}
                onClick={() => loadSavedConnection(conn)}
                className="p-3 bg-gray-900/50 border border-gray-600 rounded-md cursor-pointer hover:border-red-500 hover:bg-gray-800 transition-all group relative"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white truncate pr-6">{conn.name}</span>
                  <button 
                    onClick={(e) => deleteSavedConnection(conn.id, e)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete saved session"
                  >
                    &times;
                  </button>
                </div>
                <div className="text-xs text-gray-400 flex items-center mt-1">
                  <DatabaseIcon className="w-3 h-3 mr-1" />
                  <span className="truncate">{conn.user}@{conn.host}:{conn.port}/{conn.serviceName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-md p-8 bg-black/60 border-2 border-red-500/30 rounded-lg shadow-2xl shadow-red-900/50 backdrop-blur-sm">
        <h2 className="text-3xl font-orbitron text-center text-white mb-2">Establish Connection</h2>
        <p className="text-center text-gray-400 mb-8">Configure database access credentials.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Host" name="host" type="text" value={details.host} onChange={handleChange} required />
          <InputField label="Port" name="port" type="number" value={details.port} onChange={handleChange} required />
          <InputField label="Service Name" name="serviceName" type="text" value={details.serviceName} onChange={handleChange} required />
          <InputField label="User" name="user" type="text" value={details.user} onChange={handleChange} required />
          <InputField label="Password" name="password" type="password" value={details.password} placeholder="••••••••" onChange={handleChange} required={!isSaving} />

          <div className="flex items-center space-x-2 mt-4">
            <input 
              type="checkbox" 
              id="saveSession" 
              checked={isSaving} 
              onChange={(e) => setIsSaving(e.target.checked)}
              className="w-4 h-4 text-red-600 bg-gray-900 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
            />
            <label htmlFor="saveSession" className="text-sm text-gray-300">Save session for later</label>
          </div>

          {isSaving && (
            <div className="mt-2">
              <input
                type="text"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Session Name (e.g., Prod DB)"
                className="w-full bg-gray-900/50 border border-gray-700 focus:border-red-500 focus:ring-0 text-white rounded-md px-3 py-2 text-sm transition-all"
                required={isSaving}
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 font-bold text-lg text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] space-x-2"
          >
            <PowerIcon className="w-6 h-6" />
            <span>Connect</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConnectionModal;
