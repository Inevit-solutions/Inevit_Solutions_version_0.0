import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants';
import { PageView } from '../types';
import { Menu, X, ArrowUp, Send, Github, Twitter, Linkedin, Youtube, Globe, Instagram, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';


interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

// Real-time server clock component
const ServerClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Initial set
    setTime(new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    
    const interval = setInterval(() => {
      setTime(new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted bg-white/5 px-3 py-1 rounded border border-white/5">
       <Globe size={10} className="text-violet animate-pulse" />
       <span>{time}</span>
    </div>
  );
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const newsletterRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubscribe = async () => {
    const email = newsletterRef.current?.value;
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use relative path - Vercel handles API routes automatically for SPA
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is ok and has content
      if (!response.ok) {
        // Try to parse error response
        let errorMessage = "Failed to subscribe. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        alert(errorMessage);
        return;
      }

      // Parse successful response
      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        alert("Received invalid response from server.");
        return;
      }

      // Show success modal
      setShowSuccessModal(true);
      if (newsletterRef.current) newsletterRef.current.value = "";
    } catch (error) {
      console.error('Subscription error:', error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Scroll for Back to Top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageView) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-obsidian text-text-primary font-sans selection:bg-violet selection:text-white flex flex-col">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-[60] origin-left shadow-[0_0_15px_rgba(244,180,0,0.4)]"
        style={{ scaleX }}
      />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-5xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-full pl-6 pr-2 py-2 flex items-center justify-between shadow-2xl shadow-black/50 transition-all duration-300">
          
          {/* Left: Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 group"
          >
             <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full bg-transparent">
                 <img 
                    src="/Leo.png" 
                    alt="Inevit Logo" 
                    className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: 'transparent' }}
                    onError={(e) => {
                      // Fallback if image fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-gradient-to-br from-violet to-gold rounded-full"></div>';
                    }}
                 />
             </div>
            <span className="font-semibold tracking-wide text-sm md:text-base text-white group-hover:text-gold transition-colors duration-300">INEVIT</span>
          </button>

          {/* Center: Navigation Links (Absolute Centering) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  currentPage === item.id ? 'text-gold' : 'text-text-muted hover:text-white'
                }`}
              >
                {item.label}
                {/* Active/Hover Dot */}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold transition-all duration-300 ${
                  currentPage === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />
              </button>
            ))}
          </div>

          {/* Right: CTA, Mute & Mobile Toggle */}
          <div className="flex items-center gap-3">


             <button
               onClick={() => window.open('https://cal.com/inevit-solutions-k1ow7a/30min', '_blank')}
               className="hidden md:block px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.3)]"
            >
              Get Started
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); }}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-3xl font-light transition-colors ${
                   currentPage === item.id ? 'text-gold' : 'text-text-secondary hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
               onClick={() => window.open('https://cal.com/inevit-solutions-k1ow7a/30min', '_blank')}
               className="mt-8 px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300 shadow-lg shadow-white/10"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-32 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0A] pt-24 pb-12 mt-20 relative z-20 overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-8">
               <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">INEVIT SOLUTIONS</h3>
                  <p className="text-text-muted leading-relaxed">
                    Precision-engineered automation systems for businesses that value long-term reliability over quick fixes.
                  </p>
               </div>
               
               <div className="flex flex-col gap-3">
                 <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 self-start group cursor-default hover:border-green-500/30 transition-colors">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 duration-1000"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-green-500 tracking-wider group-hover:text-green-400 transition-colors">SYSTEMS OPERATIONAL</span>
                 </div>
                 <ServerClock />
               </div>
            </div>

            {/* Sitemap */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => handleNavClick(item.id)}
                      className="text-text-secondary hover:text-gold transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-gold transition-colors"></span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

             {/* Socials */}
             <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Connect</h4>
              <ul className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.platform}>
                    <a 
                      href={link.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      {link.platform === 'GitHub' && <Github size={14} className="group-hover:text-violet transition-colors" />}
                      {link.platform === 'Twitter / X' && <Twitter size={14} className="group-hover:text-blue-400 transition-colors" />}
                      {link.platform === 'LinkedIn' && <Linkedin size={14} className="group-hover:text-blue-600 transition-colors" />}
                      {link.platform === 'YouTube' && <Youtube size={14} className="group-hover:text-red-500 transition-colors" />}
                      {link.platform === 'Instagram' && <Instagram size={14} className="group-hover:text-pink-500 transition-colors" />}
                      <span>{link.platform}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Stay Synchronized</h4>
               <p className="text-text-muted text-sm mb-6">
                 Receive engineering logs and system updates. No marketing fluff.
               </p>
               <div className="flex gap-2">
                 <input 
                    ref={newsletterRef}
                    type="email" 
                    placeholder="Enter email address"
                    className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                 />
                 <button 
                     onClick={handleSubscribe}
                     disabled={isSubmitting}
                     className="px-4 py-3 bg-white text-black rounded hover:bg-gold transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(244,180,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isSubmitting ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"/> : <Send size={16} />}
                 </button>
               </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-text-muted font-mono">
               © {new Date().getFullYear()} Inevit Solutions. All Systems Go.
             </p>
             <div className="flex gap-8 text-xs text-text-muted">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-white transition-colors">Sitemap</a>
             </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-gold hover:text-black transition-all duration-300 shadow-lg shadow-black/50 group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subscription Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="relative max-w-md w-full bg-obsidian border border-gold/30 rounded-2xl p-8 shadow-2xl">
                {/* Decorative corners */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-gold/50"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-gold/50"></div>
                
                {/* Content */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-6 flex justify-center"
                  >
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
                      <CheckCircle size={32} className="text-gold" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    You're In
                  </h3>
                  
                  <div className="h-px w-16 bg-gold mx-auto mb-6"></div>
                  
                  <p className="text-text-secondary leading-relaxed mb-8">
                    We'll send you engineering insights and system updates. No fluff, just signal.
                  </p>
                  
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="px-8 py-3 bg-white text-black font-semibold uppercase tracking-wider text-sm rounded hover:bg-gold transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,180,0,0.4)]"
                  >
                    Understood
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Layout;