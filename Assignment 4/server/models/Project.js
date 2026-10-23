const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  role: {
    type: String,
    default: 'Developer'
  },
  techStack: [{
    type: String
  }],
  githubLink: {
    type: String,
    default: ''
  },
  demoLink: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: 'AI & Full-Stack'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
