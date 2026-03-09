
import React from 'react';
import { useMockData } from '../hooks/useMockData';
import MetricCard from './MetricCard';
import ChartComponent from './ChartComponent';
import TopSqlQueries from './TopSqlQueries';
import GaugeComponent from './GaugeComponent';
import { ActivityIcon, ClockIcon, CpuIcon, HardDriveIcon } from '../constants';
import type { Session } from '../types';

interface DashboardProps {
  session: Session;
}

const Dashboard: React.FC<DashboardProps> = ({ session }) => {
  const metrics = useMockData();

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-2xl font-orbitron animate-pulse" style={{ color: session.color }}>Initializing Data Stream...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
      <div className="md:col-span-2 lg:col-span-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="DB Time" value={metrics.dbTime.toFixed(2)} unit="s" icon={<ClockIcon />} color={session.color} />
          <MetricCard title="Memory Usage" value={metrics.memoryUsage.toFixed(2)} unit="%" icon={<CpuIcon />} color={session.color} />
          <MetricCard title="Active Sessions" value={metrics.activeSessions[metrics.activeSessions.length - 1]?.value.toString() ?? '0'} icon={<ActivityIcon />} color={session.color} />
          <MetricCard title="Tablespace" value="" icon={<HardDriveIcon />} color={session.color}>
            <GaugeComponent value={metrics.tablespaceUsed} color={session.color} />
          </MetricCard>
        </div>
      </div>
      
      <div className="md:col-span-2 lg:col-span-2">
        <ChartComponent 
          data={metrics.cpuUsage} 
          title="CPU Usage (%)" 
          dataKey="value" 
          color={session.color} 
        />
      </div>

      <div className="md:col-span-2 lg:col-span-2">
        <ChartComponent 
          data={metrics.activeSessions} 
          title="Active Sessions" 
          dataKey="value" 
          color={session.color} 
        />
      </div>

      <div className="md:col-span-2 lg:col-span-4">
        <TopSqlQueries queries={metrics.topSql} color={session.color} />
      </div>
    </div>
  );
};

export default Dashboard;
