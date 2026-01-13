import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import BackgroundCanvas from '../components/BackgroundCanvas';

const Blog: React.FC = () => {
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen pt-12 pb-24 relative">
      <BackgroundCanvas variant="blog" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-violet animate-pulse"></span>
                <span className="text-xs font-mono text-violet uppercase tracking-widest">Engineering Logs</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-text-muted max-w-2xl text-lg">
                Architectural decisions, technical deep dives, and the future of automated systems.
            </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
            <motion.a
                href={featuredPost.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group block mb-24 relative"
            >
                <div className="relative aspect-[21/9] w-full overflow-hidden border border-subtle mb-8 bg-surface/50 backdrop-blur-sm">
                     {/* Image */}
                     <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent"></div>
                     
                     {/* Overlay Text for Featured */}
                     <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                         <div className="flex gap-2 mb-4">
                            {featuredPost.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-violet text-white">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-gold transition-colors">
                            {featuredPost.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm font-mono text-text-muted">
                            <span>{featuredPost.date}</span>
                            <span className="w-1 h-1 bg-subtle rounded-full"></span>
                            <span>{featuredPost.readTime}</span>
                        </div>
                     </div>
                </div>
            </motion.a>
        )}

        {/* Divider */}
        <div className="border-t border-subtle mb-16"></div>

        {/* Remaining Posts */}
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {remainingPosts.map((post, idx) => (
            <motion.a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group block"
            >
              <article className="border-b border-subtle pb-12 group-hover:border-violet/30 transition-colors duration-500">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-start">
                    {/* Meta */}
                    <div className="md:w-1/4 flex flex-row md:flex-col gap-4 text-xs font-mono text-text-muted">
                        <span>{post.date}</span>
                        <span className="hidden md:inline w-px h-8 bg-subtle"></span>
                        <span className="hidden md:inline">{post.readTime}</span>
                        <span className="md:hidden">• {post.readTime}</span>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/4">
                        <div className="flex gap-2 mb-3">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 text-[10px] uppercase tracking-wider border border-subtle text-text-secondary rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-2xl font-semibold mb-3 group-hover:text-violet transition-colors flex items-center gap-2">
                            {post.title}
                            <ArrowUpRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-violet" />
                        </h2>
                        <p className="text-text-secondary leading-relaxed mb-4">
                            {post.excerpt}
                        </p>
                        <div className="text-xs font-mono text-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                           <BookOpen size={14} /> Read Article
                        </div>
                    </div>
                </div>
              </article>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;