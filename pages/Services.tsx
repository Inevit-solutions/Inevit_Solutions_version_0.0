import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import BackgroundCanvas from '../components/BackgroundCanvas';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 relative">
      <BackgroundCanvas variant="services" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Capabilities</h1>
            <p className="text-text-muted max-w-2xl text-lg">
                We don't offer a menu of disjointed services. We offer a unified approach to system architecture.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 md:p-12 border border-subtle bg-surface/50 backdrop-blur-sm hover:border-violet/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                 {/* Title Column */}
                 <div className="md:w-1/3">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 group-hover:text-violet transition-colors">
                        {service.title}
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                        {service.description}
                    </p>
                 </div>

                 {/* Details Column */}
                 <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <span className="block text-xs text-gold uppercase tracking-wider mb-2 font-mono">Solves</span>
                        <p className="text-sm text-text-secondary leading-relaxed border-l border-gold/30 pl-3">
                            {service.problemSolved}
                        </p>
                     </div>
                     <div>
                        <span className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-mono">Not For</span>
                        <p className="text-sm text-text-muted leading-relaxed border-l border-subtle pl-3">
                            {service.notFor}
                        </p>
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

export default Services;