import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import ControlPanel from './components/ControlPanel';
import UserCard from './components/UserCard';
import PostCard from './components/PostCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorAlert from './components/ErrorAlert';
import EmptyState from './components/EmptyState';
import './App.css';

const ENDPOINTS = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts?_limit=12',
  simulatedError: 'https://jsonplaceholder.typicode.com/non-existent-endpoint-404',
};

export default function App() {
  const [activeType, setActiveType] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [latency, setLatency] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Compute active target URL based on user toggle
  const currentEndpoint = useMemo(() => {
    if (simulateError) return ENDPOINTS.simulatedError;
    return ENDPOINTS[activeType];
  }, [simulateError, activeType]);

  // Primary Axios Data Fetching Function with Loading & Error State Management
  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    setStatus(null);
    const startTime = performance.now();

    try {
      // Optional artificial delay to demonstrate loading state
      if (slowNetwork) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Axios HTTP GET request
      const response = await axios.get(currentEndpoint, {
        signal,
        timeout: 10000,
      });

      const elapsed = Math.round(performance.now() - startTime);
      setLatency(elapsed);
      setData(response.data);
      setStatus(`${response.status} ${response.statusText || 'OK'}`);
      setError(null);
    } catch (err) {
      // Ignore cancellations caused by component unmounting or new queries
      if (axios.isCancel(err) || err.name === 'CanceledError') {
        return;
      }

      const elapsed = Math.round(performance.now() - startTime);
      setLatency(elapsed);
      setData([]);

      // Granular Error Analysis
      if (err.response) {
        // Server responded with non-2xx status code
        setError({
          message: `Server returned HTTP ${err.response.status}: ${err.response.statusText || 'Request failed'}`,
          status: err.response.status,
          code: err.code || 'ERR_BAD_RESPONSE',
        });
        setStatus(`HTTP ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received (e.g. offline / timeout)
        setError({
          message: 'Network unreachable. No response received from API server.',
          status: null,
          code: err.code || 'ERR_NETWORK',
        });
        setStatus('Network Error');
      } else {
        // Client configuration error
        setError({
          message: err.message || 'An error occurred setting up the Axios request.',
          status: null,
          code: 'CLIENT_ERROR',
        });
        setStatus('Client Error');
      }
    } finally {
      setLoading(false);
    }
  }, [currentEndpoint, slowNetwork]);

  // Trigger fetch when endpoint, delay, or manual refetch changes
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    // Cleanup: cancel pending request if parameters change or component unmounts
    return () => {
      controller.abort();
    };
  }, [fetchData, refetchIndex]);

  // Trigger manual refresh
  const handleRefresh = () => {
    setRefetchIndex((prev) => prev + 1);
  };

  // Filtered dataset based on live search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();

    if (activeType === 'users') {
      return data.filter((user) => {
        const name = (user.name || '').toLowerCase();
        const username = (user.username || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        const city = (user.address?.city || '').toLowerCase();
        const company = (user.company?.name || '').toLowerCase();
        return (
          name.includes(q) ||
          username.includes(q) ||
          email.includes(q) ||
          city.includes(q) ||
          company.includes(q)
        );
      });
    }

    // For posts
    return data.filter((post) => {
      const title = (post.title || '').toLowerCase();
      const body = (post.body || '').toLowerCase();
      return title.includes(q) || body.includes(q);
    });
  }, [data, searchQuery, activeType]);

  return (
    <div className="app-container">
      {/* Glow background ambient accents */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <main className="content-wrapper">
        {/* Header */}
        <Header />

        {/* Stats Metrics Banner */}
        <StatsBanner
          endpoint={currentEndpoint}
          totalCount={data.length}
          filteredCount={filteredData.length}
          status={status}
          latency={latency}
          isLoading={loading}
          isError={Boolean(error)}
        />

        {/* Interactive Controls & Filters */}
        <ControlPanel
          activeType={activeType}
          setActiveType={(type) => {
            setActiveType(type);
            setSearchQuery('');
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={handleRefresh}
          isLoading={loading}
          simulateError={simulateError}
          setSimulateError={setSimulateError}
          slowNetwork={slowNetwork}
          setSlowNetwork={setSlowNetwork}
        />

        {/* Main Content Area: Conditional State Rendering */}
        <section className="display-section" aria-live="polite">
          {/* 1. Loading State */}
          {loading && (
            <div className="state-wrapper">
              <div className="loading-indicator-row">
                <div className="pulse-dot" />
                <span>
                  Axios is fetching data from{' '}
                  <code className="code-pill">{currentEndpoint}</code>...
                </span>
              </div>
              <LoadingSkeleton count={6} type={activeType} />
            </div>
          )}

          {/* 2. Error State */}
          {!loading && error && (
            <ErrorAlert
              error={error}
              onRetry={handleRefresh}
              simulateError={simulateError}
              setSimulateError={(val) => {
                setSimulateError(val);
                handleRefresh();
              }}
              endpoint={currentEndpoint}
            />
          )}

          {/* 3. Empty Search Results State */}
          {!loading && !error && filteredData.length === 0 && data.length > 0 && (
            <EmptyState
              searchQuery={searchQuery}
              onClear={() => setSearchQuery('')}
            />
          )}

          {/* 4. Success Data State */}
          {!loading && !error && filteredData.length > 0 && (
            <div className="cards-grid">
              {activeType === 'users'
                ? filteredData.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))
                : filteredData.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
            </div>
          )}

          {/* 5. Zero Initial Data (Empty API Response) */}
          {!loading && !error && data.length === 0 && (
            <div className="empty-state-box">
              <p>No records returned by the endpoint.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRefresh}
              >
                Reload
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            <strong>Web Technology Laboratory (WTL)</strong> • Assignment 6 • React 19 + Axios
          </p>
          <p className="footer-credits">
            Crafted for SPPU Semester 5 Computer Engineering by Sarthak Raju Solanke
          </p>
        </footer>
      </main>
    </div>
  );
}
