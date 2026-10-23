import React from 'react';
import { motion } from 'framer-motion';
import { Users, Handshake, Mic, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Leadership = () => {
  const getIcon = (id) => {
    switch (id) {
      case 1:
        return <Building2 className="w-6 h-6 text-cyan-400" />;
      case 2:
        return <Handshake className="w-6 h-6 text-purple-400" />;
      case 3:
        return <Mic className="w-6 h-6 text-emerald-400" />;
      default:
        return <Users className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="leadership" className="py-24 relative z-10 bg-slate-900/30 dark:bg-slate-900/30 light:bg-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3"
          >
            <Users className="w-3.5 h-3.5" />
            <span>CAMPUS ENGAGEMENT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900"
          >
            Leadership & <span className="text-gradient">Extracurriculars</span>
          </motion.h2>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.leadership.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {getIcon(item.id)}
                </div>

                {/* Organization */}
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-2">
                  {item.organization}
                </span>

                {/* Role */}
                <h3 className="text-lg font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.role}
                </h3>

                {/* Description */}
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-purple-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Active Impact
                </span>
                <span className="text-slate-500 font-bold">2024–Present</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
