# WTL Assignment 7: User Registration Form with Controlled React Components

A modern, production-grade User Registration application built in **React** using strictly **Controlled Components**, featuring real-time input validation (including regex-based email format validation and required fields checking), password entropy strength meter, completion progress bar, celebratory confetti dialog, and an active session directory.

---

## 🎯 Objectives & Problem Statement
- **Controlled Components**: Every input element (`<input>`, `<select>`, `<textarea>`, radio buttons, checkboxes) has its state managed exclusively by React component state (`formData`).
- **Validation Engine**:
  - **Required Fields**: Strict checks preventing submission when mandatory fields are omitted.
  - **Email Format Validation**: RFC 5322 regex validation (`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`) providing explicit feedback for invalid formats.
  - **Phone Format Validation**: 10-digit numeric constraint.
  - **Password Security**: Minimum length verification, matching password confirmation, and live security entropy analysis.
  - **Terms Acceptance**: Mandatory compliance checkbox.
- **User Experience**:
  - Form completion progress bar (`X of 7 required fields completed`).
  - Show/Hide Password toggles.
  - Instant Form Reset.
  - Celebratory Success Modal with student ID card and confetti.
  - Interactive session directory table displaying registered users.

---

## 🛠️ Tech Stack
- **Library / Framework**: React 19 + Vite 8
- **Icons**: Lucide React
- **Animations / Celebrations**: Canvas Confetti
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphic Dark Aesthetics)

---

## 📁 Project Structure
```
Assignment 7/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Header with assignment badges & student metadata
│   │   ├── PasswordStrengthMeter.jsx  # 4-segment visual security meter and rule checklist
│   │   ├── RegisteredUsersTable.jsx   # Interactive session directory of submitted users
│   │   ├── RegistrationForm.jsx       # Controlled form inputs, real-time validation, progress bar
│   │   └── SuccessModal.jsx           # Pop-up student ID card with confetti celebration
│   ├── App.css                        # Glassmorphic component styles and responsive design
│   ├── App.jsx                        # Application root state & directory coordination
│   ├── index.css                      # Design tokens, typography, and base resets
│   └── main.jsx                       # Vite application entry point
├── index.html                         # Document root with Google Fonts
├── package.json                       # Dependencies & scripts
└── README.md                          # Assignment documentation
```

---

## 🚀 Getting Started Locally

### 1. Navigate to Assignment 7
```bash
cd "Assignment 7"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5175/`** in your browser.

---

## 💡 Controlled Component Mechanics

```jsx
// Single source of truth in state
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  department: '',
  termsAccepted: false,
});

// Generic controlled change handler
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

// Form element is fully controlled
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
/>
```

---

## 👨‍💻 Author
- **Sarthak Raju Solanke**
- Computer Engineering, Sanjivani College of Engineering
- GitHub: [@ssolanke22562](https://github.com/ssolanke22562)
