# 📐 Reference Specification: Aura Animated Portfolio Replica

This document serves as the **authoritative blueprint and reverse-engineered specification** for rebuilding the portfolio into a pixel-accurate, motion-accurate replica of the **Aura Animated Designer Portfolio** (`https://aura-animated-designer-portfolio-zip-review-v1.21st.app/`), populated exclusively with **Sarthak Raju Solanke's verified academic, technical, project, and leadership content**.

---

## 1. Executive Summary & Stack Architecture

| Layer | Technology | Role & Configuration |
|---|---|---|
| **Framework** | **Next.js 14+ (App Router, TypeScript)** | Modern React server & client components with SSR-safe dynamic imports |
| **Motion Engine** | **GSAP 3.12+ & ScrollTrigger** | Pinned viewports, scroll scrub timelines, staggered text reveals, split-text physics |
| **Smooth Scroll** | **Lenis (latest)** | Inertial smooth-scroll synced with `gsap.ticker.add((time) => lenis.raf(time * 1000))` |
| **Physics Simulation** | **Matter.js** | 2D rigid-body simulation for falling typography chips & letters with drag constraints |
| **3D Graphics** | **Three.js (WebGL Canvas)** | Interactive architectural & abstract 3D elements, orbital camera easing on scroll/mouse |
| **Styling & Design Tokens**| **Tailwind CSS & Vanilla CSS Variables** | Bespoke typography scaling, blend modes (`mix-blend-difference`), glassmorphic panels |
| **AI Assistant** | **Google Gemini API (`gemini-1.5-flash`)** | Route handler at `/api/chat` grounded strictly on Sarthak's verified resume |
| **Interactive Features** | **Chess Minimax Bot & Resume Downloader** | Integrated seamlessly without disrupting reference visual aesthetics |

---

## 2. Design Tokens & Visual Specs

### 2.1 Color Palette
- **Base Canvas (Dark Theme / Core Background)**: `#09090B` / `#000000`
- **Light Sections / Canvas Accent**: `#E8E8E8` / `#F3F4F6` (Off-white / high-contrast panels)
- **Primary Text**: `#FFFFFF` (Dark scenes) / `#000000` (Light scenes)
- **Muted Text / Metadata**: `#888888` / `#6B7280` / `#9CA3AF`
- **Borders & Dividers**: `rgba(255, 255, 255, 0.12)` / `rgba(0, 0, 0, 0.1)`
- **Glassmorphism Panels**: `rgba(18, 24, 38, 0.75)` with `backdrop-filter: blur(16px)`
- **Accent Glows**: Soft radial gradient `rgba(99, 102, 241, 0.15)` and `rgba(6, 182, 212, 0.12)`

### 2.2 Typography Hierarchy
- **Display Headlines**: Heavy Condensed Sans-serif (`Syne`, `Impact`, `Sofia Sans Extra Condensed`, `Plus Jakarta Sans 800`)
  - Hero Display: `clamp(48px, 11vw, 160px)`, `letter-spacing: -0.04em`, `line-height: 0.9`
  - Section Headings: `clamp(32px, 6vw, 84px)`, `text-transform: uppercase`
- **Subheadings & Tracked Labels**: Uppercase with wide letter-spacing (`letter-spacing: 0.25em` to `0.4em`), `font-size: 11px - 14px`
- **Body / Technical Labels**: `Space Grotesk` / `JetBrains Mono` / `Inter`, `font-size: 14px - 16px`, `line-height: 1.6`
- **Navigation Brackets**: Monospaced uppercase: `[ ABOUT ME ]`, `[ WORKS ]`, `[ SERVICES ]`, `[ CONNECT ]`

---

## 3. Detailed Section-by-Section Blueprint

### Section 1: Top Navigation Bar & Mobile Drawer
- **Desktop (≥1024px)**:
  - **Left**: Stacked branding title `SARTHAK SOLANKE` (`B.Tech CSE '27`).
  - **Center**: Bracket-styled navigation links: `[ ABOUT ME ]`, `[ WORKS ]`, `[ SERVICES ]`, `[ ACHIEVEMENTS ]`, `[ CONNECT ]`.
  - **Right**: Floating CTA button `CONTACT ME ↗` and `RESUME 📄`.
  - **Blend Mode & Fixed Position**: `position: fixed; top: 0; z-index: 100; mix-blend-mode: difference; color: #fff`.
- **Mobile (<1024px)**:
  - Hamburger toggle (`≡` / 2-line animated SVG).
  - Fullscreen sliding glass drawer containing navigation links, live local time (`IST`), location (`Kopargaon, MH, India`), and direct contact triggers.

### Section 2: Hero Section
- **Visuals**:
  - Tracked out uppercase subtitle: `B A S E D  I N  I N D I A`
  - Giant condensed headline: `FULL-STACK & AI DEVELOPER`
  - Framed central visual: High-contrast profile portrait / 3D interactive aura canvas.
  - Skills pills on bottom-left: `/ MERN STACK`, `/ GEMINI AI INTEGRATIONS`, `/ IOT & EMBEDDED`, `/ CYBERSECURITY VP`.
  - Bottom scroll indicator with micro-pulsing arrow.

