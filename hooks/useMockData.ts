
import { useState, useEffect } from 'react';
import type { PerformanceMetrics, TimeSeriesData, SqlQuery } from '../types';

const MAX_DATA_POINTS = 30;

const generateInitialData = (): PerformanceMetrics => {
  const now = new Date();
  const initialCpu: TimeSeriesData[] = [];
  const initialSessions: TimeSeriesData[] = [];

  for (let i = MAX_DATA_POINTS - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    initialCpu.push({ time, value: Math.random() * 10 + 5 });
    initialSessions.push({ time, value: Math.floor(Math.random() * 20 + 10) });
  }

  const initialSql: SqlQuery[] = [
    { id: 'a1b2c3d4', sqlText: 'SELECT * FROM customers WHERE region = :1 AND status = :2', cpuTime: 125.4, executions: 1500 },
    { id: 'e5f6g7h8', sqlText: 'UPDATE orders SET order_status = \'SHIPPED\' WHERE order_date < SYSDATE - 30', cpuTime: 98.2, executions: 50 },
    { id: 'i9j0k1l2', sqlText: 'INSERT INTO logs (log_message, log_timestamp) VALUES (:1, SYSTIMESTAMP)', cpuTime: 75.1, executions: 120500 },
    { id: 'm3n4o5p6', sqlText: 'SELECT p.product_name, SUM(oi.quantity) FROM products p JOIN order_items oi ON ...', cpuTime: 55.8, executions: 890 },
    { id: 'q7r8s9t0', sqlText: 'DELETE FROM temp_session_data WHERE creation_date < SYSDATE - 1', cpuTime: 42.3, executions: 25 },
  ];

  return {
    cpuUsage: initialCpu,
    activeSessions: initialSessions,
    dbTime: Math.random() * 5,
    memoryUsage: Math.random() * 20 + 60,
    tablespaceUsed: Math.random() * 10 + 80,
    topSql: initialSql,
  };
};

export const useMockData = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    // Set initial data immediately
    setMetrics(generateInitialData());

    const interval = setInterval(() => {
      setMetrics(prevMetrics => {
        if (!prevMetrics) return generateInitialData();
        
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const newCpuValue = Math.max(0, prevMetrics.cpuUsage[prevMetrics.cpuUsage.length - 1].value + (Math.random() - 0.5) * 3);
        const newCpuUsage = [...prevMetrics.cpuUsage.slice(1), { time: now, value: newCpuValue }];

        const newSessionsValue = Math.max(0, prevMetrics.activeSessions[prevMetrics.activeSessions.length - 1].value + Math.floor((Math.random() - 0.45) * 4));
        const newActiveSessions = [...prevMetrics.activeSessions.slice(1), { time: now, value: newSessionsValue }];
        
        const newTopSql = prevMetrics.topSql.map(q => ({
            ...q,
            cpuTime: q.cpuTime + Math.random() * 0.1,
            executions: q.executions + Math.floor(Math.random() * 5)
        })).sort((a,b) => b.cpuTime - a.cpuTime);

        return {
          ...prevMetrics,
          cpuUsage: newCpuUsage,
          activeSessions: newActiveSessions,
          dbTime: prevMetrics.dbTime + Math.random() * 0.1,
          memoryUsage: Math.min(100, Math.max(0, prevMetrics.memoryUsage + (Math.random() - 0.5) * 2)),
          tablespaceUsed: Math.min(100, Math.max(0, prevMetrics.tablespaceUsed + (Math.random() - 0.5) * 0.1)),
          topSql: newTopSql,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
};
