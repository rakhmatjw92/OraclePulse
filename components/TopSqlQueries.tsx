
import React from 'react';
import type { SqlQuery } from '../types';
import { CodeIcon } from '../constants';

interface TopSqlQueriesProps {
  queries: SqlQuery[];
  color?: string;
}

const TopSqlQueries: React.FC<TopSqlQueriesProps> = ({ queries, color = '#ef4444' }) => {
  return (
    <div className="bg-gray-900/50 border p-4 rounded-lg shadow-lg backdrop-blur-sm" style={{ borderColor: `${color}33`, boxShadow: `0 10px 15px -3px ${color}33` }}>
      <div className="flex items-center mb-4">
        <CodeIcon className="w-5 h-5 mr-2" style={{ color }} />
        <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color }}>Top SQL by CPU Time</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b text-gray-400 uppercase" style={{ borderColor: `${color}33` }}>
            <tr>
              <th className="p-2">SQL Text</th>
              <th className="p-2 text-right">CPU Time (s)</th>
              <th className="p-2 text-right">Executions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} className="border-b border-gray-800/50 transition-colors duration-200 hover:bg-opacity-20" style={{ ':hover': { backgroundColor: `${color}33` } } as any}>
                <td className="p-2 font-mono text-white truncate max-w-sm" title={query.sqlText}>{query.sqlText}</td>
                <td className="p-2 text-right font-mono" style={{ color }}>{query.cpuTime.toFixed(2)}</td>
                <td className="p-2 text-right font-mono text-gray-300">{query.executions.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSqlQueries;