### Section 3: About & Matter.js Physics Typography Section
- **Header Meta**: Index `02/05`, label `FOR ME`, category `ARCH/SYS`.
- **Interactive Matter.js Physics Canvas**:
  - Rigid body physics simulation with gravity and restitution.
  - Falling text blocks / letter pills: `TECHNOLOGY IS NOT JUST BUILT, BUT ARCHITECTED FOR SCALE AND IMPACT.`
  - Interactive mouse constraint allowing visitors to grab, throw, and bounce word chips.
  - Reset & responsive boundary adjustments on resize.
- **Systems Architecture Bio**:
  - Giant lead text: `I DON'T JUST BUILD APPS — I ARCHITECT SCALABLE FULL-STACK SYSTEMS & AI WORKFLOWS.`
  - Bio paragraph detailing Sarthak's background in B.Tech CSE at SCOE, MERN development, Gemini AI engineering, and IoT hardware.

### Section 4: Services & Technical Offerings
- **Layout**: Split-screen with pinned interactive 3D scene on one side and interactive service cards on the other.
- **Services Content**:
  1. `Full-Stack & MERN Engineering`: Scalable React & Node.js architectures, REST APIs, MongoDB, Supabase.
  2. `AI & Gemini API Integrations`: Prompt engineering, LLM automated workflows, and data-driven intelligent apps.
  3. `IoT & Embedded Systems`: ESP32, ESP8266, Raspberry Pi 4, YOLOv8 object detection, and sensor integration.
  4. `Cybersecurity & CTF Leadership`: Web exploitation, cryptography, executive leadership of 18+ member council.

### Section 5: Case Studies & Selected Projects
- **Showcase Cards**:
  1. `Nexus AI`: Prompt-to-Visual Architecture Platform (MERN Stack, Google Gemini API).
  2. `Medi-4-U`: Medicine Donation & Redistribution Platform (Supabase, Role-Based Auth, Real-time Inventory).
  3. `AquaGuard`: Hostel Wastewater Monitoring System (ESP8266, YF-S201 Flow Sensor, IoT).
  4. `Smart Assistive Walking Stick`: Hybrid Computer Vision & Sensor Navigation (Raspberry Pi 4, ESP32, YOLOv8 Nano).
  5. `Dental Clinic Platform`: Client Website with Online Booking & Patient Portals.
- **Card Interaction**: Hover image scale, animated tag chips, case-study modal details (`Problem`, `Approach`, `Tech Stack`, `Outcome`, `Repo Link`).

### Section 6: Achievements, Experience & Leadership
- **Experience Timeline**:
  - `AI/ML Engineer Intern` at Persevex (3 Months)
  - `AI Intern` at Unprof.Ai (1 Month)
  - `Virtual Experience Simulation` at Deloitte & JPMorgan Chase
- **Leadership & Honors**:
  - `Vice President` - Cyber Security Club (CSC), SCOE (Leading 18+ members, 150+ student CTFs)
  - `Lead Anchor` - SARC & EDC Cells (300+ attendees)
  - `8th Rank Nationwide` - HackIndia Spark-12 Hackathon
  - `5-Star Rating in 5 Domains` - HackerRank (SQL, Java, Python, C++, Problem Solving)

### Section 7: Interactive Features (Extras)
- **AI Digital Assistant (`/api/chat`)**: Sleek floating glassmorphic chat widget powered by Google Gemini API, grounded exclusively in Sarthak's resume.
- **Interactive Chess Minimax Bot**: Playable chess engine easter-egg matching the dark aesthetic.

### Section 8: Contact Flow & Footer
- **Contact Headline**: `LET'S START THE CONVERSATION` / `GREAT WORK STARTS WITH GREAT COLLABS`
- **Working Form**: `YOUR NAME*`, `YOUR EMAIL*`, `SUBJECT / SERVICE`, `YOUR MESSAGE*` with client validation and submission state.
- **Socials**: GitHub (`github.com/ssolanke22562`), Instagram (`_whoissmith`), LinkedIn (placeholder), Email (`sarthaksolanke71@gmail.com`).
- **Footer**: Stacked branding `SARTHAK SOLANKE`, live IST clock, location `KOPARGAON, MH, INDIA`, "Download Resume" CTA.

---

## 4. Breakpoint Specifications

| Breakpoint | Width | Navigation | Layout Adjustments |
|---|---|---|---|
| **Desktop Large** | `1440px+` | Full bracket navbar | Full 2-column pinned 3D & Matter.js split scenes |
| **Desktop / Laptop** | `1024px - 1439px` | Full bracket navbar | Adjusted typography scale (`clamp`), padded grid |
| **Tablet** | `768px - 1023px` | Mobile drawer toggle | Stacked 3D canvases, 1-column project cards |
| **Mobile** | `390px - 767px` | Mobile drawer toggle | Fluid single-column, touch-optimized drag constraints |
