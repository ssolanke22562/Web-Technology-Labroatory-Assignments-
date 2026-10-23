# Sarthak Raju Solanke — Personal Portfolio Website (MERN Stack)

A modern, production-ready, dark-mode-first personal portfolio website built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), Vite, Framer Motion, and Tailwind CSS. Designed specifically for a Computer Science Engineering student specializing in **AI, Machine Learning, & Data Structures**.

---

## 🌟 Key Features

1. **Futuristic AI/ML Dark-First Aesthetics**:
   - Cyber cyan and electric purple neon glows, glassmorphism cards, and interactive canvas neural node background (`ParticleBackground.jsx`).
   - Dark/Light mode toggle with persistence in `localStorage`.
   - Animated typing tagline effect and smooth Framer Motion scroll reveals.

2. **Full-Stack Architecture & REST API**:
   - **Frontend**: React (Vite) + Tailwind CSS + Framer Motion + Lucide React Icons.
   - **Backend**: Node.js + Express REST API (`/api/projects`, `/api/contact`, `/api/health`).
   - **Database**: MongoDB Atlas via Mongoose ORM for projects content management and contact submission storage.
   - **Email Dispatch**: Integrated Nodemailer email service for instant contact form notifications.
   - **API Fallback**: Gracefully falls back to local configuration (`siteConfig.js`) if MongoDB Atlas is offline or loading.

3. **Complete Portfolio Content**:
   - **Hero Section**: Name, typing tagline, headline, CTAs (*"View Projects"*, *"Download Resume"*, *"Contact Me"*), social links.
   - **About Me**: Bio, 2028 class details, blob photo mask avatar container, achievement pills.
   - **Education**: B.Tech CSE timeline at Sanjivani College of Engineering.
   - **Technical Skills**: Animated progress bars for Python, C++, C, Java, SQL, DSA, AI/ML, and HackerRank 5-Star C++ spotlight badge.
   - **Projects**: Seeded with **Medi-4-U** and **Hostel Water Waste Monitoring System**.
   - **Certifications & Achievements**: Udemy AI/ML/DL, ACES Brains & Bots 1st Prize, HackerRank 5-Star C++, TenzorX AI Hackathon Organizer.
   - **Leadership & Extracurriculars**: EDP Cell, Alumni Relation Cell, Cyber Awareness session speaker at KBP School.
   - **Contact Form**: Validated contact form connected to MongoDB & Nodemailer with client/server error handling and toast notifications.

---

## 📁 Directory Structure

```
.
├── client/                     # Vite + React Frontend
│   ├── public/
│   │   ├── favicon.svg         # Glowing SS initial favicon
│   │   └── resume-placeholder.pdf # Resume PDF placeholder
│   ├── src/
│   │   ├── components/         # Navbar, Hero, About, Education, Skills, Projects,
│   │   │                       # Certifications, Leadership, Contact, Footer, Toast, ParticleBackground
│   │   ├── context/            # ThemeContext.jsx (Dark/Light mode)
│   │   ├── siteConfig.js       # Central configuration & placeholders (marked with // TODO:)
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html              # SEO Meta tags & Open Graph setup
│   ├── tailwind.config.js
│   ├── vite.config.js          # Proxy setup (/api -> http://localhost:5000)
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── projectController.js # GET /api/projects, POST /api/projects
│   │   └── contactController.js # POST /api/contact (saves to DB + sends Nodemailer email)
│   ├── models/
│   │   ├── Project.js          # Mongoose schema for projects
│   │   └── Contact.js          # Mongoose schema for contact messages
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   └── contactRoutes.js
│   ├── seed.js                 # Database seed script for initial projects
│   ├── server.js               # Express application entry point
│   ├── .env                    # Local environment variables
│   └── package.json
│
├── .env.example                # Environment variables template
├── .gitignore
├── README.md
└── package.json                # Root package.json with scripts
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas Account** (optional for live database storage)

---

### Step 1: Clone & Install Dependencies

From the project root directory:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `server/.env`:
   ```bash
   cp .env.example server/.env
   ```

2. Open `server/.env` and update the environment variables:

   ```env
   PORT=5000
   NODE_ENV=development

   # MongoDB Atlas URI (Replace with your URI)
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority

   # Nodemailer Email Notification Credentials
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_specific_password
   RECEIVER_EMAIL=your_personal_email@domain.com
   ```

> 💡 **Note on Gmail SMTP**: To use Nodemailer with Gmail, generate an **App Password** from your Google Account Security settings (`Security > 2-Step Verification > App Passwords`).

---

### Step 3: Seed the MongoDB Database

To populate your MongoDB database with the initial projects (**Medi-4-U** and **Hostel Water Waste Monitoring System**), run:

```bash
# From root directory:
npm run seed

# Or directly from /server directory:
cd server
npm run seed
```

---

### Step 4: Run the Application

You can start both backend and frontend development servers concurrently:

#### Terminal 1 (Backend REST API):
```bash
# Runs Express API on http://localhost:5000
npm run dev:server
```

#### Terminal 2 (Frontend Client):
```bash
# Runs React Vite client on http://localhost:3000
npm run dev:client
```

Open your browser and navigate to `http://localhost:3000`.

---

## 🛠️ Placeholder Customization Checklist (`siteConfig.js`)

All profile data, links, social handles, and resume paths are centralized in `client/src/siteConfig.js` and flagged with `// TODO:` comments:

- [ ] **Email Address**: Update `siteConfig.email` with your professional email.
- [ ] **LinkedIn URL**: Update `siteConfig.socials.linkedin`.
- [ ] **GitHub URL**: Update `siteConfig.socials.github`.
- [ ] **HackerRank URL**: Update `siteConfig.socials.hackerrank`.
- [ ] **Resume PDF**: Replace `resume-placeholder.pdf` in `client/public/` with your resume PDF file and update `siteConfig.resumeUrl`.
- [ ] **Project Repos & Demos**: Update `githubLink` and `demoLink` in `siteConfig.fallbackProjects` and `server/seed.js`.

---

## 🧪 Testing & Verification

1. **API Health Check**: Visit `http://localhost:5000/api/health` to confirm server status.
2. **Projects Endpoint**: Visit `http://localhost:5000/api/projects` to view fetched project JSON.
3. **Contact Submission**: Submit a message through the contact form on the frontend to verify client validation, MongoDB saving, and Nodemailer email dispatch.
