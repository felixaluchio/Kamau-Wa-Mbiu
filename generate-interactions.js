import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');
const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');
const hooksDir = path.join(process.cwd(), 'src', 'hooks');

if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });

// 1. SmoothScroll.tsx
const smoothScrollCode = `import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
`;

// 2. CustomCursor.tsx
const customCursorCode = `import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const { pathname } = useLocation();

  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]');
      const isInteractive = target.closest('[data-cursor="interactive"]');
      
      if (isInteractive) {
        setIsHoveringInteractive(true);
        setIsHovering(false);
      } else if (isClickable) {
        setIsHovering(true);
        setIsHoveringInteractive(false);
      } else {
        setIsHovering(false);
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, pathname]);

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center border border-white/50"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: isHoveringInteractive ? 2.5 : isHovering ? 1.5 : 1,
        backgroundColor: isHovering || isHoveringInteractive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
        borderWidth: isHovering || isHoveringInteractive ? '0px' : '1px',
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    />
  );
}
`;

// 3. IntroSequence.tsx
const introSequenceCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 800); // Kenya outline
    const timer2 = setTimeout(() => setStage(2), 2200); // Zoom to Limuru + Message
    const timer3 = setTimeout(() => setStage(3), 4000); // Fade out

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const handleComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    onComplete();
  };

  if (stage === 3) {
    handleComplete();
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-neutral-warm overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-neutral-warm to-brand-primary/5 pointer-events-none" />
        
        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleComplete}
          className="absolute bottom-12 right-12 font-body text-xs tracking-widest uppercase text-brand-neutral-charcoal/40 hover:text-brand-primary transition-colors"
        >
          Skip Intro
        </motion.button>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo / Outline Morph */}
          <div className="w-32 h-32 relative mb-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="logo"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 bg-brand-primary rounded-xl flex items-center justify-center shadow-floating"
                >
                  <span className="text-brand-accent font-heading font-bold text-4xl">K</span>
                </motion.div>
              )}
              {stage >= 1 && (
                <motion.div
                  key="outline"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: stage === 2 ? 1.5 : 1,
                    y: stage === 2 ? 20 : 0
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-center justify-center"
                >
                  {/* Abstract representation of mapping/Kenya zooming to Limuru */}
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10Z" 
                      stroke="#1148B8" strokeWidth="2" strokeDasharray="4 4"
                      initial={{ pathLength: 0, rotate: -90 }}
                      animate={{ pathLength: 1, rotate: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.circle 
                      cx="60" cy="60" r="4" fill="#0EA5D8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: stage === 2 ? [1, 2, 1] : 1, opacity: stage === 2 ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: stage === 2 ? 0 : 1 }}
                    />
                    {stage === 2 && (
                      <motion.circle 
                        cx="60" cy="60" r="16" stroke="#0EA5D8" strokeWidth="1"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Typography */}
          <div className="h-12 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {stage === 2 && (
                <motion.p
                  key="message"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-heading text-xl md:text-2xl text-brand-neutral-charcoal tracking-wide"
                >
                  Every great journey begins at home.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
`;

// 4. AIAssistant.tsx
const aiAssistantCode = `import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello. I'm Kamau's digital assistant. How can I help you learn about his vision for Limuru?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Mock response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: "Kamau's manifesto focuses on youth empowerment, infrastructure, and transparency. Would you like to read the full manifesto or ask about a specific initiative?" }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-brand-neutral-charcoal text-white rounded-full shadow-floating flex items-center justify-center z-40 group hover:scale-105 transition-transform"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-secondary"></span>
        </span>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-8 w-80 sm:w-96 bg-brand-neutral-white rounded-3xl shadow-modal border border-brand-neutral-grey/50 z-50 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-brand-neutral-charcoal text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm">Campaign Assistant</h4>
                  <p className="font-body text-[10px] text-white/60 uppercase tracking-wider">AI Powered</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-neutral-warm/30">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
                >
                  <div 
                    className={\`max-w-[80%] rounded-2xl px-4 py-3 text-sm font-body \${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-white rounded-br-sm' 
                        : 'bg-white border border-brand-neutral-grey/50 text-brand-neutral-charcoal rounded-bl-sm shadow-sm'
                    }\`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-brand-neutral-grey/50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-brand-neutral-charcoal/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-neutral-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-brand-neutral-charcoal/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-brand-neutral-grey/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-brand-neutral-warm rounded-full pl-4 pr-12 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-primary/20 border border-transparent focus:border-brand-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;


fs.writeFileSync(path.join(componentsDir, 'SmoothScroll.tsx'), smoothScrollCode);
fs.writeFileSync(path.join(componentsDir, 'CustomCursor.tsx'), customCursorCode);
fs.writeFileSync(path.join(componentsDir, 'IntroSequence.tsx'), introSequenceCode);
fs.writeFileSync(path.join(componentsDir, 'AIAssistant.tsx'), aiAssistantCode);

console.log('Interactions generated!');
