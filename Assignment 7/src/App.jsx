import React, { useState } from 'react';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import SuccessModal from './components/SuccessModal';
import RegisteredUsersTable from './components/RegisteredUsersTable';
import './App.css';

export default function App() {
  const [registeredUsers, setRegisteredUsers] = useState([
    {
      id: 1,
      fullName: 'Sarthak Raju Solanke',
      email: 'sarthaksolanke71@gmail.com',
      phone: '9876543210',
      department: 'Computer Engineering',
      gender: 'Male',
      skills: ['React.js', 'Node.js', 'MongoDB', 'Python'],
      registeredAt: '12:00:00 PM',
    },
  ]);

  const [lastRegisteredUser, setLastRegisteredUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessfulRegister = (newUser) => {
    setRegisteredUsers((prev) => [newUser, ...prev]);
    setLastRegisteredUser(newUser);
    setShowSuccessModal(true);
  };

  const handleDeleteUser = (id) => {
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all registered session users?')) {
      setRegisteredUsers([]);
    }
  };

  return (
    <div className="app-container">
      {/* Glow background ambiance */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <main className="content-wrapper">
        {/* Header */}
        <Header />

        {/* Main Controlled Registration Form */}
        <section className="form-section">
          <RegistrationForm onSuccessfulRegister={handleSuccessfulRegister} />
        </section>

        {/* Active Registered Users Table */}
        <section className="directory-container">
          <RegisteredUsersTable
            users={registeredUsers}
            onDeleteUser={handleDeleteUser}
            onClearAll={handleClearAll}
          />
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            <strong>Web Technology Laboratory (WTL)</strong> • Assignment 7 • Controlled React Components
          </p>
          <p className="footer-credits">
            Developed by Sarthak Raju Solanke • Sanjivani College of Engineering
          </p>
        </footer>
      </main>

      {/* Success Modal */}
      {showSuccessModal && lastRegisteredUser && (
        <SuccessModal
          user={lastRegisteredUser}
          onClose={() => setShowSuccessModal(false)}
          onRegisterNew={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
