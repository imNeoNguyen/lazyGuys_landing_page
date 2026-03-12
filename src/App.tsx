/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Scroll, Shield, Users, History, Image as ImageIcon, Video, Quote, ChevronDown, PenTool as Brush, Wind, Star } from 'lucide-react';
import { GUILD_DATA } from './data';

const Petals = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 20,
      size: 10 + Math.random() * 15,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="#ffb7c5" opacity="0.6">
            <path d="M12,2C12,2 10,6 6,10C2,14 4,18 8,20C12,22 12,22 12,22C12,22 12,22 16,20C20,18 22,14 18,10C14,6 12,2 12,2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const Seal = ({ text, variant = "blue" }: { text: string, variant?: "blue" | "sakura" }) => (
  <div className={`${variant === "blue" ? "blue-seal" : "sakura-seal"} w-12 h-12 text-xl leading-none flex items-center justify-center shadow-sm rotate-[-5deg]`}>
    {text}
  </div>
);

const Section = ({ children, className = "", id = "", bgImage, themeColor }: { children: React.ReactNode, className?: string, id?: string, bgImage?: string, themeColor?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2 }}
    className={`py-32 px-6 max-w-7xl mx-auto relative z-10 ${className} mb-16`}
  >
    <div 
      className="absolute inset-0 z-0 rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm"
      style={{ backgroundColor: themeColor || 'rgba(255, 255, 255, 0.5)' }}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img 
            src={bgImage} 
            alt="Section Background" 
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
        </div>
      )}
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </motion.section>
);

const VerticalTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="absolute -left-4 md:-left-12 top-24 flex flex-col items-center gap-4">
    <div className="vertical-text font-brush text-4xl md:text-5xl text-sky-900 tracking-widest text-center">
      {title}
    </div>
    <div className="h-24 w-px bg-sky-200" />
    <div className="vertical-text font-serif-sc text-xs uppercase tracking-[0.3em] text-sakura">
      {subtitle}
    </div>
  </div>
);

