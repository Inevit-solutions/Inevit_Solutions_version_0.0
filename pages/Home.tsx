import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, GitMerge, ShieldCheck, TrendingUp, Activity, Code2, Database, Quote, Terminal } from 'lucide-react';
import { PageView } from '../types';

// Lazy load Three.js component to reduce initial bundle size
const SystemCanvas = React.lazy(() => import('../components/SystemCanvas'));

interface HomeProps {
  onNavigate: (page: PageView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 z-0" />}>
        <SystemCanvas />
      </Suspense>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 border border-violet/20 rounded-full bg-violet/5 backdrop-blur-sm text-violet text-xs font-mono tracking-widest uppercase">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet"></span>
                </span>
               System Architecture & Automation
             </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              We design systems that <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 pb-2">
                give time back.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-14 leading-relaxed font-light">
              Ineveit Solutions builds custom automation and AI infrastructure for businesses that have outgrown manual workflows.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative px-8 py-4 bg-white text-black font-medium hover:bg-gold transition-all duration-300 w-full md:w-auto overflow-hidden rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => onNavigate('work')}
                className="px-8 py-4 border border-white/20 text-white hover:border-gold hover:text-gold transition-colors duration-300 w-full md:w-auto rounded-sm backdrop-blur-sm bg-black/20"
              >
                View Selected Work
              </button>
            </div>
          </motion.div>

          {/* Bottom Ticker / Stats (New Component) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 md:mt-32 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
          >
             {[
               { icon: <Activity size={18} />, label: "Uptime Guaranteed", value: "99.9%" },
               { icon: <Code2 size={18} />, label: "Custom Workflows", value: "Infinite" },
               { icon: <Database size={18} />, label: "Data Processed", value: "10M+" },
               { icon: <ShieldCheck size={18} />, label: "Privacy Focus", value: "Native" },
             ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center justify-center gap-2 text-text-muted hover:text-white transition-colors cursor-default group">
                  <div className="mb-1 text-violet group-hover:text-gold transition-colors">{stat.icon}</div>
                  <span className="text-2xl font-bold text-white font-mono">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest">{stat.label}</span>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy / Value Props */}
      <section className="py-32 bg-obsidian relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <GitMerge size={32} />,
                title: "Custom Logic",
                desc: "No templates. We build systems that fit your specific operational physics, not the other way around.",
                color: "text-violet"
              },
              {
                icon: <Cpu size={32} />,
                title: "Intelligent Processing",
                desc: "We integrate AI where it adds leverage, turning unstructured data into structured decisions.",
                color: "text-gold"
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Reliability First",
                desc: "Built to run forever. We prioritize error handling, monitoring, and stability over flashy features.",
                color: "text-white"
              },
              {
                icon: <TrendingUp size={32} />,
                title: "ROI-Driven Automation",
                desc: "We only build workflows that deliver measurable value, ensuring every automation improves your bottom line.",
                color: "text-emerald-400"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/5 bg-surface/30 backdrop-blur-sm hover:bg-surface hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`mb-6 ${item.color} opacity-80 group-hover:opacity-100 transition-opacity relative z-10`}>{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white relative z-10">{item.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="py-24 bg-charcoal border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-light leading-normal text-white drop-shadow-lg">
              "We don't sell tools. We sell <span className="text-gold italic font-serif">outcome certainty</span>. The technology is just how we deliver on the promise."
            </h2>
        </div>
      </section>

      {/* Compact Client Data Card */}
      <section className="py-24 bg-obsidian relative z-10 flex justify-center">
        <div className="max-w-4xl w-full px-6">
            <div className="relative bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden group hover:border-white/10 transition-all duration-500">
                
                {/* Tech Deco: Top Right Dots */}
                <div className="absolute top-6 right-6 flex gap-1.5 opacity-30">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    
                    {/* Left: Icon Badge */}
                    <div className="hidden md:block">
                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                            <Terminal size={20} className="text-gold" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                         <div className="flex items-center gap-2 mb-6">
                             <div className="w-1 h-4 bg-gold rounded-full"></div>
                             <span className="text-xs font-mono text-gold uppercase tracking-widest">Client Feedback Log</span>
                         </div>

                        <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed mb-8">
                            "Ineveit didn't just automate our logistics; they <span className="text-gold font-normal">re-architected</span> our entire data philosophy. The ROI wasn't measured in months, but in <span className="italic border-b border-white/20">weeks</span>."
                        </blockquote>

                        {/* Footer / Meta Data */}
                        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/5 pt-6 mt-auto">
                             <div>
                                <h4 className="text-sm font-bold text-white tracking-wide mb-1">MARCUS THORNE</h4>
                                <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                                    <span>COO, LOGISTICSCORE</span>
                                    <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded text-[10px]">VERIFIED</span>
                                </div>
                             </div>
                             
                             {/* Stats Block */}
                             <div className="flex items-center gap-6">
                                 <div className="text-right">
                                     <p className="text-[10px] text-text-muted font-mono uppercase tracking-wider mb-0.5">Efficiency Gain</p>
                                     <p className="text-sm text-white font-mono font-medium">95.4%</p>
                                 </div>
                                 <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                                 <div className="text-right hidden sm:block">
                                     <p className="text-[10px] text-text-muted font-mono uppercase tracking-wider mb-0.5">Deployed</p>
                                     <p className="text-sm text-white font-mono font-medium">Q3 2023</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-50"></div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Home;