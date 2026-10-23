import React from 'react';
import { AlertTriangle, RefreshCw, CheckCircle, Bug, Terminal } from 'lucide-react';

export default function ErrorAlert({
  error,
  onRetry,
  simulateError,
  setSimulateError,
  endpoint,
}) {
  const is404 = error?.status === 404;
  const statusText = error?.status
    ? `HTTP ${error.status} ${error.status === 404 ? 'Not Found' : 'Error'}`
    : error?.code || 'Network Error';

  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-header">
          <div className="error-icon-box">
            <AlertTriangle size={24} />
          </div>
          <div className="error-title-box">
            <div className="error-badge-row">
              <span className="badge badge-error">{statusText}</span>
              {simulateError && (
                <span className="badge badge-simulated">Simulated Error Active</span>
              )}
            </div>
            <h2 className="error-title">Axios Request Failed</h2>
          </div>
        </div>

        <p className="error-description">
          {error?.message || 'An unexpected error occurred while communicating with the remote API.'}
        </p>

        {/* Technical Diagnostics Box */}
        <div className="error-diagnostics">
          <div className="diagnostics-header">
            <Terminal size={14} />
            <span>Axios Debug Diagnostics</span>
          </div>
          <div className="diagnostics-content">
            <div>
              <span className="diag-key">Requested URL:</span>{' '}
              <span className="diag-val">{endpoint}</span>
            </div>
            <div>
              <span className="diag-key">Axios Error Code:</span>{' '}
              <span className="diag-val">{error?.code || 'ERR_BAD_REQUEST'}</span>
            </div>
            <div>
              <span className="diag-key">Response Status:</span>{' '}
              <span className="diag-val">{error?.status || 'No Response'}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="error-actions">
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            <RefreshCw size={15} />
            <span>Retry Request</span>
          </button>

          {simulateError && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSimulateError(false);
              }}
            >
              <CheckCircle size={15} />
              <span>Turn Off Simulated Error & Refetch</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
