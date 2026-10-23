# WTL Assignment 6: React API Data Fetching with Axios

A modern React application demonstrating asynchronous data integration from public REST APIs using **Axios**, complete with robust state management for **Loading**, **Error**, and **Success** states, search filtering, and interactive error/latency simulations.

---

## 🎯 Objectives & Problem Statement
- **Axios HTTP Client**: Use Axios to perform asynchronous GET requests against REST API endpoints.
- **Component Data Presentation**: Render the fetched data into responsive, glassmorphic UI components (`UserCard`, `PostCard`).
- **Loading State**: Manage real-time visual loading indicators and shimmering skeleton placeholders.
- **Error State Management**: Catch and analyze HTTP and network errors with diagnostics and a retry mechanism.
- **Interactive Controls**: Provide endpoint switching (`/users` vs `/posts`), search filters, refresh triggers, and error simulations.

---

## 🛠️ Tech Stack
- **Library / Framework**: React 19 + Vite 8
- **HTTP Client**: Axios `^1.8.0`
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphic Dark Aesthetics)
- **Data Source**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/) Public REST API

---

## 📁 Project Structure
```
Assignment 6/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ControlPanel.jsx     # Tabs, search bar, refetch & error simulation toggles
│   │   ├── EmptyState.jsx       # Zero search results component
│   │   ├── ErrorAlert.jsx       # Error banner with HTTP status code and retry action
│   │   ├── Header.jsx           # App title and student details
│   │   ├── LoadingSkeleton.jsx  # Shimmering skeleton cards
│   │   ├── PostCard.jsx         # Card component for post data
│   │   ├── StatsBanner.jsx      # Real-time metrics: items loaded, latency, HTTP status
│   │   └── UserCard.jsx         # Card component with avatar, company badge, contact links
│   ├── App.css                  # Component styling and responsive design
│   ├── App.jsx                  # Main application & Axios lifecycle logic
│   ├── index.css                # Global tokens, resets, typography
│   └── main.jsx                 # Vite application entry point
├── index.html                   # HTML document root with Google Fonts
├── package.json                 # Project dependencies & scripts
└── README.md                    # Assignment documentation
```

---

## 🚀 Getting Started Locally

### 1. Navigate to Assignment 6 Directory
```bash
cd "Assignment 6"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:5174/`** (or the port indicated in your terminal) in your browser.

---

## 💡 Key Architectural Concepts

### 1. Axios Request Lifecycle & State Hooks
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchData = async (signal) => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(endpoint, { signal });
    setData(response.data);
  } catch (err) {
    if (!axios.isCancel(err)) {
      setError({
        message: err.message,
        status: err.response?.status,
        code: err.code
      });
    }
  } finally {
    setLoading(false);
  }
};
```

### 2. Memory Leak Prevention via `AbortController`
Pending network requests are automatically cancelled if the user changes tabs or the component unmounts:
```javascript
useEffect(() => {
  const controller = new AbortController();
  fetchData(controller.signal);
  return () => controller.abort();
}, [fetchData]);
```

### 3. Interactive Testing for Evaluators
- **Simulate Error Button**: Intentionally triggers a `404 Not Found` request to demonstrate the error UI and retry capabilities.
- **Slow Net Button**: Adds a 1.5-second artificial delay so evaluators can inspect the animated skeleton loader.

---

## 👨‍💻 Author
- **Sarthak Raju Solanke**
- Computer Engineering, Sanjivani College of Engineering
- GitHub: [@ssolanke22562](https://github.com/ssolanke22562)
