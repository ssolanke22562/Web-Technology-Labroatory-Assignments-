import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code, ArrowRight, Download, Send, Sparkles, Terminal, Instagram, Binary } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullTagline = siteConfig.tagline;
  const [isTyping, setIsTyping] = useState(true);

  // Animated Typing Effect for Tagline
  useEffect(() => {
    let index = 0;
    let timer;

    const typeNextChar = () => {
      if (index < fullTagline.length) {
        setDisplayText(fullTagline.substring(0, index + 1));
        index++;
        timer = setTimeout(typeNextChar, 35);
      } else {
        setIsTyping(false);
      }
    };

    timer = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timer);
  }, [fullTagline]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-mono mb-6 shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-400 font-semibold">Available for AI & Software Projects</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        </motion.div>

        {/* Name Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-outfit font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 mb-4"
        >
          Hi, I'm{' '}
          <span className="text-gradient hover:drop-shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300">
            {siteConfig.name}
          </span>
        </motion.h1>

        {/* Animated Typing Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="min-h-[3rem] flex items-center justify-center mb-6"
        >
          <p className="text-base sm:text-xl font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-600 max-w-3xl leading-relaxed">
            <span>{displayText}</span>
            {isTyping && <span className="cursor-blink font-bold text-purple-400"></span>}
          </p>
        </motion.div>

        {/* Headline Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          "{siteConfig.headline}"
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* View Projects CTA */}
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Download Resume CTA */}
          <a
            href={siteConfig.resumeUrl}
            download="Sarthak_Solanke_Resume.pdf"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
          >
            <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </a>

          {/* Contact Me CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-purple-500/40 font-semibold text-purple-300 dark:text-purple-300 light:text-purple-700 hover:bg-purple-500/10 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
          >
            <Send className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            <span>Contact Me</span>
          </a>
        </motion.div>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {/* LinkedIn */}
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* GitHub */}
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-purple-400 hover:border-purple-500/50 hover:scale-110 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* HackerRank */}
          <a
            href={siteConfig.socials.hackerrank}
            target="_blank"
            rel="noopener noreferrer"
            title="HackerRank Profile (5-Star C++)"
            className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-1.5"
          >
            <Code className="w-5 h-5" />
            <span className="text-xs font-mono font-bold text-emerald-400 hidden sm:inline">5★ C++</span>
          </a>

          {/* LeetCode */}
          <a
            href={siteConfig.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode Profile"
            className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-amber-400 hover:border-amber-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-1.5"
          >
            <Binary className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 hidden sm:inline">LeetCode</span>
          </a>

          {/* Instagram */}
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Profile"
            className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-pink-400 hover:border-pink-500/50 hover:scale-110 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
