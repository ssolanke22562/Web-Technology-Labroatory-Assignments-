import React from 'react';
import { Activity, Clock, CheckCircle2, AlertTriangle, Layers, Radio } from 'lucide-react';

export default function StatsBanner({
  endpoint,
  totalCount,
  filteredCount,
  status,
  latency,
  isLoading,
  isError,
  lastFetched,
}) {
  return (
    <div className="stats-banner">
      <div className="stat-card">
        <div className="stat-icon stat-icon-blue">
          <Radio size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Active Endpoint</span>
          <span className="stat-value endpoint-val" title={endpoint}>
            {endpoint.replace('https://jsonplaceholder.typicode.com', '')}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-purple">
          <Layers size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Items Loaded</span>
          <span className="stat-value">
            {isLoading ? '...' : `${filteredCount} / ${totalCount}`}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className={`stat-icon ${isError ? 'stat-icon-red' : 'stat-icon-green'}`}>
          {isError ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
        </div>
        <div className="stat-info">
          <span className="stat-label">HTTP Status</span>
          <span className={`stat-value ${isError ? 'status-err' : 'status-ok'}`}>
            {isLoading ? 'Fetching...' : status || (isError ? 'Error' : '200 OK')}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon stat-icon-cyan">
          <Clock size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Response Time</span>
          <span className="stat-value">
            {isLoading ? 'Measuring...' : latency ? `${latency} ms` : '—'}
          </span>
        </div>
      </div>
    </div>
  );
}
