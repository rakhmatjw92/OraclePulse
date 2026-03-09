
export interface ConnectionDetails {
  host: string;
  port: number;
  serviceName: string;
  user: string;
}

export interface TimeSeriesData {
  time: string;
  value: number;
}

export interface SqlQuery {
  id: string;
  sqlText: string;
  cpuTime: number;
  executions: number;
}

export interface PerformanceMetrics {
  cpuUsage: TimeSeriesData[];
  activeSessions: TimeSeriesData[];
  dbTime: number;
  memoryUsage: number;
  tablespaceUsed: number;
  topSql: SqlQuery[];
}
