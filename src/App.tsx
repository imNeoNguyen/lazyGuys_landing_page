/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Scroll, Shield, Users, History, Image as ImageIcon, Video, Quote, ChevronDown, PenTool as Brush, Wind, Star, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { GUILD_DATA } from './data';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

const Petals = () => {
  const petals = React.useMemo(() => 
    Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 10,
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="petal absolute will-change-transform transform-gpu"
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: '110vh', 
            opacity: [0, 0.8, 0.8, 0],
            rotate: p.rotate + 360
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: p.left }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="#ffb7c5" opacity="0.3">
            <path d="M12,2C12,2 10,6 6,10C2,14 4,18 8,20C12,22 12,22 12,22C12,22 12,22 16,20C20,18 22,14 18,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const Seal = ({ text, variant = "blue" }: { text: string, variant?: "blue" | "accent" }) => (
  <div className={`${variant === "blue" ? "blue-seal" : "accent-seal"} w-12 h-12 text-xl leading-none flex items-center justify-center shadow-sm rotate-[-5deg]`}>
    {text}
  </div>
);

const InkWash = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
    <motion.div
      animate={{ 
        x: [0, 15, 0],
        y: [0, -15, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-900 rounded-full blur-[80px] will-change-transform transform-gpu"
    />
    <motion.div
      animate={{ 
        x: [0, -20, 0],
        y: [0, 25, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-accent rounded-full blur-[100px] will-change-transform transform-gpu"
    />
  </div>
);

const Section = ({ children, className = "", id = "", bgImage, themeColor }: { children: React.ReactNode, className?: string, id?: string, bgImage?: string, themeColor?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    className={`py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto relative z-10 ${className} mb-8 md:mb-16`}
  >
    <InkWash />
    <div 
      className="absolute inset-0 z-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border border-white/20 backdrop-blur-md"
      style={{ backgroundColor: themeColor || 'rgba(255, 255, 255, 0.4)' }}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-15 md:opacity-20 pointer-events-none">
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
  <div className="hidden lg:flex absolute -left-12 top-24 flex-col items-center gap-4">
    <div className="vertical-text font-brush text-5xl text-sky-900 tracking-widest text-center">
      {title}
    </div>
    <div className="h-24 w-px bg-sky-200" />
    <div className="vertical-text font-sans text-xs uppercase tracking-[0.3em] text-accent">
      {subtitle}
    </div>
  </div>
);

const MobileTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="lg:hidden mb-8 border-l-4 border-accent pl-4">
    <div className="font-brush text-4xl text-sky-900 mb-1">{title}</div>
    <div className="font-sans text-xs uppercase tracking-widest text-accent">{subtitle}</div>
  </div>
);

const CharacterCard = ({ name, title, description, image, seal, index }: { name: string, title: string, description: string, image: string, seal: string, index: number }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={`bg-white/60 backdrop-blur-xl border ${isActive ? 'border-accent shadow-2xl' : 'border-accent/10 shadow-sm'} p-4 md:p-6 rounded-2xl transition-all duration-500 h-full relative overflow-hidden will-change-transform transform-gpu cursor-pointer`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative aspect-[3/4] overflow-hidden mb-4 md:mb-6 rounded-xl shadow-inner">
        <motion.img 
          animate={{ 
            scale: isActive ? 1.1 : 1,
            filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)'
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
          <Seal text={seal} variant="accent" />
        </div>
        
        {/* Decorative corner */}
        <div className={`absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-accent/30 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
      </div>

      <div className="relative z-10">
        <h4 className={`font-brush text-2xl md:text-3xl mb-1 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-sky-950'}`}>{name}</h4>
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-accent mb-3 md:mb-4 font-bold opacity-80">{title}</p>
        <p className={`text-sky-800 text-xs md:text-sm leading-relaxed font-serif italic transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>"{description}"</p>
      </div>
    </motion.div>
  );
};

const TarotSection = () => {
  const [pickedCards, setPickedCards] = useState<any[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIInterpretation = async (cards: any[]) => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `Bạn là một bậc thầy Tarot tâm linh, sâu sắc và đầy tri thức. 
      Hãy giải đoán một trải bài 3 lá (Quá khứ - Hiện tại - Tương lai) cho người xem.
      
      Các lá bài đã bốc:
      1. Quá khứ: ${cards[0].name} (${cards[0].title}) - Ý nghĩa cơ bản: ${cards[0].meaning}
      2. Hiện tại: ${cards[1].name} (${cards[1].title}) - Ý nghĩa cơ bản: ${cards[1].meaning}
      3. Tương lai: ${cards[2].name} (${cards[2].title}) - Ý nghĩa cơ bản: ${cards[2].meaning}
      
      Yêu cầu:
      - Viết một lời dẫn dắt huyền bí, mang tính tâm linh cao.
      - Phân tích sự kết nối giữa 3 lá bài này như một dòng chảy định mệnh.
      - Đưa ra lời khuyên thực tế nhưng vẫn giữ được phong cách Tarot truyền thống, sâu sắc.
      - Ngôn ngữ: Tiếng Việt, trang trọng, giàu hình ảnh và cảm xúc.
      - Độ dài: Khoảng 300-500 từ.
      - Định dạng: Markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiInterpretation(response.text || "");
    } catch (error) {
      console.error("AI Error:", error);
      setAiInterpretation("Vũ trụ đang tạm thời giữ im lặng. Hãy thử lại sau giây lát để kết nối lại với nguồn năng lượng.");
    } finally {
      setIsGenerating(false);
    }
  };

  const pickCard = () => {
    if (pickedCards.length >= 3) return;
    
    setIsPicking(true);
    
    // Simulate picking animation
    setTimeout(() => {
      let newCard;
      do {
        const randomIndex = Math.floor(Math.random() * GUILD_DATA.tarotCards.length);
        newCard = GUILD_DATA.tarotCards[randomIndex];
      } while (pickedCards.some(c => c.id === newCard.id)); // Avoid duplicate cards in one spread

      const newPickedCards = [...pickedCards, newCard];
      setPickedCards(newPickedCards);
      setIsPicking(false);
      
      if (newPickedCards.length === 3) {
        setShowResult(true);
        generateAIInterpretation(newPickedCards);
      }
    }, 1000);
  };

  const resetSpread = () => {
    setPickedCards([]);
    setShowResult(false);
    setIsPicking(false);
    setAiInterpretation("");
    setIsGenerating(false);
  };

  const spreadLabels = ["Quá Khứ", "Hiện Tại", "Tương Lai"];

  return (
    <Section className="lg:pl-32" bgImage="https://images.unsplash.com/photo-1516339901600-2e1a62dc0c45?q=80&w=1942&auto=format&fit=crop" themeColor="rgba(10, 10, 30, 0.9)">
      <VerticalTitle title="DIVINATION" subtitle="Tiếng Nói Vũ Trụ" />
      <MobileTitle title="DIVINATION" subtitle="Tiếng Nói Vũ Trụ" />
      
      <div className="max-w-6xl mx-auto text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-2xl border border-white/5 p-8 md:p-16 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <div className="mb-12">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Sparkles className="text-accent" size={32} />
            </motion.div>
            <h3 className="font-brush text-5xl md:text-7xl text-white mb-6 tracking-wider">Trải Bài 3 Lá</h3>
            <p className="text-sky-100 font-serif italic text-lg max-w-2xl mx-auto leading-relaxed">
              Hãy tập trung vào câu hỏi của bạn. Lần lượt thỉnh cầu 3 lá bài đại diện cho Quá khứ, Hiện tại và Tương lai để thấu hiểu dòng chảy của định mệnh.
            </p>
          </div>

          <div className="flex flex-col items-center gap-12">
            {/* The Spread Slots */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent/60 mb-4">{spreadLabels[i]}</p>
                  <div className="relative w-40 h-64 md:w-48 md:h-72">
                    <AnimatePresence mode="wait">
                      {pickedCards[i] ? (
                        <motion.div
                          key={`card-${pickedCards[i].id}`}
                          initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                          className="w-full h-full rounded-xl overflow-hidden border border-accent/40 shadow-2xl relative group"
                        >
                          <img 
                            src={pickedCards[i].image} 
                            alt={pickedCards[i].name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-0 right-0 text-center">
                            <p className="font-brush text-xl text-white drop-shadow-lg">{pickedCards[i].title}</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={`empty-${i}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={!isPicking && pickedCards.length === i ? pickCard : undefined}
                          className={`w-full h-full rounded-xl border-2 border-dashed transition-all duration-500 flex items-center justify-center cursor-pointer
                            ${pickedCards.length === i ? 'border-accent/40 bg-accent/5 hover:bg-accent/10' : 'border-white/5 bg-white/5 opacity-50 cursor-default'}`}
                        >
                          {isPicking && pickedCards.length === i ? (
                            <div className="relative">
                              <div className="w-8 h-8 border-2 border-accent/20 rounded-full" />
                              <div className="absolute inset-0 w-8 h-8 border-t-2 border-accent rounded-full animate-spin" />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Wind className={pickedCards.length === i ? "text-accent/40" : "text-white/10"} size={32} />
                              <span className="font-sans text-[8px] uppercase tracking-widest text-white/20">Thỉnh Cầu</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Combined Interpretation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-4xl bg-white/5 border border-accent/20 rounded-3xl p-8 md:p-12 text-left"
                >
                  <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                    <div className="h-px w-8 bg-accent/30" />
                    <h4 className="font-brush text-4xl text-accent tracking-wide">Lời Sấm Truyền Tổng Hợp</h4>
                    <div className="h-px w-8 bg-accent/30" />
                  </div>
                  
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pickedCards.map((card, i) => (
                        <div key={i} className="bg-black/20 p-6 rounded-2xl border border-white/5">
                          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent/60 mb-2">{spreadLabels[i]}</p>
                          <h5 className="font-brush text-2xl text-white mb-2">{card.title}</h5>
                          <p className="text-sky-50 text-xs font-serif italic leading-relaxed">
                            {card.meaning.substring(0, 100)}...
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="relative pt-8 border-t border-white/10">
                      {isGenerating ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="text-accent" size={48} />
                          </motion.div>
                          <p className="font-brush text-2xl text-white animate-pulse">Đang kết nối với dòng chảy vũ trụ...</p>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="prose prose-invert prose-lg max-w-none 
                            prose-p:text-white prose-p:font-serif prose-p:leading-relaxed 
                            prose-li:text-white prose-li:font-serif
                            prose-strong:text-accent prose-strong:font-bold
                            prose-headings:text-accent prose-headings:font-brush prose-headings:tracking-wide
                            prose-em:text-accent prose-em:italic"
                        >
                          <ReactMarkdown>{aiInterpretation}</ReactMarkdown>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="mt-12 flex justify-center">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetSpread}
                      className="group relative px-10 py-4 overflow-hidden rounded-full border border-accent/50 transition-all duration-500 hover:border-accent"
                    >
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
                      <span className="relative z-10 text-accent font-sans text-xs uppercase tracking-[0.3em] font-bold">Gieo Quẻ Mới</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-12 flex justify-center gap-6 opacity-20">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} />)}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};


export default function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <div className="font-sans selection:bg-accent/20 bg-[#f0f9ff] relative overflow-hidden">
      <ScrollProgress />
      <Petals />
      
      {/* Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-accent rounded-full blur-[80px] md:blur-[100px] will-change-transform transform-gpu" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.08, 0.05],
            x: [0, -25, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] md:w-[50%] h-[50%] bg-sky-400 rounded-full blur-[100px] md:blur-[120px] will-change-transform transform-gpu" 
        />
      </div>
      
      {/* Decorative Border */}
      <div className="fixed inset-0 pointer-events-none border-[8px] md:border-[24px] border-sky-50/30 z-50 mix-blend-multiply" />
      
      {/* Hero Banner */}
      <header className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20">
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0 overflow-hidden will-change-transform transform-gpu"
        >
          <img
            src={GUILD_DATA.heroImage}
            alt="Sakura Blossoms"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-sky-400/5 to-[#f0f9ff]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#f0f9ff] via-[#f0f9ff]/90 to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 w-full max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              className="flex justify-center mb-6 md:mb-10"
            >
              <Seal text="LAZY" variant="blue" />
            </motion.div>
            
            <h1 className="font-brush text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] mb-2 text-white tracking-tighter drop-shadow-2xl leading-none">
              {GUILD_DATA.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-cursive text-3xl sm:text-4xl md:text-6xl text-accent drop-shadow-md mb-8 md:mb-14 tracking-widest"
            >
              {GUILD_DATA.subName}
            </motion.p>
            
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sky-800 tracking-[0.2em] md:tracking-[0.6em] uppercase text-[11px] md:text-base font-bold mt-8"
            >
              <span className="hidden md:block w-16 h-px bg-gradient-to-r from-transparent to-accent" />
              <span className="text-center px-6 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/40 shadow-sm">
                Hội người hướng nội - Partime
              </span>
              <span className="hidden md:block w-16 h-px bg-gradient-to-l from-transparent to-accent" />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 15, 0] }}
            transition={{ delay: 3, duration: 2, repeat: Infinity }}
            className="mt-16 md:absolute md:bottom-[-4rem] md:left-1/2 md:-translate-x-1/2 cursor-pointer text-accent flex flex-col items-center gap-2"
            onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Khám phá</span>
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </header>

      {/* Slogan Section */}
      <Section className="text-center pt-24 md:pt-48">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto border-y-2 border-accent/20 py-12 md:py-20 relative px-6"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f0f9ff] px-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Wind className="text-accent" size={28} />
            </motion.div>
          </div>
          <h2 className="font-brush text-4xl sm:text-5xl md:text-7xl text-sky-950 leading-tight mb-8">
            "{GUILD_DATA.slogan}"
          </h2>
          <div className="h-1 w-24 bg-accent/30 mx-auto mb-8 rounded-full" />
          <p className="text-sky-800 font-serif italic text-lg md:text-2xl leading-relaxed opacity-90">
            {GUILD_DATA.philosophy}
          </p>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#f0f9ff] px-6">
            <Sparkles className="text-accent" size={24} />
          </div>
        </motion.div>
      </Section>

      {/* Introduction */}
      <Section id="intro" className="lg:pl-32" bgImage={GUILD_DATA.intro.bgImage} themeColor={GUILD_DATA.intro.themeColor}>
        <VerticalTitle title={GUILD_DATA.intro.verticalTitle} subtitle={GUILD_DATA.intro.verticalSubtitle} />
        <MobileTitle title={GUILD_DATA.intro.verticalTitle} subtitle={GUILD_DATA.intro.verticalSubtitle} />
        
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="font-brush text-3xl md:text-5xl mb-6 md:mb-8 text-sky-900">{GUILD_DATA.intro.title}</h3>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed text-sky-800 font-sans">
              <p>{GUILD_DATA.intro.description1}</p>
              <p>{GUILD_DATA.intro.description2}</p>
            </div>
            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {GUILD_DATA.intro.features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.2 }}
                  className="border-l-2 border-accent pl-4 group"
                >
                  <h4 className="font-brush text-xl md:text-2xl text-sky-900 mb-1 md:mb-2 group-hover:text-accent transition-colors">{feature.title}</h4>
                  <p className="text-xs md:text-sm text-sky-600 opacity-80 group-hover:opacity-100">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-2 md:-inset-4 border border-accent/20 rounded-sm -rotate-1 md:-rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[3/4] overflow-hidden shadow-xl rounded-sm">
              <img 
                src={GUILD_DATA.intro.image} 
                alt="Sakura Temple" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6">
              <Seal text="THIỀN" variant="accent" />
            </div>
          </div>
        </div>
      </Section>

      {/* Key Figures Section */}
      <Section className="lg:pl-32" bgImage={GUILD_DATA.characterSection.bgImage} themeColor={GUILD_DATA.characterSection.themeColor}>
        <VerticalTitle title={GUILD_DATA.characterSection.verticalTitle} subtitle={GUILD_DATA.characterSection.verticalSubtitle} />
        <MobileTitle title={GUILD_DATA.characterSection.verticalTitle} subtitle={GUILD_DATA.characterSection.verticalSubtitle} />
        
        <div className="mb-8 md:mb-12">
          <h3 className="font-brush text-3xl md:text-5xl text-sky-900 mb-2 md:mb-4">{GUILD_DATA.characterSection.title}</h3>
          <p className="text-sky-600 font-serif italic text-sm md:text-base">{GUILD_DATA.characterSection.subtitle}</p>
        </div>
        
        <div className="relative">
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 md:pb-12 scrollbar-hide snap-x snap-mandatory px-2 -mx-2">
            {GUILD_DATA.characters.map((char, index) => (
              <div key={char.id} className="flex-none w-[260px] sm:w-[300px] md:w-[350px] snap-center">
                <CharacterCard 
                  name={char.name}
                  title={char.title}
                  description={char.description}
                  image={char.image}
                  seal={char.seal}
                  index={index}
                />
              </div>
            ))}
            <div className="flex-none w-[200px] sm:w-[250px] md:w-[350px] snap-center flex flex-col items-center justify-center border-2 border-dashed border-accent/30 rounded-sm bg-white/20 backdrop-blur-sm p-6 text-center">
              <Star className="text-accent mb-4 animate-pulse w-8 h-8 md:w-12 md:h-12" />
              <p className="font-brush text-xl md:text-2xl text-sky-900">Thêm Những Huyền Thoại...</p>
              <p className="text-sky-600 font-serif italic text-xs md:text-sm mt-2">Đang nghỉ ngơi trong rừng trúc</p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
            <div className="w-16 h-1 bg-sky-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* History */}
      <Section className="lg:pl-32" bgImage={GUILD_DATA.historySection.bgImage} themeColor={GUILD_DATA.historySection.themeColor}>
        <VerticalTitle title={GUILD_DATA.historySection.verticalTitle} subtitle={GUILD_DATA.historySection.verticalSubtitle} />
        <MobileTitle title={GUILD_DATA.historySection.verticalTitle} subtitle={GUILD_DATA.historySection.verticalSubtitle} />
        
        <div className="max-w-3xl">
          <div className="space-y-12 md:space-y-20 relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/30" />
            
            {GUILD_DATA.history.map((item) => (
              <div key={item.id} className="relative pl-8 md:pl-12">
                <div className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full ${item.type === 'sakura' ? 'bg-accent' : 'bg-sky-300'}`} />
                <span className="text-sky-900 font-brush text-xl md:text-2xl block mb-2">{item.title}</span>
                <p className="text-sky-700 leading-relaxed text-sm md:text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section className="lg:pl-32" bgImage={GUILD_DATA.gallerySection.bgImage} themeColor={GUILD_DATA.gallerySection.themeColor}>
        <VerticalTitle title={GUILD_DATA.gallerySection.verticalTitle} subtitle={GUILD_DATA.gallerySection.verticalSubtitle} />
        <MobileTitle title={GUILD_DATA.gallerySection.verticalTitle} subtitle={GUILD_DATA.gallerySection.verticalSubtitle} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8">
          {GUILD_DATA.gallery.map((item, idx) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${item.span === 'large' ? 'lg:col-span-8 aspect-video' : 'lg:col-span-4 aspect-square'} relative group overflow-hidden shadow-lg md:shadow-2xl rounded-xl`}
            >
              <motion.img 
                whileHover={{ scale: 1.15, rotate: 1 }}
                transition={{ duration: 1 }}
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-sky-900/20 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500 m-4 rounded-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="font-brush text-xl md:text-4xl tracking-widest drop-shadow-lg"
                >
                  {item.title}
                </motion.p>
              </div>
            </motion.div>
          ))}
          
          <div className="sm:col-span-2 lg:col-span-8 bg-sky-50 flex flex-col items-center justify-center p-8 md:p-12 text-center border border-accent/20 rounded-sm">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-accent/40 flex items-center justify-center mb-4 md:mb-6 text-accent group hover:bg-accent hover:text-white transition-all cursor-pointer">
              <Video className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h4 className="font-brush text-2xl md:text-3xl mb-2 md:mb-4 text-sky-900">{GUILD_DATA.videoSection.title}</h4>
            <p className="text-sky-600 max-w-md font-serif italic text-sm md:text-base">
              {GUILD_DATA.videoSection.description}
            </p>
            <div className="mt-6 md:mt-8 flex gap-4">
              <button className="px-6 md:px-10 py-2 md:py-3 border border-sky-900 text-sky-900 font-brush text-lg md:text-xl hover:bg-sky-900 hover:text-white transition-all">
                {GUILD_DATA.videoSection.buttonText}
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Tarot Section */}
      <TarotSection />

      {/* Footer */}
      <footer className="bg-sky-950 text-sky-200 py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6 md:mb-8 opacity-60">
            <Seal text="LAZY" variant="accent" />
          </div>
          <p className="font-brush text-4xl md:text-5xl text-white mb-4 md:mb-6 tracking-widest">Bang Hội {GUILD_DATA.name}</p>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase mb-8 md:mb-12 text-accent">{GUILD_DATA.edition} • Thành lập {GUILD_DATA.foundedYear}</p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-sm tracking-widest uppercase font-light">
            {GUILD_DATA.footer.links.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-accent transition-colors">{link.label}</a>
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 pt-8 border-t border-sky-900 text-[8px] md:text-[10px] opacity-30 tracking-[0.2em] px-4">
            {GUILD_DATA.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
