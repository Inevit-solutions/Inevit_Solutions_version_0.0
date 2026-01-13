import React from 'react';
import { motion } from 'framer-motion';
import { YOUTUBE_VIDEOS, SOCIAL_LINKS } from '../constants';
import { Play, ArrowUpRight, Radio } from 'lucide-react';
import BackgroundCanvas from '../components/BackgroundCanvas';

const Signals: React.FC = () => {
  const featuredVideo = YOUTUBE_VIDEOS[0];
  const remainingVideos = YOUTUBE_VIDEOS.slice(1);

  return (
    <div className="min-h-screen pt-12 pb-24 relative">
      <BackgroundCanvas variant="signals" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-subtle pb-8">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                <span className="text-xs font-mono text-gold uppercase tracking-widest">Broadcast</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Media</h1>
            <p className="text-text-muted max-w-2xl text-lg">
                Broadcasts, community contributions, and active channels. 
                Engage with our engineering process.
            </p>
        </div>

        {/* Hero Video */}
        {featuredVideo && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-24"
            >
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-sm font-mono text-text-muted uppercase tracking-widest">Featured Transmission</h2>
                </div>
                
                <a 
                    href={featuredVideo.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative block w-full aspect-video bg-surface overflow-hidden border border-subtle"
                >
                    {/* Thumbnail */}
                    <img 
                        src={featuredVideo.thumbnail} 
                        alt={featuredVideo.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90"></div>

                    {/* Big Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-gold group-hover:border-gold transition-all duration-300 transform group-hover:scale-110">
                            <Play size={32} className="ml-1 text-white fill-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-gold transition-colors">{featuredVideo.title}</h3>
                        <p className="text-sm font-mono text-text-muted flex items-center gap-2">
                             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                             {featuredVideo.views}
                        </p>
                    </div>
                </a>
            </motion.div>
        )}

        {/* Remaining Videos Grid */}
        <div className="mb-24">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-light">Recent <span className="text-subtle">/ Uploads</span></h2>
                <a href="#" className="text-xs font-mono text-text-muted hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1">
                    View Channel <ArrowUpRight size={14} />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {remainingVideos.map((video, idx) => (
                    <motion.a 
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative aspect-video bg-surface overflow-hidden border border-subtle block"
                    >
                        <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center">
                                <Play size={16} fill="black" />
                             </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-lg font-semibold text-white mb-1 leading-tight line-clamp-2">{video.title}</h3>
                            <p className="text-xs font-mono text-text-muted">{video.views}</p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>

        {/* Other Socials Grid */}
        <div>
            <h2 className="text-2xl font-light mb-8">Connect <span className="text-subtle">/ Platforms</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {SOCIAL_LINKS.map((social, idx) => (
                    <motion.a 
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={social.platform}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-6 border border-subtle bg-surface/50 backdrop-blur-sm hover:border-gold/50 hover:bg-surface/80 transition-all duration-300 group flex flex-col justify-between h-40"
                    >
                        <div className="flex justify-between items-start">
                            <Radio size={20} className="text-text-muted group-hover:text-gold transition-colors" />
                            <ArrowUpRight size={16} className="text-subtle group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">{social.platform}</h3>
                            <p className="text-xs text-text-muted font-mono group-hover:text-text-secondary transition-colors">
                                {social.handle}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Signals;