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
                      "Inevit didn't just automate our logistics; they <span className="text-gold font-normal">re-architected</span> our entire data philosophy. The ROI wasn't measured in months, but in <span className="italic border-b border-white/20">weeks</span>."
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
