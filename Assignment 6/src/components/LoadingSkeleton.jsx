import React from 'react';

export default function LoadingSkeleton({ count = 6, type = 'users' }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="skeleton-grid">
      {items.map((key) => (
        <div key={key} className="card skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-avatar shimmer" />
            <div className="skeleton-text-group">
              <div className="skeleton-line shimmer line-title" />
              <div className="skeleton-line shimmer line-subtitle" />
            </div>
          </div>

          <div className="skeleton-box shimmer" />

          <div className="skeleton-details">
            <div className="skeleton-line shimmer line-detail" />
            <div className="skeleton-line shimmer line-detail" />
            <div className="skeleton-line shimmer line-detail-short" />
          </div>
        </div>
      ))}
    </div>
  );
}