const CharacterCard = ({ name, title, description, image, seal }: { name: string, title: string, description: string, image: string, seal: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white/50 backdrop-blur-sm border border-sakura/20 p-6 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 group"
  >
    <div className="relative aspect-[3/4] overflow-hidden mb-6 rounded-sm">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4">
        <Seal text={seal} variant="sakura" />
      </div>
    </div>
    <h4 className="font-brush text-3xl text-sky-950 mb-1">{name}</h4>
    <p className="font-serif-sc text-xs uppercase tracking-widest text-sakura mb-4">{title}</p>
    <p className="text-sky-800 text-sm leading-relaxed font-serif italic">"{description}"</p>
  </motion.div>
);

export default function App() {
  return (
    <div className="font-serif-sc selection:bg-sky-100 bg-[#f0f9ff] relative overflow-hidden">
      <Petals />
      
      {/* Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sakura rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.12, 0.1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-400 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-sakura rounded-full blur-[100px]" 
        />
      </div>
      
      {/* Decorative Border */}
      <div className="fixed inset-0 pointer-events-none border-[12px] md:border-[24px] border-sky-50/50 z-50 mix-blend-multiply" />
      
      {/* Hero Banner */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={GUILD_DATA.heroImage}
            alt="Sakura Blossoms"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/60 via-sky-400/10 to-[#f0f9ff]" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-sky-900/20" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#f0f9ff] via-[#f0f9ff]/80 to-transparent opacity-90" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-8">
              <Seal text="LAZY" variant="blue" />
            </div>
            <h1 className="font-brush text-9xl md:text-[12rem] mb-4 text-white tracking-tighter drop-shadow-sm">
              {GUILD_DATA.name}
            </h1>
            {/* <p className="font-cursive text-3xl md:text-5xl text-sakura opacity-90 mb-8 tracking-wide">{GUILD_DATA.subName}</p> */}
            <div className="flex items-center justify-center gap-4 text-sky-700 tracking-[0.5em] uppercase text-sm font-medium">
              <span className="w-12 h-px bg-sakura" />
              <span>Action through Inaction • Peace in Every Moment</span>
              <span className="w-12 h-px bg-sakura" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-sky-400"
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </header>

      {/* Slogan Section */}
      <Section className="text-center pt-32">
        <div className="max-w-2xl mx-auto border-y border-sakura/30 py-12 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f0f9ff] px-4">
            <Wind className="text-sakura" size={24} />
          </div>
          <h2 className="font-brush text-5xl md:text-6xl text-sky-900 leading-tight">
            "{GUILD_DATA.slogan}"
          </h2>
          <p className="mt-6 text-sky-700 font-serif italic text-xl">
            {GUILD_DATA.philosophy}
          </p>
        </div>
      </Section>

      {/* Introduction */}
      <Section id="intro" className="pl-16 md:pl-32" bgImage={GUILD_DATA.intro.bgImage} themeColor={GUILD_DATA.intro.themeColor}>
        <VerticalTitle title={GUILD_DATA.intro.verticalTitle} subtitle={GUILD_DATA.intro.verticalSubtitle} />
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <h3 className="font-brush text-5xl mb-8 text-sky-900">{GUILD_DATA.intro.title}</h3>
            <div className="space-y-6 text-lg leading-relaxed text-sky-800 font-serif-sc">
              <p>
                {GUILD_DATA.intro.description1}
              </p>
              <p>
                {GUILD_DATA.intro.description2}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8">
              {GUILD_DATA.intro.features.map((feature, idx) => (
                <div key={idx} className="border-l-2 border-sakura pl-4">
                  <h4 className="font-brush text-2xl text-sky-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-sky-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 border border-sakura/20 rounded-sm -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative aspect-[3/4] overflow-hidden shadow-xl">
              <img 
                src={GUILD_DATA.intro.image} 
                alt="Sakura Temple" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6">
              <Seal text="ZEN" variant="sakura" />
            </div>
          </div>
        </div>
      </Section>

      {/* Key Figures Section */}
      <Section className="pl-16 md:pl-32 overflow-hidden" bgImage={GUILD_DATA.characterSection.bgImage} themeColor={GUILD_DATA.characterSection.themeColor}>
        <VerticalTitle title={GUILD_DATA.characterSection.verticalTitle} subtitle={GUILD_DATA.characterSection.verticalSubtitle} />
        <div className="mb-12">
          <h3 className="font-brush text-5xl text-sky-900 mb-4">{GUILD_DATA.characterSection.title}</h3>
          <p className="text-sky-600 font-serif italic">{GUILD_DATA.characterSection.subtitle}</p>
        </div>
        
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
            {GUILD_DATA.characters.map((char) => (
              <div key={char.id} className="flex-none w-[300px] md:w-[350px] snap-center">
                <CharacterCard 
                  name={char.name}
                  title={char.title}
                  description={char.description}
                  image={char.image}
                  seal={char.seal}
                />
              </div>
            ))}
            {/* Decorative End Card */}
            <div className="flex-none w-[300px] md:w-[350px] snap-center flex flex-col items-center justify-center border-2 border-dashed border-sakura/30 rounded-sm bg-white/20 backdrop-blur-sm">
              <Star className="text-sakura mb-4 animate-pulse" size={48} />
              <p className="font-brush text-2xl text-sky-900">More Legends...</p>
              <p className="text-sky-600 font-serif italic text-sm mt-2">Resting in the bamboo grove</p>
            </div>
          </div>
          
          {/* Scroll Indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
            <div className="w-12 h-1 bg-sky-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-sakura"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* History */}
      <div className="py-32 relative overflow-hidden">
        <Section className="pl-16 md:pl-32" bgImage={GUILD_DATA.historySection.bgImage} themeColor={GUILD_DATA.historySection.themeColor}>
          <VerticalTitle title={GUILD_DATA.historySection.verticalTitle} subtitle={GUILD_DATA.historySection.verticalSubtitle} />
          <div className="max-w-3xl">
            <div className="space-y-20 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-sakura/30" />
              
              {GUILD_DATA.history.map((item) => (
                <div key={item.id} className="relative pl-12">
                  <div className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full ${item.type === 'sakura' ? 'bg-sakura' : 'bg-sky-300'}`} />
                  <span className="text-sky-900 font-brush text-2xl block mb-2">{item.title}</span>
                  <p className="text-sky-700 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Gallery */}
      <Section className="pl-16 md:pl-32" bgImage={GUILD_DATA.gallerySection.bgImage} themeColor={GUILD_DATA.gallerySection.themeColor}>
        <VerticalTitle title={GUILD_DATA.gallerySection.verticalTitle} subtitle={GUILD_DATA.gallerySection.verticalSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {GUILD_DATA.gallery.map((item) => (
            <div key={item.id} className={`${item.span === 'large' ? 'md:col-span-8 aspect-video' : 'md:col-span-4 aspect-square'} relative group overflow-hidden shadow-2xl rounded-sm`}>
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-sky-900/10 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-brush text-3xl tracking-widest drop-shadow-md">{item.title}</p>
              </div>
            </div>
          ))}
          
          <div className="md:col-span-8 bg-sky-50 flex flex-col items-center justify-center p-12 text-center border border-sakura/20 rounded-sm">
            <div className="w-20 h-20 rounded-full border border-sakura/40 flex items-center justify-center mb-6 text-sakura group hover:bg-sakura hover:text-white transition-all cursor-pointer">
              <Video size={32} />
            </div>
            <h4 className="font-brush text-3xl mb-4 text-sky-900">{GUILD_DATA.videoSection.title}</h4>
            <p className="text-sky-600 max-w-md font-serif italic">
              {GUILD_DATA.videoSection.description}
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-10 py-3 border border-sky-900 text-sky-900 font-brush text-xl hover:bg-sky-900 hover:text-white transition-all">
                {GUILD_DATA.videoSection.buttonText}
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-sky-950 text-sky-200 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sakura/50 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8 opacity-60">
            <Seal text="LAZY" variant="sakura" />
          </div>
          <p className="font-brush text-5xl text-white mb-6 tracking-widest">{GUILD_DATA.name} Guild</p>
          <p className="font-serif-sc text-xs tracking-[0.4em] uppercase mb-12 text-sakura">{GUILD_DATA.edition} • Est. {GUILD_DATA.foundedYear}</p>
          
          <div className="flex justify-center gap-12 text-sm tracking-widest uppercase font-light">
            {GUILD_DATA.footer.links.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-sakura transition-colors">{link.label}</a>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-sky-900 text-[10px] opacity-30 tracking-[0.2em]">
            {GUILD_DATA.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
