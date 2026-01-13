import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'welcome'>('loading');
  const [logIndex, setLogIndex] = useState(0);

  // "Text Decoding" effect state
  const finalText = "INEVEIT SOLUTIONS";
  const [displayText, setDisplayText] = useState("");
  
  const logs = [
    "INITIALIZING CORE...",
    "VERIFYING INTEGRITY...",
    "LOADING MODULES...",
    "OPTIMIZING NEURAL NET...",
    "SYSTEM READY."
  ];

  useEffect(() => {


    const duration = 1800; // Total boot time ms
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(p);

      // Cycle logs based on progress chunks
      const totalLogs = logs.length;
      const currentLog = Math.floor((p / 100) * totalLogs);
      setLogIndex(Math.min(currentLog, totalLogs - 1));

      if (p >= 100) {
        clearInterval(interval);
        // Transition to Welcome Phase
        setPhase('welcome');

      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Handle Welcome Phase Animation
  useEffect(() => {
    if (phase === 'welcome') {
        let iteration = 0;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        
        // Matrix/Decoding text effect
        const interval = setInterval(() => {
            setDisplayText(prev => 
                finalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return finalText[index];
                    }
                    return alphabet[Math.floor(Math.random() * alphabet.length)];
                })
                .join("")
            );

            if (iteration >= finalText.length) { 
                clearInterval(interval);
            }
            
            iteration += 1 / 3; 
        }, 30);

        // End sequence after animation finishes
        const timeout = setTimeout(() => {
            onComplete();
        }, 2200);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian flex flex-col items-center justify-center overflow-hidden cursor-none font-mono">
        
        {/* Background Scanlines */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ 
                 background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 1) 50%)',
                 backgroundSize: '100% 4px'
             }} 
        />
        
        <AnimatePresence mode="wait">
            {phase === 'loading' ? (
                <motion.div 
                    key="loader"
                    exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center relative z-10"
                >
                    {/* Central HUD */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        
                        {/* Outer Spinning Ring */}
                        <motion.div 
                            className="absolute inset-0 border border-white/5 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full shadow-[0_0_10px_#F4B400]"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full"></div>
                        </motion.div>

                        {/* Inner Dashed Ring */}
                        <motion.div 
                            className="absolute inset-4 border-2 border-dashed border-violet/30 rounded-full"
                            animate={{ rotate: -180 }}
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        />

                        {/* Progress Circle (SVG) */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 p-8">
                            <circle 
                                cx="50%" cy="50%" r="45%" 
                                fill="none" 
                                stroke="#1a1a1a" 
                                strokeWidth="2"
                            />
                            <motion.circle 
                                cx="50%" cy="50%" r="45%" 
                                fill="none" 
                                stroke="#F4B400" 
                                strokeWidth="2"
                                strokeDasharray="283" 
                                strokeDashoffset={283 - (283 * progress) / 100}
                                strokeLinecap="round"
                                className="drop-shadow-[0_0_8px_rgba(244,180,0,0.5)]"
                            />
                        </svg>

                        {/* Center Percentage */}
                        <div className="flex flex-col items-center justify-center">
                            <motion.div 
                                className="text-5xl font-bold text-white tracking-tighter"
                            >
                                {Math.floor(progress).toString().padStart(2, '0')}
                                <span className="text-sm text-gold ml-1">%</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Status Text Area */}
                    <div className="mt-8 h-12 flex flex-col items-center justify-start space-y-1">
                        <motion.div 
                            key={logIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-gold uppercase tracking-[0.2em] flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            {logs[logIndex]}
                        </motion.div>
                        
                        {/* Tech Decoration Line */}
                        <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"></div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center z-20"
                >
                    <div className="relative">
                        {/* Top decorative line */}
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "100%" }} 
                            transition={{ duration: 1 }}
                            className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent absolute -top-4 left-0"
                        />
                        
                        <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white text-center">
                            {displayText}
                            <span className="animate-pulse text-gold">_</span>
                        </h1>
                        
                        {/* Subtitle reveal */}
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-center text-xs md:text-sm text-violet uppercase tracking-[0.5em] mt-4"
                        >
                            Access Granted
                        </motion.p>

                         {/* Bottom decorative line */}
                         <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "100%" }} 
                            transition={{ duration: 1 }}
                            className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent absolute -bottom-4 left-0"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Corner Decorators */}
        <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20"></div>
        <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/20"></div>
        <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/20"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20"></div>

    </div>
  );
};

export default BootSequence;