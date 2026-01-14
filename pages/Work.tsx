import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

// Lazy load Three.js component to reduce initial bundle size
const BackgroundCanvas = React.lazy(() => import('../components/BackgroundCanvas'));

const Work: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 relative">
      <Suspense fallback={<div className="fixed inset-0 z-0" />}>
        <BackgroundCanvas variant="work" />
      </Suspense>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Selected Systems</h1>
            <p className="text-text-muted max-w-2xl text-lg">
                Real problems solved with precision engineering. We measure success in hours saved and error rates reduced.
            </p>
        </div>

        <div className="space-y-32">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-subtle pt-8 backdrop-blur-sm bg-obsidian/20 md:bg-transparent">
                {/* Meta */}
                <div className="md:col-span-3 space-y-8">
                   <div>
                       <span className="text-xs font-mono text-gold uppercase tracking-widest block mb-2">Client</span>
                       <h3 className="text-xl font-semibold">{project.client}</h3>
                   </div>
                   <div>
                       <span className="text-xs font-mono text-text-muted uppercase tracking-widest block mb-2">Industry</span>
                       <p className="text-text-secondary">{project.industry}</p>
                   </div>
                   <div>
                        <span className="text-xs font-mono text-text-muted uppercase tracking-widest block mb-2">Stack</span>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                                <span key={tool} className="text-xs px-2 py-1 bg-white/5 text-text-secondary border border-white/5 rounded">
                                    {tool}
                                </span>
                            ))}
                        </div>
                   </div>
                </div>

                {/* Content */}
                <div className="md:col-span-9 relative">
                   {/* Abstract visualization line */}
                   <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-violet/0 via-violet/50 to-violet/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 md:block hidden"></div>
                   
                   <div className="md:pl-12 space-y-12">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div className="space-y-4">
                               <h4 className="text-text-muted uppercase text-sm tracking-wider">The Challenge</h4>
                               <p className="text-text-secondary leading-relaxed border-l-2 border-subtle pl-4">
                                   {project.challenge}
                               </p>
                           </div>
                           <div className="space-y-4">
                               <h4 className="text-text-muted uppercase text-sm tracking-wider">The Outcome</h4>
                               <p className="text-text-secondary leading-relaxed border-l-2 border-gold/30 pl-4">
                                   {project.outcome}
                               </p>
                           </div>
                       </div>
                       
                       <div className="flex justify-start">
                           <button className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-wider hover:text-white transition-colors">
                               Case Study Restricted <ArrowUpRight size={14} className="opacity-50" />
                           </button>
                       </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;