import React, { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Building, Copy, Check, ExternalLink } from 'lucide-react';

const GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #10b981, #14b8a6)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #d946ef)',
];

export default function UserCard({ user }) {
  const [copied, setCopied] = useState(false);

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const avatarGradient = GRADIENTS[(user.id || 1) % GRADIENTS.length];

  const handleCopyEmail = () => {
    if (user.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="card user-card">
      {/* Card Header with Avatar and Names */}
      <div className="card-header">
        <div className="avatar" style={{ background: avatarGradient }}>
          <span>{initials}</span>
        </div>
        <div className="user-titles">
          <h3 className="user-name">{user.name}</h3>
          <span className="user-handle">@{user.username || 'user'}</span>
        </div>
        <span className="user-id-badge">ID #{user.id}</span>
      </div>

      {/* Company info */}
      {user.company && (
        <div className="company-badge-box">
          <Building size={14} className="badge-icon" />
          <div className="company-text">
            <strong>{user.company.name}</strong>
            {user.company.catchPhrase && (
              <span className="catch-phrase">"{user.company.catchPhrase}"</span>
            )}
          </div>
        </div>
      )}

      {/* Details list */}
      <div className="details-list">
        <div className="detail-item">
          <Mail size={14} className="detail-icon" />
          <span className="detail-text" title={user.email}>
            {user.email}
          </span>
          <button
            type="button"
            className="copy-btn"
            onClick={handleCopyEmail}
            title={copied ? 'Copied!' : 'Copy Email'}
          >
            {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
          </button>
        </div>

        <div className="detail-item">
          <Phone size={14} className="detail-icon" />
          <span className="detail-text">{user.phone}</span>
        </div>

        <div className="detail-item">
          <MapPin size={14} className="detail-icon" />
          <span className="detail-text">
            {user.address ? `${user.address.city}, ${user.address.street}` : 'Earth'}
          </span>
        </div>

        <div className="detail-item">
          <Globe size={14} className="detail-icon" />
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-link"
          >
            <span>{user.website}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
