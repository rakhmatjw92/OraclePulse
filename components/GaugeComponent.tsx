
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface GaugeComponentProps {
  value: number;
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ value }) => {
  const data = [{ name: 'Tablespace', value }];
  const roundedValue = Math.round(value);

  return (
    <div className="w-full h-full relative">
       <ResponsiveContainer width="100%" height="100%">
         <RadialBarChart
          innerRadius="70%"
          outerRadius="90%"
          barSize={10}
          data={data}
          startAngle={180}
          endAngle={-180}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            angleAxisId={0}
            fill="#ef4444"
            cornerRadius={5}
            // @ts-ignore
            background={{ fill: 'rgba(239, 68, 68, 0.2)' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-2xl font-orbitron font-bold text-white">
            {roundedValue}%
        </span>
      </div>
    </div>
  );
};

export default GaugeComponent;
