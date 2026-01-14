import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';

// Lazy load Three.js component to reduce initial bundle size
const BackgroundCanvas = React.lazy(() => import('../components/BackgroundCanvas'));

const Process: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 relative">
        <Suspense fallback={<div className="fixed inset-0 z-0" />}>
          <BackgroundCanvas variant="process" />
        </Suspense>
        {/* Central line */}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24 py-8 relative">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">How We Work</h1>
                <p className="text-text-muted max-w-xl mx-auto text-lg">
                    A disciplined framework designed to reduce risk and guarantee outcome certainty.
                </p>
            </div>

            <div className="space-y-24">
                {PROCESS_STEPS.map((step, idx) => (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className={`flex flex-col md:flex-row gap-8 items-start ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Timeline Node */}
                        <div className="hidden md:flex w-full md:w-1/2 justify-end items-center px-12 relative">
                             {/* Connector handled by absolute positioning in CSS if needed, purely layout here */}
                                <motion.span 
                                    className="text-6xl font-bold font-mono block"
                                    initial={{ color: "rgba(255, 255, 255, 0.1)", textShadow: "none" }}
                                    whileInView={{ 
                                        color: "#F4B400" 
                                    }}
                                    viewport={{ once: true, margin: "-50% 0px -50% 0px" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {step.number}
                                </motion.span>
                        </div>

                        {/* Mobile Node Replacement */}
                        <div className="md:hidden absolute left-[20px] w-4 h-4 bg-obsidian border border-gold rounded-full transform translate-y-1"></div>

                        {/* Content Card */}
                        <div className="w-full md:w-1/2 md:px-12 pl-12">
                            <div className="p-8 bg-surface/80 backdrop-blur-sm border border-subtle hover:border-gold/30 transition-colors duration-300 relative group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gold/0 group-hover:bg-gold transition-colors duration-300"></div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-gold text-sm font-mono mb-4">{step.description}</p>
                                <p className="text-text-secondary leading-relaxed text-sm">
                                    {step.detail}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-32 text-center">
                 <div className="inline-block p-6 border border-subtle bg-surface/80 backdrop-blur-sm">
                     <p className="text-text-muted mb-4 font-mono text-sm">Ready to start discovery?</p>
                     <button 
                        onClick={() => window.open('https://cal.com/inevit-solutions-k1ow7a/30min', '_blank')}
                        className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors font-semibold text-sm tracking-wide"
                     >
                        INITIATE PROCESS
                     </button>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default Process;