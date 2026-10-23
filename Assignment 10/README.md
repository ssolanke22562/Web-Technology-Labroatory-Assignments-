# 🎓 Student Information & Analytics System (Node.js + Mongoose + Express + Serverless)

A complete, production-grade backend system connecting **Node.js** to **MongoDB** using **Mongoose**, featuring:
1. **Full CRUD Operations** via Express.js REST API routes.
2. **Read-Only Serverless Functions** (ready for **Vercel** or **Netlify**) querying top-performing students and aggregated summary statistics from the same MongoDB database with optimized connection caching.
3. **Interactive Testing Dashboard UI** for live CRUD operations, analytical metrics inspection, and browser/Postman-like testing.

---

## 🚀 Key Features

- **MongoDB & Mongoose Integration**:
  - Global connection caching (`connectDB`) to prevent connection pool exhaustion during serverless cold starts.
  - Schema with field validations, uniqueness constraints, index optimizations, and virtual fields (`performanceCategory`).
- **Express.js CRUD Routes**:
  - `POST /api/students`: Register/Create a new student with validation.
  - `GET /api/students`: Fetch students with search (name/roll number), department filter, GPA sorting, and pagination.
  - `GET /api/students/:id`: Fetch single student by MongoDB `_id` or `rollNumber`.
  - `PUT /api/students/:id`: Update existing student details.
  - `DELETE /api/students/:id`: Delete a student record.
- **Serverless Read-Only Summary Function (`/api/summary`)**:
  - Dedicated serverless function format for **Vercel** (`api/summary.js`) and **Netlify** (`netlify/functions/summary.js`).
  - Read-only enforcement (`GET` only).
  - Parallel aggregation pipelines returning:
    - Total student count
    - Average GPA and highest GPA
    - Top-performing students (customizable limit, e.g. `?limit=5`)
    - Department-wise student distribution and average GPA
    - Performance tiers distribution
- **Interactive Web UI Dashboard**:
  - Live analytics cards and top-performers leaderboard.
  - Real-time directory with modal dialogs for Adding/Editing/Deleting students.
  - Integrated API / Postman tester with latency timers, JSON syntax highlighter, and presets.

---

## 📁 Project Structure

```
├── .env.example                # Environment variables template
├── .env                        # Local environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── vercel.json                 # Vercel serverless deployment routing config
├── netlify.toml                # Netlify deployment and function redirects
├── api/
│   ├── index.js                # Vercel serverless entry for main Express API
│   └── summary.js              # Dedicated Vercel Serverless Function (Read-Only Summary)
├── netlify/
│   └── functions/
│       └── summary.js          # Netlify Serverless Function format alternative
├── src/
│   ├── config/
│   │   └── db.js               # Mongoose connection with Serverless caching
│   ├── models/
│   │   └── Student.js          # Mongoose Student schema & validation
│   ├── controllers/
│   │   ├── studentController.js # CRUD controller functions
│   │   └── summaryController.js # Read-only Summary & Analytics logic
│   ├── routes/
│   │   └── studentRoutes.js    # Express REST API routes
│   ├── app.js                  # Express middleware and app config
│   ├── server.js               # Local development server listener
│   └── seed.js                 # Database seed script for test data
└── public/
    ├── index.html              # Modern dashboard & testing interface
    ├── style.css               # Glassmorphic dark theme CSS
    └── app.js                  # Client-side interactivity and API tester
```

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local MongoDB Community Server running on `mongodb://127.0.0.1:27017` or a free cloud [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create or verify your `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/student_portal
```
*(If using MongoDB Atlas, replace `MONGODB_URI` with your connection string: `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/student_portal?retryWrites=true&w=majority`)*

### 4. (Optional) Seed Sample Data
Populate the database with sample students:
```bash
npm run seed
```

### 5. Start the Server
```bash
# Production mode:
npm start

# Or development mode with auto-reload:
npm run dev
```

Visit the dashboard in your browser at: **`http://localhost:5000`**

---

## 📮 API Endpoints & Postman Testing

### 1. Serverless Read-Only Summary Endpoint
- **URL**: `GET http://localhost:5000/api/summary`
- **Optional Query Parameters**:
  - `limit`: Number of top students to return (Default: `5`, e.g., `?limit=3`)
  - `department`: Filter summary by department (e.g., `?department=Computer Science`)
- **Sample Response**:
```json
{
  "success": true,
  "service": "Vercel Serverless Function (Summary & Analytics)",
  "executionTimeMs": 14,
  "timestamp": "2026-10-06T04:45:00.000Z",
  "overview": {
    "totalStudents": 8,
    "averageGPA": 8.86,
    "highestGPA": 9.8,
    "lowestGPA": 7.9,
    "averageAttendance": 89.5
  },
  "topPerformers": [
    {
      "rank": 1,
      "rollNumber": "AI2024-003",
      "name": "Rohan Patel",
      "department": "Data Science & AI",
      "course": "B.Tech",
      "semester": 4,
      "gpa": 9.8,
      "attendance": "98%",
      "skills": ["PyTorch", "TensorFlow", "NLP"]
    }
  ],
  "departmentStats": [
    {
      "department": "Computer Science",
      "studentsCount": 2,
      "averageGPA": 9.35,
      "highestGPA": 9.6,
      "averageAttendance": "92.0%"
    }
  ]
}
```

---

### 2. Student CRUD API Endpoints

| Method | Endpoint | Description | Sample Query / Body |
|---|---|---|---|
| `GET` | `/api/students` | Get all students (search, filter, sort) | `?search=Aarav&department=Computer Science&sortBy=gpa&order=desc` |
| `GET` | `/api/students/:id` | Get student by MongoDB `_id` or `rollNumber` | e.g. `/api/students/CS2024-001` |
| `POST` | `/api/students` | Create new student | See JSON body below |
| `PUT` | `/api/students/:id` | Update student details | See JSON body below |
| `DELETE` | `/api/students/:id` | Delete student record | Parameter in URL |

#### Sample `POST /api/students` Request Body:
```json
{
  "rollNumber": "CS2024-099",
  "name": "Priya Sharma",
  "email": "priya.sharma@example.edu",
  "department": "Computer Science",
  "course": "B.Tech",
  "semester": 6,
  "gpa": 9.5,
  "attendance": 96,
  "skills": ["React", "Node.js", "Docker", "AWS"]
}
```

#### Sample `PUT /api/students/CS2024-099` Request Body:
```json
{
  "gpa": 9.7,
  "attendance": 98,
  "skills": ["React", "Node.js", "Docker", "AWS", "Kubernetes"]
}
```

---

## ☁️ Deploying as a Serverless Function

### Deploying to Vercel
1. Install Vercel CLI or connect via GitHub:
   ```bash
   npm i -g vercel
   vercel
   ```
2. In the Vercel Project Dashboard, navigate to **Settings** → **Environment Variables** and add:
   - `MONGODB_URI`: Your MongoDB Atlas Connection String.
3. Your endpoints will be live at:
   - Read-only Summary Serverless Function: `https://<your-project>.vercel.app/api/summary`
   - Express CRUD API: `https://<your-project>.vercel.app/api/students`

### Deploying to Netlify
1. Connect repository to Netlify.
2. In **Site Configuration** → **Environment Variables**, add `MONGODB_URI`.
3. Netlify automatically reads `netlify.toml` and exposes:
   - Serverless Summary: `https://<your-project>.netlify.app/api/summary`
