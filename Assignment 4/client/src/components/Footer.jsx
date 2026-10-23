import React from 'react';
import { ArrowUp, Github, Linkedin, Code, Cpu, Instagram, Binary } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/90 dark:bg-slate-950/90 light:bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 dark:bg-slate-950 light:bg-white rounded-[10px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 block text-sm">
                Sarthak Raju Solanke
              </span>
              <span className="text-xs font-mono text-slate-400">
                CSE Student (Class of 2028) • Sanjivani College of Engineering
              </span>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-2.5">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 hover:text-cyan-400 hover:scale-110 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 hover:text-purple-400 hover:scale-110 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.socials.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all"
              title="HackerRank Profile (5-Star C++)"
            >
              <Code className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 hover:text-amber-400 hover:scale-110 transition-all"
              title="LeetCode"
            >
              <Binary className="w-4 h-4 text-amber-400" />
            </a>

            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-400 hover:text-pink-400 hover:scale-110 transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>© {new Date().getFullYear()} Sarthak Solanke. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-cyan-400 hover:scale-110 active:scale-95 transition-all shadow-md flex items-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
