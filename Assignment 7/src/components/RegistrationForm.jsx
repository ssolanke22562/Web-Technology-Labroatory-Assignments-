import React, { useState, useMemo } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  Check,
} from 'lucide-react';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const DEPARTMENTS = [
  'Computer Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
];

const SKILL_OPTIONS = ['React.js', 'Node.js', 'Python', 'Java', 'MongoDB', 'C++', 'Docker', 'AWS'];

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  gender: '',
  skills: [],
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

export default function RegistrationForm({ onSuccessfulRegister }) {
  // 1. Controlled State for all input fields
  const [formData, setFormData] = useState(INITIAL_FORM);

  // 2. Touched tracking so error messages only show after interaction
  const [touched, setTouched] = useState({});

  // 3. Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 4. Submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 5. Validation Logic
  const validate = (values) => {
    const errors = {};

    // Full Name
    if (!values.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    } else if (values.fullName.trim().length < 3) {
      errors.fullName = 'Name must be at least 3 characters long';
    } else if (!/^[a-zA-Z\s.]+$/.test(values.fullName.trim())) {
      errors.fullName = 'Name can only contain alphabets and spaces';
    }

    // Email (Strict regex validation)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!values.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., student@domain.com)';
    }

    // Phone (10 digits)
    if (!values.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(values.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }

    // Department
    if (!values.department) {
      errors.department = 'Please select your academic department';
    }

    // Gender
    if (!values.gender) {
      errors.gender = 'Please select your gender';
    }

    // Password
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Confirm Password
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirming your password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Terms & Conditions
    if (!values.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms & conditions';
    }

    return errors;
  };

  // Real-time calculated errors
  const errors = useMemo(() => validate(formData), [formData]);
  const isValid = Object.keys(errors).length === 0;

  // Completion percentage
  const totalRequiredFields = 7;
  const completedFields = useMemo(() => {
    let count = 0;
    if (formData.fullName.trim() && !errors.fullName) count++;
    if (formData.email.trim() && !errors.email) count++;
    if (formData.phone.trim() && !errors.phone) count++;
    if (formData.department && !errors.department) count++;
    if (formData.gender) count++;
    if (formData.password && !errors.password) count++;
    if (formData.confirmPassword && !errors.confirmPassword) count++;
    return count;
  }, [formData, errors]);

  const completionPercentage = Math.round((completedFields / totalRequiredFields) * 100);

  // Controlled Change Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Skill Checkbox Toggle
  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  // Blur Handler
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Reset Handler
  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setTouched({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to trigger any validation messages
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      department: true,
      gender: true,
      password: true,
      confirmPassword: true,
      termsAccepted: true,
    };
    setTouched(allTouched);

    if (!isValid) {
      // Find first error and scroll to it
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    // Simulate async submission processing
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessfulRegister({
        ...formData,
        id: Date.now(),
        registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
      handleReset();
    }, 700);
  };

  return (
    <div className="form-card">
      {/* Form Progress Header */}
      <div className="progress-banner">
        <div className="progress-info">
          <span className="progress-label">Form Completion Status:</span>
          <span className="progress-fraction">
            {completedFields} of {totalRequiredFields} required fields ({completionPercentage}%)
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${completionPercentage}%`,
              backgroundColor: completionPercentage === 100 ? '#10b981' : '#6366f1',
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="registration-form">
        {/* Row 1: Full Name & Email */}
        <div className="form-grid-2">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="field-label">
              <span>Full Name</span>
              <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${touched.fullName && errors.fullName ? 'has-error' : ''} ${touched.fullName && !errors.fullName ? 'has-success' : ''}`}>
              <User size={17} className="input-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control"
                placeholder="e.g. Sarthak Raju Solanke"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.fullName && Boolean(errors.fullName)}
              />
              {touched.fullName && !errors.fullName && <Check size={16} className="valid-icon" />}
            </div>
            {touched.fullName && errors.fullName && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email" className="field-label">
              <span>Email Address</span>
              <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${touched.email && errors.email ? 'has-error' : ''} ${touched.email && !errors.email ? 'has-success' : ''}`}>
              <Mail size={17} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="e.g. student@sanjivani.edu.in"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.email && Boolean(errors.email)}
              />
              {touched.email && !errors.email && <Check size={16} className="valid-icon" />}
            </div>
            {touched.email && errors.email && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Phone & Department */}
        <div className="form-grid-2">
          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone" className="field-label">
              <span>Contact Phone (10 digits)</span>
              <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${touched.phone && errors.phone ? 'has-error' : ''} ${touched.phone && !errors.phone ? 'has-success' : ''}`}>
              <Phone size={17} className="input-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={10}
                className="form-control"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.phone && Boolean(errors.phone)}
              />
              {touched.phone && !errors.phone && <Check size={16} className="valid-icon" />}
            </div>
            {touched.phone && errors.phone && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.phone}
              </span>
            )}
          </div>

          {/* Department Dropdown */}
          <div className="form-group">
            <label htmlFor="department" className="field-label">
              <span>Academic Department</span>
              <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${touched.department && errors.department ? 'has-error' : ''} ${touched.department && !errors.department ? 'has-success' : ''}`}>
              <GraduationCap size={17} className="input-icon" />
              <select
                id="department"
                name="department"
                className="form-control select-control"
                value={formData.department}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.department && Boolean(errors.department)}
              >
                <option value="">-- Choose Department --</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            {touched.department && errors.department && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.department}
              </span>
            )}
          </div>
        </div>

        {/* Gender Radio Group */}
        <div className="form-group">
          <label className="field-label">
            <span>Gender</span>
            <span className="required-star">*</span>
          </label>
          <div className="radio-group" role="radiogroup">
            {['Male', 'Female', 'Other'].map((g) => (
              <label key={g} className={`radio-card ${formData.gender === g ? 'radio-card-active' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="radio-dot" />
                <span className="radio-text">{g}</span>
              </label>
            ))}
          </div>
          {touched.gender && errors.gender && (
            <span className="error-message">
              <AlertCircle size={13} /> {errors.gender}
            </span>
          )}
        </div>

        {/* Technical Skills (Multi-select Checkboxes) */}
        <div className="form-group">
          <label className="field-label">
            <span>Technical Skills & Proficiencies</span>
            <span className="optional-tag">(Optional)</span>
          </label>
          <div className="skills-checkbox-grid">
            {SKILL_OPTIONS.map((skill) => {
              const isChecked = formData.skills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  className={`skill-check-badge ${isChecked ? 'skill-check-active' : ''}`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  <span className={`check-indicator ${isChecked ? 'checked' : ''}`}>
                    {isChecked && <Check size={12} />}
                  </span>
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Password & Confirm Password */}
        <div className="form-grid-2">
          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="field-label">
              <span>Account Password</span>
              <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${touched.password && errors.password ? 'has-error' : ''} ${touched.password && !errors.password ? 'has-success' : ''}`}>
              <Lock size={17} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-control"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.password && Boolean(errors.password)}
              />
              <button
                type="button"
                className="toggle-pwd-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.password}
              </span>
            )}
            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={formData.password} />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="field-label">
              <span>Confirm Password</span>
              <span className="required-star">*</span>
            </label>
            <div className={`input-wrapper ${touched.confirmPassword && errors.confirmPassword ? 'has-error' : ''} ${touched.confirmPassword && !errors.confirmPassword ? 'has-success' : ''}`}>
              <Lock size={17} className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-type your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.confirmPassword && Boolean(errors.confirmPassword)}
              />
              <button
                type="button"
                className="toggle-pwd-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="error-message">
                <AlertCircle size={13} /> {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="form-group terms-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="checkbox-box">
              {formData.termsAccepted && <Check size={13} className="check-mark" />}
            </span>
            <span className="checkbox-text">
              I agree to the terms, academic honor code, and registration guidelines.
            </span>
          </label>
          {touched.termsAccepted && errors.termsAccepted && (
            <span className="error-message terms-err">
              <AlertCircle size={13} /> {errors.termsAccepted}
            </span>
          )}
        </div>

        {/* Form Action Buttons */}
        <div className="form-actions-row">
          <button
            type="submit"
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner" />
                <span>Validating & Registering...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Submit Registration</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="btn btn-reset"
            onClick={handleReset}
            disabled={isSubmitting}
            title="Clear all form fields"
          >
            <RotateCcw size={15} />
            <span>Reset Form</span>
          </button>
        </div>
      </form>
    </div>
  );
}
