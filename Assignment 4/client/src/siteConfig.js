/**
 * Centralized Configuration & Placeholder Store for Sarthak Raju Solanke's Portfolio
 */

export const siteConfig = {
  // Personal Details
  name: "Sarthak Raju Solanke",
  age: 20,
  title: "Computer Science Engineering Student",
  tagline: "Computer Science Engineering Student | AI & Machine Learning Enthusiast | Problem Solver",
  headline: "Building intelligent systems and robust applications. Passionate about algorithms, data structures, and continuous learning.",
  institution: "Sanjivani College of Engineering",
  graduationYear: 2028,
  profileImage: "/sarthak-photo.jpg",

  // Contact Information & Links
  email: "sarthak.solanke@example.com", // TODO: Update with your primary email if desired
  
  socials: {
    linkedin: "https://www.linkedin.com/in/sarthak-solanke-7435a1328", 
    github: "https://github.com/ssolanke22562",   
    hackerrank: "https://www.hackerrank.com/profile/sarthaksolanke71",
    leetcode: "https://leetcode.com/u/wth_smith/",
    instagram: "https://www.instagram.com/_whoissmith/"
  },

  // Resume File Link
  resumeUrl: "/resume-placeholder.pdf",

  // Biography text
  aboutText: "Hello! I am Sarthak, a 20-year-old Computer Science Engineering student currently pursuing my degree at Sanjivani College of Engineering (Class of 2028). I am deeply passionate about writing clean code, exploring cutting-edge artificial intelligence, and participating in technical hackathons. When I am not optimizing algorithms or building machine learning models, I am actively engaged in student leadership and community events on campus.",

  // Fallback / Seed Projects Data
  fallbackProjects: [
    {
      _id: "p1",
      title: "Medi-4-U",
      description: "Designed and developed a comprehensive platform dedicated to facilitating medicine donations, connecting surplus healthcare resources with communities in need.",
      role: "Full-Stack Developer", 
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
      githubLink: "https://github.com/ssolanke22562", 
      demoLink: "",   
      featured: true,
      category: "Web Development / Healthcare Tech"
    },
    {
      _id: "p2",
      title: "Hostel Water Waste Monitoring System",
      description: "Structured the technical system report and design framework for an IoT-inspired monitoring system aimed at tracking and reducing water usage and waste in hostel facilities.",
      role: "System Architect & Technical Lead",
      techStack: ["Python", "IoT Framework", "Data Analysis", "System Design", "C++"],
      githubLink: "https://github.com/ssolanke22562", 
      demoLink: "",   
      featured: true,
      category: "IoT & Environmental Systems"
    }
  ],

  // Skills
  skills: {
    languages: [
      { name: "Python", level: 90, icon: "Code" },
      { name: "C++", level: 95, icon: "Zap", badge: "5-Star HackerRank" },
      { name: "C", level: 85, icon: "Terminal" },
      { name: "Java", level: 80, icon: "FileCode" },
      { name: "SQL", level: 82, icon: "Database" }
    ],
    coreCompetencies: [
      { name: "Data Structures & Algorithms (DSA)", level: 92, category: "Core CS" },
      { name: "Object-Oriented Programming (OOP)", level: 90, category: "Core CS" },
      { name: "Artificial Intelligence (AI)", level: 88, category: "AI/ML" },
      { name: "Machine Learning (ML)", level: 85, category: "AI/ML" },
      { name: "Deep Learning (DL)", level: 80, category: "AI/ML" }
    ],
    recognizedProficiency: [
      { 
        title: "5-Star C++ Rating", 
        platform: "HackerRank", 
        description: "Achieved top 5-star skill badge in competitive C++ programming and problem solving.",
        icon: "Award" 
      }
    ]
  },

  // Certifications & Achievements
  certifications: [
    {
      id: 1,
      title: "Udemy AI & ML Master Certification",
      date: "August 2026",
      organization: "Udemy",
      description: "67-hour comprehensive certification covering Artificial Intelligence, Machine Learning, and Deep Learning algorithms.",
      tag: "AI & ML Specialization"
    },
    {
      id: 2,
      title: "First Prize Winner — Brains and Bots",
      date: "2025/2026 Academic Year",
      organization: "Association of Computer Engineering Students (ACES)",
      description: "Awarded 1st Place in the flagship technical competition for innovative problem-solving and algorithmic code design.",
      tag: "Competition Award"
    },
    {
      id: 3,
      title: "5-Star C++ Badge",
      date: "Ongoing",
      organization: "HackerRank",
      description: "Ranked 5-Star in C++ language proficiency with extensive problem solving track record.",
      tag: "Recognized Skill"
    },
    {
      id: 4,
      title: "Hackathon Organizer — TenzorX National AI Hackathon",
      date: "April 2026",
      organization: "Unstop Platform",
      description: "Registered, coordinated, and managed submissions for the nationwide TenzorX AI Hackathon.",
      tag: "Event Leadership"
    }
  ],

  // Leadership & Extracurriculars
  leadership: [
    {
      id: 1,
      role: "Student Leadership Candidate & Active Member",
      organization: "Sanjivani Entrepreneurship Development (EDP) Cell",
      description: "Active participant and candidate for student leadership roles, promoting innovation, startup culture, and entrepreneurial workshops across campus.",
      icon: "Users"
    },
    {
      id: 2,
      role: "Community Event Coordinator",
      organization: "Student Alumni Relation Cell",
      description: "Contributed to building alumni bridges, coordinating networking summits, and strengthening student-alumni relationship events.",
      icon: "Handshake"
    },
    {
      id: 3,
      role: "Public Speaking & Cyber Awareness Anchor",
      organization: "Karmaveer Bhaurao Patil (KBP) School",
      description: "Experienced campus anchor and public speaker; recently conducted a dedicated Cyber Awareness Expert Session educating school students on digital security.",
      icon: "Mic"
    }
  ]
};
