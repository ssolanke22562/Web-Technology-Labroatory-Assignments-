import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Users, Calendar, CheckCircle } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export const Certifications = () => {
  const getIcon = (title) => {
    if (title.includes('Udemy') || title.includes('AI')) return <Award className="w-6 h-6 text-purple-400" />;
    if (title.includes('First Prize') || title.includes('Winner')) return <Trophy className="w-6 h-6 text-amber-400" />;
    if (title.includes('HackerRank') || title.includes('5-Star')) return <Star className="w-6 h-6 text-emerald-400" />;
    return <Users className="w-6 h-6 text-cyan-400" />;
  };

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3"
          >
            <Award className="w-3.5 h-3.5" />
            <span>HONORS & CERTIFICATES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900"
          >
            Certifications & <span className="text-gradient">Achievements</span>
          </motion.h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.certifications.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-center shadow-inner">
                    {getIcon(item.title)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800/80 text-cyan-400 border border-slate-700">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-outfit font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Issuer / Date */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4">
                  <span className="text-purple-400 font-semibold">{item.organization}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Bottom Verification Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Verified Accomplishment</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
