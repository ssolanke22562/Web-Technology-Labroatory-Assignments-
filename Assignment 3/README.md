# Modern HTML, CSS, JavaScript Registration Form with PHP Server Backend

This repository contains a full-stack form application built with **HTML5**, **CSS3 (Glassmorphism & CSS Variables)**, **Vanilla JavaScript (ES6)**, and a **PHP Server Backend** for request sanitization and server-side validation.

---

## 📁 File Structure

- [`index.html`](file:///c:/Users/sarth/OneDrive/Desktop/Sem%205/WTL/ASs%203/index.html) — Modern semantic HTML form structure with accessibility attributes.
- [`styles.css`](file:///c:/Users/sarth/OneDrive/Desktop/Sem%205/WTL/ASs%203/styles.css) — Custom glassmorphism design system, floating label animations, and responsive layouts.
- [`script.js`](file:///c:/Users/sarth/OneDrive/Desktop/Sem%205/WTL/ASs%203/script.js) — Real-time client-side validation, password strength meter, and `fetch()` AJAX submission.
- [`process.php`](file:///c:/Users/sarth/OneDrive/Desktop/Sem%205/WTL/ASs%203/process.php) — PHP backend server script that receives POST data, sanitizes inputs, handles server-side validation, and returns JSON or HTML.
- [`README.md`](file:///c:/Users/sarth/OneDrive/Desktop/Sem%205/WTL/ASs%203/README.md) — Documentation and running instructions.

---

## 🚀 How to Run the Application

### Option 1: Using Built-in PHP Development Server (Recommended)

1. Open your terminal or Command Prompt in this folder (`c:\Users\sarth\OneDrive\Desktop\Sem 5\WTL\ASs 3`).
2. Start the built-in PHP server:
   ```bash
   php -S localhost:8000
   ```
3. Open your browser and navigate to:
   ```http
   http://localhost:8000
   ```

### Option 2: Using XAMPP / WAMP / MAMP

1. Copy or move this folder (`ASs 3`) into your server's root directory:
   - For **XAMPP**: `C:\xampp\htdocs\ASs 3`
   - For **WAMP**: `C:\wamp64\www\ASs 3`
2. Start Apache from the XAMPP / WAMP Control Panel.
3. Open your browser and visit:
   ```http
   http://localhost/ASs 3
   ```

### Option 3: Direct Browser Preview (Offline Simulation Mode)

Double-click [`index.html`](file:///c:/Users/sarth/OneDrive/Desktop/Sem%205/WTL/ASs%203/index.html) to open it directly in any browser. All client-side validations, password strength meters, and interactive visual feedback will function out of the box! If submitted without an active PHP server, the JavaScript automatically simulates the PHP server JSON response for instant demo purposes.

---

## 🌟 Key Features

1. **Client-Side Real-Time Validation**: Instant feedback for email format, 10-digit phone number, password strength, and password matching.
2. **Password Strength Meter**: Dynamic color-coded bar (Weak, Medium, Strong, Excellent) based on length, uppercase, numbers, and special characters.
3. **Server-Side Sanitization & Validation (`process.php`)**: Protects against XSS using `htmlspecialchars()` and `filter_var()`.
4. **Dual Response Mode**:
   - **AJAX (Fetch)**: Returns structured JSON response (`application/json`) displayed in a server payload popup.
   - **Traditional HTML Form**: Displays a formatted server confirmation card with a breakdown of submitted data.
5. **Modern Glassmorphism UI**: Glowing ambient background, dark mode palette, custom checkboxes, floating input labels, and responsive layout.
