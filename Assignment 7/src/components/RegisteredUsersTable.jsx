import React from 'react';
import { Users, Trash2, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';

export default function RegisteredUsersTable({ users, onDeleteUser, onClearAll }) {
  if (users.length === 0) {
    return (
      <div className="directory-empty-card">
        <Users size={32} className="empty-icon" />
        <h3>No Registered Users Yet</h3>
        <p>Complete the controlled registration form above to see registered records live here.</p>
      </div>
    );
  }

  return (
    <div className="directory-section">
      <div className="directory-header">
        <div className="directory-title-group">
          <Users size={20} className="text-primary" />
          <h2 className="directory-title">Active Session Registered Users</h2>
          <span className="directory-count-badge">{users.length} {users.length === 1 ? 'User' : 'Users'}</span>
        </div>

        <button
          type="button"
          className="btn btn-danger-subtle"
          onClick={onClearAll}
          title="Clear session list"
        >
          <Trash2 size={14} />
          <span>Clear All</span>
        </button>
      </div>

      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Gender</th>
              <th>Skills</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u.id || index}>
                <td className="cell-id">{index + 1}</td>
                <td className="cell-user">
                  <div className="table-avatar">
                    {u.fullName
                      ? u.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()
                      : 'ST'}
                  </div>
                  <strong>{u.fullName}</strong>
                </td>
                <td className="cell-email">
                  <span title={u.email}>{u.email}</span>
                </td>
                <td>{u.phone}</td>
                <td>
                  <span className="dept-tag">{u.department}</span>
                </td>
                <td>{u.gender}</td>
                <td>
                  <div className="table-skills-row">
                    {u.skills && u.skills.length > 0 ? (
                      u.skills.map((s) => (
                        <span key={s} className="table-skill-chip">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </div>
                </td>
                <td className="cell-time">{u.registeredAt}</td>
                <td>
                  <button
                    type="button"
                    className="icon-action-btn delete-btn"
                    onClick={() => onDeleteUser(u.id)}
                    title="Delete record"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
