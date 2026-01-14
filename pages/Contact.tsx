import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, Terminal, Shield, Clock, MapPin, Copy, Calendar } from 'lucide-react';

// Lazy load Three.js component to reduce initial bundle size
const ContactGlobe = React.lazy(() => import('../components/ContactGlobe'));

// --- Components ---

const SystemConsole = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const logs = [
      "> Initializing secure handshake...",
      "> Verifying encryption keys (TLS 1.3)...",
      "> Connection established.",
      "> Channel status: OPEN",
      "> Waiting for user input..."
    ];
    
    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 800 + 500;
      setTimeout(() => {
        setLines(prev => [...prev, log]);
      }, delay);
    });
  }, []);

  return (
    <div className="bg-black/80 border border-white/10 rounded-lg p-4 font-mono text-xs text-green-500/80 h-32 overflow-hidden flex flex-col justify-end shadow-inner">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">{line}</div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        organization: formData.get('organization'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is ok
      if (!response.ok) {
        // Try to parse error response
        let errorMessage = 'Failed to submit. Please try again.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        alert(errorMessage);
        setStatus('idle');
        return;
      }

      // Parse successful response
      let result;
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        alert('Received invalid response from server.');
        setStatus('idle');
        return;
      }

      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Network error. Please check your connection and try again.');
      setStatus('idle');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@ineveit.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === 'success') {
      return (
          <div className="min-h-screen pt-24 relative flex flex-col items-center justify-center text-center overflow-hidden">
             <Suspense fallback={<div className="fixed inset-0 z-0" />}>
               <ContactGlobe />
             </Suspense>
             <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm z-0" />
             <div className="relative z-10 max-w-lg mx-auto px-6 border border-gold/30 bg-black/50 p-12 rounded-2xl">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 text-gold flex justify-center"
                >
                    <CheckCircle size={64} strokeWidth={1} />
                </motion.div>
                <h2 className="text-3xl font-light mb-4 text-white">Transmission Received</h2>
                <div className="h-px w-24 bg-gold mx-auto mb-6"></div>
                <p className="text-text-secondary mb-8 leading-relaxed">
                    Your inquiry has been logged in our queue. Our systems team will analyze your request and establish contact within 24 hours.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="text-xs font-mono uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:text-gold hover:border-gold transition-all"
                >
                    Reset Terminal
                </button>
             </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
         <Suspense fallback={<div className="fixed inset-0 z-0" />}>
           <ContactGlobe />
         </Suspense>
         {/* Gradients to ensure text readability */}
         <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 border-b border-white/10 pb-8"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-green-500 uppercase tracking-widest">System Online</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Initiate Protocol</h1>
            <p className="text-text-muted max-w-2xl text-lg">
                Connect with our architecture team. Whether you need a full audit or a specific automation module, it starts here.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
                <motion.form 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 backdrop-blur-md bg-white/5 p-8 rounded-xl border border-white/10 relative group"
                >
                    {/* Decorators */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-gold/50"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-gold/50"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-text-muted">Identity</label>
                            <input 
                                type="text" 
                                name="name"
                                required
                                className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-violet/50 transition-colors rounded hover:border-white/20"
                                placeholder="Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-text-muted">Contact Point</label>
                            <input 
                                type="email" 
                                name="email"
                                required
                                className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-violet/50 transition-colors rounded hover:border-white/20"
                                placeholder="Email Address"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-mono uppercase tracking-widest text-text-muted">Organization</label>
                         <input 
                                type="text" 
                                name="organization"
                                className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-violet/50 transition-colors rounded hover:border-white/20"
                                placeholder="Company URL (Optional)"
                            />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-text-muted">Interest</label>
                        <select 
                            required
                            name="interest"
                            className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-violet/50 transition-colors rounded hover:border-white/20 appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                        >
                            <option value="" disabled selected className="text-gray-500">Select area of interest</option>
                            <option value="Automation" className="bg-obsidian">Automation</option>
                            <option value="System Architecture" className="bg-obsidian">System Architecture</option>
                            <option value="RAG chatbot" className="bg-obsidian">RAG chatbot</option>
                            <option value="Other" className="bg-obsidian">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-text-muted">System Context</label>
                        <textarea 
                            rows={6}
                            required
                            name="message"
                            className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-violet/50 transition-colors rounded hover:border-white/20 resize-none"
                            placeholder="Describe the friction in your current workflow or the system you wish to build..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-4">
                        <button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="flex-1 md:flex-none px-8 py-4 bg-white text-black font-bold uppercase tracking-wide hover:bg-gold transition-all duration-300 disabled:opacity-50 rounded flex items-center justify-center gap-3"
                        >
                            {status === 'submitting' ? 'Processing...' : 'Submit Transmission'} 
                            {!status && <ArrowRight size={18} />}
                        </button>
                    </div>
                </motion.form>
            </div>

            {/* Right Column: Info & Status */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* 1. Live Console */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                     <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[10px] font-mono uppercase text-text-muted">Encryption: AES-256</span>
                        <span className="text-[10px] font-mono uppercase text-text-muted">Latency: 14ms</span>
                     </div>
                     <SystemConsole />
                </motion.div>

                {/* 2. Direct Channels */}
                <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 }}
                     className="bg-surface/50 border border-white/5 p-6 rounded-lg"
                >
                     <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Terminal size={16} className="text-gold" /> Direct Channels
                     </h3>
                     
                     <ul className="space-y-6">
                        <li className="flex items-start gap-4 group">
                             <div className="p-2 bg-white/5 rounded text-text-secondary group-hover:text-gold group-hover:bg-gold/10 transition-colors">
                                <Mail size={20} />
                             </div>
                             <div className="flex-1">
                                 <p className="text-xs text-text-muted uppercase tracking-wider mb-1">General Inquiries</p>
                                 <button 
                                    onClick={copyEmail}
                                    className="text-white hover:text-gold transition-colors flex items-center gap-2 font-mono"
                                 >
                                    hello@ineveit.com 
                                    <span className="text-xs opacity-50">{copied ? 'Copied' : <Copy size={12} />}</span>
                                 </button>
                             </div>
                        </li>
                        <li className="flex items-start gap-4 group">
                             <div className="p-2 bg-white/5 rounded text-text-secondary group-hover:text-gold group-hover:bg-gold/10 transition-colors">
                                <MapPin size={20} />
                             </div>
                             <div>
                                 <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Base of Operations</p>
                                 <p className="text-white">Bengaluru, KA / Remote Global</p>
                             </div>
                        </li>
                     </ul>
                </motion.div>

                {/* 3. The Protocol (FAQ) */}
                <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.5 }}
                     className="border-t border-white/10 pt-8"
                >
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Transmission Protocol</h3>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1 text-violet"><Clock size={18} /></div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Response Time</h4>
                                <p className="text-text-muted text-sm mt-1">We analyze every inquiry manually. Expect a technical response within 24 hours.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="mt-1 text-violet"><Shield size={18} /></div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Privacy First</h4>
                                <p className="text-text-muted text-sm mt-1">Non-disclosure is default. Your system architecture details are never shared.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="mt-1 text-violet"><Calendar size={18} /></div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Discovery</h4>
                                <p className="text-text-muted text-sm mt-1">If fit is established, we schedule a 45-min architectural review session.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;