import React from 'react';
import { Search, RefreshCw, AlertOctagon, Users, FileText, XCircle, SlidersHorizontal, Hourglass } from 'lucide-react';

export default function ControlPanel({
  activeType,
  setActiveType,
  searchQuery,
  setSearchQuery,
  onRefresh,
  isLoading,
  simulateError,
  setSimulateError,
  slowNetwork,
  setSlowNetwork,
}) {
  return (
    <div className="control-panel">
      {/* Top row: Tab Switcher & Action Buttons */}
      <div className="control-top-row">
        <div className="tab-group" role="tablist">
          <button
            type="button"
            className={`tab-btn ${activeType === 'users' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveType('users')}
          >
            <Users size={16} />
            <span>Users API</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeType === 'posts' ? 'tab-btn-active' : ''}`}
            onClick={() => setActiveType('posts')}
          >
            <FileText size={16} />
            <span>Posts API</span>
          </button>
        </div>

        <div className="action-buttons-group">
          {/* Refresh Button */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refetch data via Axios"
          >
            <RefreshCw size={15} className={isLoading ? 'spin-animation' : ''} />
            <span>{isLoading ? 'Fetching...' : 'Refetch'}</span>
          </button>

          {/* Simulate Error Toggle */}
          <button
            type="button"
            className={`btn ${simulateError ? 'btn-danger-active' : 'btn-danger'}`}
            onClick={() => setSimulateError((prev) => !prev)}
            title="Switch URL to an invalid endpoint to demonstrate Axios error handling"
          >
            <AlertOctagon size={15} />
            <span>{simulateError ? 'Simulating Error (ON)' : 'Simulate Error'}</span>
          </button>

          {/* Simulate Slow Network */}
          <button
            type="button"
            className={`btn ${slowNetwork ? 'btn-warning-active' : 'btn-secondary'}`}
            onClick={() => setSlowNetwork((prev) => !prev)}
            title="Add artificial 1.5s delay to clearly view loading skeleton animations"
          >
            <Hourglass size={15} />
            <span>{slowNetwork ? 'Slow Net: 1.5s (ON)' : 'Slow Net'}</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Search Bar */}
      <div className="search-bar-wrapper">
        <div className="search-input-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={
              activeType === 'users'
                ? 'Search users by name, username, email, or company...'
                : 'Search posts by title or content...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
