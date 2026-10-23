import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 max-w-md"
      >
        <div
          className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/90 border-rose-500/40 text-rose-100'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-sm font-sans">
            <h4 className="font-outfit font-bold mb-0.5">
              {toast.type === 'success' ? 'Message Sent!' : 'Submission Error'}
            </h4>
            <p className="text-xs opacity-90 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
