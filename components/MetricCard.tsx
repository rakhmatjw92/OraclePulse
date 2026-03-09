import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  // FIX: Changed icon prop type from React.ReactNode to React.ReactElement for type safety.
  // This ensures that only valid elements are passed and allows React.cloneElement to be used without type errors.
  icon: React.ReactElement;
  children?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, children }) => {
  return (
    <div className="bg-gray-900/50 border border-red-500/20 p-4 rounded-lg shadow-lg shadow-red-900/20 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/20">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">{title}</h3>
          {children ? (
             <div className="mt-2 h-16 w-full">{children}</div>
          ) : (
            <div className="mt-2 text-4xl font-orbitron font-bold text-white">
              {value}
              {unit && <span className="text-xl text-gray-400 ml-1">{unit}</span>}
            </div>
          )}
        </div>
        <div className="text-red-500 bg-red-900/30 p-2 rounded-full">
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;