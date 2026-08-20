import React from 'react';
import { motion } from 'motion/react';

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden select-none">
      {/* Base vertical gradient background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #0d3b9e 0%, #1148B8 28%, #0EA5D8 58%, #78c3e8 82%, #ffffff 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(180deg, #0d3b9e 0%, #1148B8 28%, #0EA5D8 58%, #78c3e8 82%, #ffffff 100%)',
            'linear-gradient(180deg, #0b328a 0%, #0e40aa 30%, #0b96c7 60%, #8acde8 85%, #ffffff 100%)',
            'linear-gradient(180deg, #0d3b9e 0%, #1148B8 28%, #0EA5D8 58%, #78c3e8 82%, #ffffff 100%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 45-degree diagonal stripe pattern overlay with subtle animation */}
      <motion.div
        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.18),
            rgba(255, 255, 255, 0.18) 12px,
            transparent 12px,
            transparent 24px
          )`,
          backgroundSize: '48px 48px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '48px 48px'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Dynamic ambient floating light glow */}
      <motion.div
        className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-300/20 blur-[120px]"
        animate={{
          x: [-40, 40, -40],
          y: [-20, 30, -20],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Soft light shimmer ray */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default DynamicBackground;
