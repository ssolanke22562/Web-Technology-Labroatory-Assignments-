const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const initialProjects = [
  {
    title: 'Medi-4-U',
    description: 'Designed and developed a comprehensive platform dedicated to facilitating medicine donations, bridging the gap between donors and underprivileged healthcare seekers.',
    role: 'Full-Stack Developer',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    githubLink: '', // TODO: Add GitHub repo link (e.g., https://github.com/SarthakSolanke/Medi-4-U)
    demoLink: '',   // TODO: Add live demo URL if available
    featured: true,
    category: 'Web Development / Healthcare Tech'
  },
  {
    title: 'Hostel Water Waste Monitoring System',
    description: 'Structured the technical system report and design framework for an IoT-inspired monitoring system aimed at tracking and reducing water usage and waste in hostel facilities.',
    role: 'System Architect & Technical Lead',
    techStack: ['Python', 'IoT Design Framework', 'Data Analysis', 'C++', 'System Engineering'],
    githubLink: '', // TODO: Add GitHub repo link (e.g., https://github.com/SarthakSolanke/Hostel-Water-Monitoring)
    demoLink: '',   // TODO: Add live demo URL if available
    featured: true,
    category: 'IoT & Environmental Tech'
  }
];

const seedDatabase = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.error('❌ MONGODB_URI is not defined in environment variables (.env)');
      process.exit(1);
    }

    await mongoose.connect(connStr);
    console.log('✅ Connected to MongoDB Atlas for Seeding...');

    await Project.deleteMany({});
    console.log('🗑️ Existing projects purged.');

    const createdProjects = await Project.insertMany(initialProjects);
    console.log(`🚀 Successfully seeded ${createdProjects.length} projects:`);
    createdProjects.forEach(p => console.log(` - ${p.title} (${p.category})`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error Seeding Database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
