import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code, Brain, Zap, Star, Check } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');

  const { languages, coreCompetencies, recognizedProficiency } = siteConfig.skills;

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900"
          >
            Skills & <span className="text-gradient">Technical Stack</span>
          </motion.h2>
        </div>

        {/* Featured HackerRank 5-Star Spotlight Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-cyan-950/60 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/20">
              <Zap className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-mono text-emerald-400 font-bold ml-2">RECOGNIZED PROFICIENCY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-outfit font-bold text-slate-100">
                5-Star C++ Rating on HackerRank
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Demonstrated advanced proficiency in C++ memory management, complex data structure implementations, and competitive problem solving.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.socials.hackerrank}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold transition-all hover:scale-105 shrink-0"
          >
            Verify Profile →
          </a>
        </motion.div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Programming Languages
                </h3>
                <p className="text-xs font-mono text-slate-400">Core software engineering languages</p>
              </div>
            </div>

            <div className="space-y-5">
              {languages.map((lang) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-mono font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                      <span>{lang.name}</span>
                      {lang.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                          {lang.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{lang.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Core Competencies (AI/ML & DSA) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Core CS & AI/ML Competencies
                </h3>
                <p className="text-xs font-mono text-slate-400">Algorithmic & Intelligent Systems</p>
              </div>
            </div>

            <div className="space-y-5">
              {coreCompetencies.map((comp) => (
                <div key={comp.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-mono font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                      <span>{comp.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {comp.category}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-purple-400 font-semibold">{comp.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${comp.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
