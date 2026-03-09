
import React from 'react';
import type { SqlQuery } from '../types';
import { CodeIcon } from '../constants';

interface TopSqlQueriesProps {
  queries: SqlQuery[];
}

const TopSqlQueries: React.FC<TopSqlQueriesProps> = ({ queries }) => {
  return (
    <div className="bg-gray-900/50 border border-red-500/20 p-4 rounded-lg shadow-lg shadow-red-900/20 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <CodeIcon className="w-5 h-5 text-red-400 mr-2" />
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Top SQL by CPU Time</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-red-500/20 text-gray-400 uppercase">
            <tr>
              <th className="p-2">SQL Text</th>
              <th className="p-2 text-right">CPU Time (s)</th>
              <th className="p-2 text-right">Executions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} className="border-b border-gray-800/50 hover:bg-red-900/20 transition-colors duration-200">
                <td className="p-2 font-mono text-white truncate max-w-sm" title={query.sqlText}>{query.sqlText}</td>
                <td className="p-2 text-right font-mono text-red-400">{query.cpuTime.toFixed(2)}</td>
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
