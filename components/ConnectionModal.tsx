
import React, { useState } from 'react';
import type { ConnectionDetails } from '../types';
import { PowerIcon } from '../constants';

interface ConnectionModalProps {
  onConnect: (details: ConnectionDetails) => void;
}

const ConnectionModal: React.FC<ConnectionModalProps> = ({ onConnect }) => {
  const [details, setDetails] = useState({
    host: 'localhost',
    port: 1521,
    serviceName: 'ORCLPDB1',
    user: 'system',
    password: '',
  });
  const [error, setError] = useState('');

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
    const { password, ...connectionInfo } = details;
    onConnect(connectionInfo);
  };

  const InputField: React.FC<{ label: string; name: string; type: string; value: string | number; placeholder?: string }> = ({ label, name, type, value, placeholder }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-red-400 uppercase tracking-wider mb-2">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-gray-900/50 border-2 border-gray-700 focus:border-red-500 focus:ring-0 text-white rounded-md px-3 py-2 transition-all duration-300 placeholder-gray-500 shadow-inner"
        required
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 bg-black/60 border-2 border-red-500/30 rounded-lg shadow-2xl shadow-red-900/50 backdrop-blur-sm">
        <h2 className="text-3xl font-orbitron text-center text-white mb-2">Establish Connection</h2>
        <p className="text-center text-gray-400 mb-8">Configure database access credentials.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Host" name="host" type="text" value={details.host} />
          <InputField label="Port" name="port" type="number" value={details.port} />
          <InputField label="Service Name" name="serviceName" type="text" value={details.serviceName} />
          <InputField label="User" name="user" type="text" value={details.user} />
          <InputField label="Password" name="password" type="password" value={details.password} placeholder="••••••••" />

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
