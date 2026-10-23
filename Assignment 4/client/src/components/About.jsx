import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Brain, Terminal, Shield, Sparkles } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3"
          >
            <User className="w-3.5 h-3.5" />
            <span>PERSONAL SUMMARY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900"
          >
            About <span className="text-gradient">Sarthak Solanke</span>
          </motion.h2>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo Mask / Visual Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Glowing Backdrop Mesh */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-2xl transform scale-90 animate-pulse-slow"></div>

            {/* Blob Image Mask Container */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-[35%_65%_70%_30%/30%_30%_70%_70%] bg-gradient-to-tr from-cyan-500 via-sky-500 to-purple-600 p-1.5 shadow-2xl shadow-cyan-500/20 overflow-hidden group">
              <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-slate-100 rounded-[34%_64%_69%_31%/31%_31%_69%_69%] overflow-hidden relative">
                
                {/* Real Profile Photo */}
                <img
                  src={siteConfig.profileImage}
                  alt="Sarthak Raju Solanke"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-105Contrast-105"
                />

                {/* Subtle Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Badge Overlay */}
                <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xl">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono text-slate-200">AI / ML Engineer</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="glass-card p-6 sm:p-8 relative">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Terminal className="w-5 h-5" />
              </div>

              <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-base sm:text-lg leading-relaxed font-sans">
                {siteConfig.aboutText}
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
                  <Award className="w-4 h-4" />
                  <span>5-STAR C++</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">HackerRank Certified Proficiency</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold mb-1">
                  <Brain className="w-4 h-4" />
                  <span>AI & ML MASTER</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">67-Hr Deep Learning Cert</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 dark:bg-slate-900/40 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
                  <Shield className="w-4 h-4" />
                  <span>HACKATHON WINNER</span>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600">1st Prize Brains & Bots</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
