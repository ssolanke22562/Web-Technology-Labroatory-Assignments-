import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Github, ExternalLink, Tag, RefreshCw, AlertCircle, Sparkles, UserCheck } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('loading');

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        setProjects(result.data);
        setDataSource(result.source || 'MongoDB API');
      } else {
        // Fallback to local config data if MongoDB API yields empty array
        setProjects(siteConfig.fallbackProjects);
        setDataSource('Static Configuration (Seed)');
      }
    } catch (err) {
      console.warn('Backend API request failed, loading fallback projects:', err.message);
      setProjects(siteConfig.fallbackProjects);
      setDataSource('Fallback Configuration');
      setError('Express API offline or loading locally');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative z-10 bg-slate-900/30 dark:bg-slate-900/30 light:bg-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900"
          >
            Software & <span className="text-gradient">AI Systems</span>
          </motion.h2>

          {/* API Status Indicator */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>REST API Endpoint: <code className="text-cyan-400 bg-slate-900 px-2 py-0.5 rounded">GET /api/projects</code></span>
            <button
              onClick={fetchProjects}
              title="Refresh Projects API"
              className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
            <p className="font-mono text-sm text-cyan-400">Fetching projects from MongoDB Atlas API...</p>
          </div>
        )}

        {/* Project Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const hasGithub = project.githubLink && project.githubLink.trim() !== '';
              const hasDemo = project.demoLink && project.demoLink.trim() !== '';

              return (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="glass-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Decorative Gradient Line on top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {project.category || 'Web / AI Project'}
                      </span>

                      {project.role && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                          <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                          <span>{project.role}</span>
                        </div>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3 text-cyan-400" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                    {/* GitHub Link */}
                    {hasGithub ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs font-mono font-semibold hover:bg-slate-700 hover:text-white transition-all hover:scale-105"
                      >
                        <Github className="w-4 h-4 text-cyan-400" />
                        <span>GitHub Repo</span>
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 italic">GitHub Link Coming Soon</span>
                    )}

                    {/* Live Demo Link */}
                    {hasDemo ? (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-mono font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    ) : null}
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
