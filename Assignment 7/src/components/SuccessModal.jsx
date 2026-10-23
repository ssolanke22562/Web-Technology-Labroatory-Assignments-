import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, User, Mail, Phone, GraduationCap, Award, X, Sparkles, Calendar } from 'lucide-react';

export default function SuccessModal({ user, onClose, onRegisterNew }) {
  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // safe fallback if canvas not available
    }
  }, []);

  if (!user) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="modal-close-btn" onClick={onClose} title="Close dialog">
          <X size={18} />
        </button>

        {/* Success Icon & Heading */}
        <div className="modal-top">
          <div className="modal-icon-glow">
            <CheckCircle2 size={36} />
          </div>
          <span className="badge badge-success">
            <Sparkles size={12} /> Registration Confirmed
          </span>
          <h2 className="modal-title">Welcome, {user.fullName}!</h2>
          <p className="modal-desc">
            Your user account has been successfully validated and registered via React controlled state.
          </p>
        </div>

        {/* Student ID Profile Card */}
        <div className="student-id-card">
          <div className="id-card-header">
            <div className="id-avatar">
              {user.fullName
                ? user.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'ST'}
            </div>
            <div className="id-names">
              <h3 className="id-name">{user.fullName}</h3>
              <span className="id-dept">{user.department}</span>
            </div>
            <span className="id-gender-tag">{user.gender}</span>
          </div>

          <div className="id-details-grid">
            <div className="id-item">
              <Mail size={14} className="id-icon" />
              <div>
                <span className="id-label">Email Address</span>
                <span className="id-value">{user.email}</span>
              </div>
            </div>

            <div className="id-item">
              <Phone size={14} className="id-icon" />
              <div>
                <span className="id-label">Contact Number</span>
                <span className="id-value">{user.phone}</span>
              </div>
            </div>

            <div className="id-item">
              <GraduationCap size={14} className="id-icon" />
              <div>
                <span className="id-label">Department</span>
                <span className="id-value">{user.department}</span>
              </div>
            </div>

            <div className="id-item">
              <Calendar size={14} className="id-icon" />
              <div>
                <span className="id-label">Registered At</span>
                <span className="id-value">{user.registeredAt || new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {user.skills && user.skills.length > 0 && (
            <div className="id-skills-box">
              <span className="id-label">
                <Award size={13} /> Selected Technical Skills:
              </span>
              <div className="skills-pill-row">
                {user.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={onRegisterNew}>
            Register Another User
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            View Directory
          </button>
        </div>
      </div>
    </div>
  );
}
