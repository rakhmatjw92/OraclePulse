import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  // FIX: Changed icon prop type from React.ReactNode to React.ReactElement for type safety.
  // This ensures that only valid elements are passed and allows React.cloneElement to be used without type errors.
  icon: React.ReactElement;
  children?: React.ReactNode;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, children, color = '#ef4444' }) => {
  return (
    <div className="bg-gray-900/50 border p-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-lg" style={{ borderColor: `${color}33`, boxShadow: `0 10px 15px -3px ${color}33` }}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color }}>{title}</h3>
          {children ? (
             <div className="mt-2 h-16 w-full">{children}</div>
          ) : (
            <div className="mt-2 text-4xl font-orbitron font-bold text-white">
              {value}
              {unit && <span className="text-xl text-gray-400 ml-1">{unit}</span>}
            </div>
          )}
        </div>
        <div className="p-2 rounded-full" style={{ backgroundColor: `${color}4D`, color }}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;