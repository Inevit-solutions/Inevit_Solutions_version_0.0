import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, RefreshCw } from 'lucide-react';

// Lazy load Three.js component to reduce initial bundle size
const BackgroundCanvas = React.lazy(() => import('../components/BackgroundCanvas'));

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 relative">
      <Suspense fallback={<div className="fixed inset-0 z-0" />}>
        <BackgroundCanvas variant="about" />
      </Suspense>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Intro */}
        <section className="mb-32">
            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl md:text-5xl font-light leading-snug mb-12"
            >
                Inevit Solutions was founded on a simple observation: <br/>
                <span className="text-text-muted">Most businesses are drowning in work that machines should be doing.</span>
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-text-secondary leading-relaxed font-light">
                <p>
                    We aren't a traditional agency. We don't have account managers, salespeople, or layers of bureaucracy. We are a small, high-density team of engineers from IIT backgrounds who care deeply about systems architecture.
                </p>
                <p>
                    Our philosophy is "Privacy by Default" and "Long-Term Reliability". We don't build hacky scripts that break in a month. We build robust infrastructure designed to handle scale and complexity.
                </p>
            </div>
        </section>

        {/* Operating Principles */}
        <section>
            <h2 className="text-xs font-mono text-gold uppercase tracking-widest mb-12 border-b border-subtle pb-4">Operating Principles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Zap size={24} />,
                        title: "Outcome Certainty",
                        desc: "We do not sell hours. We sell solved problems. Our incentives are aligned with your efficiency, not your dependency."
                    },
                    {
                        icon: <Lock size={24} />,
                        title: "Sovereignty",
                        desc: "You own the systems we build. No vendor lock-in. No black boxes. We hand over the keys and the blueprints."
                    },
                    {
                        icon: <RefreshCw size={24} />,
                        title: "Anti-Fragility",
                        desc: "Automation shouldn't break when an API changes. We build self-healing workflows with robust error handling."
                    }
                ].map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className="p-8 border border-subtle bg-surface/50 backdrop-blur-sm hover:bg-surface hover:border-gold/20 transition-all duration-300 group"
                    >
                        <div className="text-gold mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                        <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-gold transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
};

export default About;