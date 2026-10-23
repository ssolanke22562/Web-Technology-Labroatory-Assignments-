import React from 'react';
import { UserCheck, ShieldCheck, Code2, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="form-header">
      <div className="header-badge-row">
        <span className="badge badge-accent">
          <Code2 size={13} /> WTL Assignment 7
        </span>
        <span className="badge badge-tech">
          <ShieldCheck size={13} /> Controlled Components & Validation
        </span>
        <span className="badge badge-user">
          <Sparkles size={13} /> Sarthak Solanke
        </span>
      </div>

      <h1 className="header-title">Student Registration Portal</h1>

      <p className="header-subtitle">
        Engineered with strictly <strong className="highlight">Controlled React Components</strong>,
        real-time regex-based <strong className="highlight">Email & Field Validation</strong>,
        password entropy analysis, and instant state synchronization.
      </p>
    </header>
  );
}
