
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TimeSeriesData } from '../types';

interface ChartComponentProps {
  data: TimeSeriesData[];
  title: string;
  dataKey: string;
  color: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, title, dataKey, color }) => {
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-red-500/50 p-2 rounded-md shadow-lg">
          <p className="label text-white font-bold">{`${label}`}</p>
          <p className="intro text-red-400">{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-gray-900/50 border border-red-500/20 p-4 rounded-lg shadow-lg shadow-red-900/20 backdrop-blur-sm h-80 flex flex-col">
      <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4">{title}</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(239, 68, 68, 0.1)" />
            <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Line 
                type="monotone" 
                dataKey={dataKey} 
                name={title.split('(')[0].trim()}
                stroke={color} 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, fill: '#fff', stroke: color, strokeWidth: 2 }}
             />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
