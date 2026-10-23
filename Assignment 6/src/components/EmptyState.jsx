import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ searchQuery, onClear }) {
  return (
    <div className="empty-state-box">
      <div className="empty-icon-circle">
        <SearchX size={32} />
      </div>
      <h3 className="empty-title">No matching results found</h3>
      <p className="empty-text">
        No records match your query <span className="query-highlight">"{searchQuery}"</span>.
        Try refining your keywords or clearing the filter.
      </p>
      <button type="button" className="btn btn-secondary" onClick={onClear}>
        Clear Search Filter
      </button>
    </div>
  );
}
