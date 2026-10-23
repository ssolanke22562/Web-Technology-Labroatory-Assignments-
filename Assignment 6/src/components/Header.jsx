import React from 'react';
import { Globe, Code2, Cpu, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badges">
        <span className="badge badge-accent">
          <Code2 size={13} /> WTL Assignment 6
        </span>
        <span className="badge badge-tech">
          <Cpu size={13} /> React 19 + Axios
        </span>
        <span className="badge badge-user">
          <User size={13} /> Sarthak Solanke
        </span>
      </div>

      <h1 className="header-title">
        Live API Data Integration
      </h1>

      <p className="header-subtitle">
        Demonstrating asynchronous REST API consumption with <strong className="highlight">Axios</strong>,
        granular <strong className="highlight">Loading</strong> states, resilient{' '}
        <strong className="highlight">Error</strong> boundary handling, and interactive testing controls.
      </p>
    </header>
  );
}
