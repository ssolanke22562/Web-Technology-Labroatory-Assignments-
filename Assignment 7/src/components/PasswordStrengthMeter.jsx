import React from 'react';
import { Check, X } from 'lucide-react';

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;

  const checks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'Contains a number', valid: /[0-9]/.test(password) },
    { label: 'Contains a special symbol (@$!%*?&#)', valid: /[@$!%*?&#]/.test(password) },
  ];

  const passedCount = checks.filter((c) => c.valid).length;

  let strengthLabel = 'Too Weak';
  let strengthColor = '#ef4444'; // Red

  if (passedCount === 2) {
    strengthLabel = 'Fair';
    strengthColor = '#f59e0b'; // Amber
  } else if (passedCount === 3) {
    strengthLabel = 'Good';
    strengthColor = '#3b82f6'; // Blue
  } else if (passedCount === 4) {
    strengthLabel = 'Strong & Secure';
    strengthColor = '#10b981'; // Green
  }

  return (
    <div className="strength-meter-container">
      <div className="strength-header">
        <span className="strength-title">Password Security:</span>
        <span className="strength-label" style={{ color: strengthColor }}>
          {strengthLabel}
        </span>
      </div>

      {/* 4-segment visual bar */}
      <div className="strength-bars">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="strength-bar-segment"
            style={{
              backgroundColor: step <= passedCount ? strengthColor : 'rgba(255, 255, 255, 0.08)',
            }}
          />
        ))}
      </div>

      {/* Rules checklist */}
      <div className="strength-rules">
        {checks.map((check, idx) => (
          <div key={idx} className={`rule-item ${check.valid ? 'rule-valid' : 'rule-invalid'}`}>
            {check.valid ? <Check size={12} /> : <X size={12} />}
            <span>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
