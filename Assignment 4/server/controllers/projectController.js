const Project = require('../models/Project');

// Fallback seed projects in case database is empty or not connected
const fallbackProjects = [
  {
    _id: 'fallback-1',
    title: 'Medi-4-U',
    description: 'Designed and developed a comprehensive platform dedicated to facilitating medicine donations, connecting donors with communities in need.',
    role: 'Full-Stack Developer',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    githubLink: '#', // TODO: Add actual GitHub repository URL
    demoLink: '#',   // TODO: Add live demo URL
    featured: true,
    category: 'Web Development / Healthcare Tech'
  },
  {
    _id: 'fallback-2',
    title: 'Hostel Water Waste Monitoring System',
    description: 'Structured the technical system report and design framework for an IoT-inspired monitoring system aimed at tracking and reducing water usage and waste in hostel facilities.',
    role: 'System Architect & Technical Lead',
    techStack: ['Python', 'IoT Concepts', 'Data Analysis', 'System Design', 'C++'],
    githubLink: '#', // TODO: Add actual GitHub repository URL
    demoLink: '',    // TODO: Add live demo URL if available
    featured: true,
    category: 'IoT & System Architecture'
  }
];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    // Check if mongoose is connected
    const projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      return res.status(200).json({
        success: true,
        source: 'seed-fallback',
        count: fallbackProjects.length,
        data: fallbackProjects
      });
    }
    return res.status(200).json({
      success: true,
      source: 'database',
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    return res.status(200).json({
      success: true,
      source: 'error-fallback',
      count: fallbackProjects.length,
      data: fallbackProjects,
      error: error.message
    });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (Admin/Seed route)
const createProject = async (req, res) => {
  try {
    const { title, description, role, techStack, githubLink, demoLink, featured, category } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const project = await Project.create({
      title,
      description,
      role: role || 'Developer',
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
      githubLink: githubLink || '',
      demoLink: demoLink || '',
      featured: featured !== undefined ? featured : true,
      category: category || 'AI & Full-Stack'
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Public (Admin route)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    await project.deleteOne();
    res.status(200).json({ success: true, message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  deleteProject
};
