'use client';

import React, { useState } from 'react';
import AssistantModal from './AssistantModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <AssistantModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      {/* Mensaje flotante tipo tooltip */}
      {hover && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-24 right-6 z-40 bg-white/10 text-white text-sm px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 shadow-xl"
        >
          💬 GeimserBot está aquí para ayudarte
        </motion.div>
      )}

      <motion.button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-lg backdrop-blur-xl border border-white/20 animate-pulse hover:animate-none"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default FloatingChatWidget;