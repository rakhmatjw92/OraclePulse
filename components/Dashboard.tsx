
import React from 'react';
import { useMockData } from '../hooks/useMockData';
import MetricCard from './MetricCard';
import ChartComponent from './ChartComponent';
import TopSqlQueries from './TopSqlQueries';
import GaugeComponent from './GaugeComponent';
import { ActivityIcon, ClockIcon, CpuIcon, HardDriveIcon } from '../constants';

const Dashboard: React.FC = () => {
  const metrics = useMockData();

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-2xl font-orbitron animate-pulse text-red-500">Initializing Data Stream...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
      <div className="md:col-span-2 lg:col-span-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="DB Time" value={metrics.dbTime.toFixed(2)} unit="s" icon={<ClockIcon />} />
          <MetricCard title="Memory Usage" value={metrics.memoryUsage.toFixed(2)} unit="%" icon={<CpuIcon />} />
          <MetricCard title="Active Sessions" value={metrics.activeSessions[metrics.activeSessions.length - 1]?.value.toString() ?? '0'} icon={<ActivityIcon />} />
          <MetricCard title="Tablespace" value="" icon={<HardDriveIcon />}>
            <GaugeComponent value={metrics.tablespaceUsed} />
          </MetricCard>
        </div>
      </div>
      
      <div className="md:col-span-2 lg:col-span-2">
        <ChartComponent 
          data={metrics.cpuUsage} 
          title="CPU Usage (%)" 
          dataKey="value" 
          color="#ef4444" 
        />
      </div>

      <div className="md:col-span-2 lg:col-span-2">
        <ChartComponent 
          data={metrics.activeSessions} 
          title="Active Sessions" 
          dataKey="value" 
          color="#f87171" 
        />
      </div>

      <div className="md:col-span-2 lg:col-span-4">
        <TopSqlQueries queries={metrics.topSql} />
      </div>
    </div>
  );
};

export default Dashboard;
