import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Education = () => {
  const educationHistory = [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: siteConfig.institution,
      location: "Kopargaon, Maharashtra, India",
      duration: "2024 - 2028 (Expected Graduation)",
      status: "In Progress",
      highlights: [
        "Specializing in Artificial Intelligence, Machine Learning & Algorithms",
        "Active member of Student Leadership bodies and EDP Cell",
        "High proficiency in Data Structures & C++ Competitive Programming"
      ]
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10 bg-slate-900/30 dark:bg-slate-900/30 light:bg-slate-100/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC JOURNEY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900"
          >
            Education & <span className="text-gradient">Academic Credentials</span>
          </motion.h2>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-slate-800 dark:border-slate-800 light:border-slate-300 ml-4 sm:ml-32 space-y-12">
          
          {educationHistory.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 sm:pl-10 group"
            >
              {/* Timeline Node Icon Pin */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 dark:bg-slate-950 light:bg-white border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-125 transition-transform duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
              </div>

              {/* Time Badge (Desktop Left Absolute) */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-28">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                  {item.duration.split(' ')[0]} - {siteConfig.graduationYear}
                </span>
              </div>

              {/* Card Container */}
              <div className="glass-card p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono text-cyan-400 sm:hidden">
                    {item.duration}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                  {item.degree}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm mt-2 mb-4 font-sans">
                  <div className="flex items-center gap-1.5 text-slate-200 dark:text-slate-200 light:text-slate-800 font-medium">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>{item.institution}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Academic Highlights */}
                <div className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 pt-4 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-300 dark:text-slate-300 light:text-slate-600 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
