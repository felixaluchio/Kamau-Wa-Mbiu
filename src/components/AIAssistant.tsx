import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, ChevronRight } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello. I am Ask Kamau, your digital assistant. How can I help you learn about the vision for our community, report an issue, or find volunteer opportunities?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What is Kamau's plan for youth employment?",
    "When is the next town hall?",
    "How can I report a road issue?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSubmit = (text: string = input) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Mock intelligent response
    setTimeout(() => {
      let responseText = "Kamau's manifesto focuses on youth empowerment, infrastructure, and transparency. You can read the full manifesto in the Vision section.";
      
      if (text.toLowerCase().includes('youth')) {
        responseText = "For youth employment, the plan includes establishing tech hubs in Ngecha and Limuru CBD, creating 5,000 paid apprenticeships, and providing seed grants for young entrepreneurs.";
      } else if (text.toLowerCase().includes('town hall')) {
        responseText = "The next Digital Town Hall on Agricultural Reform is happening today. You can join directly from the Community Dashboard.";
      } else if (text.toLowerCase().includes('issue') || text.toLowerCase().includes('report')) {
        responseText = "You can report community issues like potholes or water shortages through the Citizen Engagement Hub. Your report will be tracked publicly.";
      }

      setMessages([...newMessages, { role: 'assistant', content: responseText }]);
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
            style={{ height: '600px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-brand-neutral-charcoal text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm">Ask Kamau</h4>
                  <p className="font-body text-[10px] text-white/60 uppercase tracking-wider">AI Assistant</p>
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
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-body ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-white rounded-br-sm' 
                        : 'bg-white border border-brand-neutral-grey/50 text-brand-neutral-charcoal rounded-bl-sm shadow-sm leading-relaxed'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {messages.length === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-2 mt-4"
                >
                  {suggestedQuestions.map((sq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmit(sq)}
                      className="text-left text-xs bg-white border border-brand-neutral-grey/30 hover:border-brand-primary/50 text-brand-neutral-charcoal/80 p-2.5 rounded-xl shadow-sm transition-colors flex items-center justify-between group"
                    >
                      {sq}
                      <ChevronRight size={14} className="text-brand-neutral-charcoal/30 group-hover:text-brand-primary transition-colors" />
                    </button>
                  ))}
                </motion.div>
              )}

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
            <div className="p-4 bg-white border-t border-brand-neutral-grey/50">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(input);
                }} 
                className="relative"
              >
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
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
