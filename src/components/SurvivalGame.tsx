'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, calculateResult, Result } from '@/data/gameData';
import { Minus, Square, X } from 'lucide-react';
import { DimensionScores, DEFAULT_DIMENSION_SCORES, SurvivalRating, PsychologicalIssue, Recommendation } from '@/data/psychologyData';
import { calculateDimensionScores, calculateMadnessScore, calculateMadnessScoreFromSelections, calculateSurvivalRating, calculateTagScores } from '@/data/scoreCalculator';
import { calculateTagDistribution, identifyPsychologicalIssues, generateRecommendations, generateShareText } from '@/data/psychologyEngine';
import MadnessBar from './MadnessBar';
import ResultCard from './ResultCard';
import { TagType } from '@/data/gameData';

const WALLPAPER_URL = '/1.npg';

export default function SurvivalGame() {
  const [stageIndex, setStageIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allSelections, setAllSelections] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  
  // New state for psychology system (Requirements: 1.2, 5.1)
  const [madnessScore, setMadnessScore] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<DimensionScores>(DEFAULT_DIMENSION_SCORES);
  const [survivalRating, setSurvivalRating] = useState<SurvivalRating>('终极镰刀');
  const [tagDistribution, setTagDistribution] = useState<Record<TagType, { count: number; percentage: number }>>({} as Record<TagType, { count: number; percentage: number }>);
  const [issues, setIssues] = useState<PsychologicalIssue[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [shareText, setShareText] = useState('');

  const currentQuestion = QUESTIONS[stageIndex];
  const isLastStage = stageIndex === QUESTIONS.length - 1;
  const canProceed = selectedIds.length >= 2; // Require at least 2 choices per level
  
  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleNext = () => {
    const newHistory = [...allSelections, ...selectedIds];
    setAllSelections(newHistory);
    setSelectedIds([]);
    
    // Update dimension scores and madness score in real-time (Requirements: 1.2, 5.1)
    const newDimensionScores = calculateDimensionScores(newHistory);
    // 使用基于选项的疯狂指数计算
    const newMadnessScore = calculateMadnessScoreFromSelections(newHistory);
    setDimensionScores(newDimensionScores);
    setMadnessScore(newMadnessScore);
    
    if (isLastStage) {
      // Calculate final results - 人格匹配基于 tag 统计
      const finalResult = calculateResult(newHistory);
      // 生存评级基于疯狂指数
      const finalMadnessScore = calculateMadnessScoreFromSelections(newHistory);
      const finalSurvivalRating = calculateSurvivalRating(finalMadnessScore);
      const tagScores = calculateTagScores(newHistory);
      const finalTagDistribution = calculateTagDistribution(tagScores);
      const finalIssues = identifyPsychologicalIssues(newDimensionScores);
      const finalRecommendations = generateRecommendations(finalIssues);
      const finalShareText = generateShareText(finalResult, finalMadnessScore, finalSurvivalRating);
      
      setResult(finalResult);
      setSurvivalRating(finalSurvivalRating);
      setTagDistribution(finalTagDistribution);
      setIssues(finalIssues);
      setRecommendations(finalRecommendations);
      setShareText(finalShareText);
    } else {
      setStageIndex((prev) => prev + 1);
    }
  };

  // Result page with upgraded ResultCard (Requirements: 1.5, 4.1, 4.2)
  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-[Segoe_UI,Inter,sans-serif] text-white relative overflow-hidden">
        <Wallpaper />

        <ResultCard
          result={result}
          madnessScore={madnessScore}
          survivalRating={survivalRating}
          dimensionScores={dimensionScores}
          tagDistribution={tagDistribution}
          recommendations={recommendations}
          issues={issues}
          shareText={shareText}
        />

        <FooterLinks />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-[Segoe_UI,Inter,sans-serif] text-white">
      <Wallpaper />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-4xl h-[80vh] md:h-[75vh] mb-12 md:mb-0 flex flex-col bg-white/18 backdrop-blur-xl rounded-2xl border border-white/55 shadow-[0_16px_48px_rgba(0,0,0,0.55)] overflow-hidden z-10"
      >
        <div className="h-11 bg-gradient-to-b from-slate-200/90 via-slate-200/60 to-slate-300/40 border-b border-white/45 flex items-center justify-between px-4 shrink-0 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
          <span className="font-semibold text-slate-900 drop-shadow-md text-sm flex items-center gap-2">
            韭菜人生（恩师牛英俊版）.exe
          </span>
          <WindowButtons />
        </div>

        <div className="flex-1 flex flex-col bg-gradient-to-b from-white/65 via-white/35 to-white/15 p-4 md:p-8 overflow-y-auto relative">
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.9),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(120,194,255,0.6),transparent_40%)]" />

          {/* Stage Progress Bar */}
          <div className="w-full h-4 bg-slate-200/60 border border-white/60 rounded-full mb-4 overflow-hidden shadow-inner shadow-white/40">
            <motion.div
              className="h-full bg-gradient-to-r from-green-300 via-green-500 to-green-600 border-t border-green-100 shadow-[0_0_14px_rgba(74,222,128,0.65)]"
              initial={{ width: 0 }}
              animate={{ width: `${((stageIndex + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          
          {/* Madness Bar - Real-time madness score display (Requirements: 5.1, 5.2) */}
          <div className="mb-6">
            <MadnessBar 
              score={madnessScore} 
              animated={true} 
              showLabel={true} 
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-900 drop-shadow-md mb-1 md:mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-sm md:text-lg text-slate-800 font-semibold mb-4 md:mb-6 drop-shadow-sm">
              {currentQuestion.subtitle}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pb-16 md:pb-24">
            <AnimatePresence mode="popLayout">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedIds.includes(opt.id);
                return (
                  <motion.button
                    key={opt.id}
                    layout
                    onClick={() => handleToggle(opt.id)}
                    whileHover={{ translateY: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative overflow-hidden rounded-lg md:rounded-xl text-left border shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-all duration-200 px-3 py-2.5 md:px-4 md:py-4 ${
                      isSelected
                        ? 'bg-gradient-to-b from-sky-200/90 via-sky-400/80 to-sky-600/70 border-sky-100 ring-2 ring-sky-200 text-white scale-[1.02]'
                        : 'bg-gradient-to-b from-white/75 via-white/55 to-white/35 border-white/70 hover:border-white/90 text-slate-800'
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/70" />
                    <div
                      className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${
                        isSelected ? 'opacity-80' : 'opacity-30'
                      } bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(126,192,255,0.6),transparent_40%)]`}
                    />
                    <div className="relative flex items-center gap-2 md:gap-3 drop-shadow-sm">
                      <div
                        className={`w-4 h-4 md:w-5 md:h-5 rounded-md border shadow-inner flex-shrink-0 ${
                          isSelected
                            ? 'bg-sky-500 border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                            : 'bg-white/80 border-slate-300'
                        }`}
                      />
                      <span
                        className={`text-sm md:text-base font-semibold drop-shadow ${
                          isSelected ? 'text-white' : 'text-slate-800'
                        }`}
                      >
                        {opt.text}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="h-14 md:h-16 bg-white/25 backdrop-blur-md border-t border-white/40 flex items-center justify-between px-4 md:px-8 shrink-0 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
          <div className="text-sm md:text-base text-slate-800 font-bold drop-shadow-sm">已选: {selectedIds.length} 项</div>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-5 md:px-8 py-2 rounded-md text-sm md:text-base font-bold shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-all border ${
              canProceed
                ? 'bg-gradient-to-b from-green-400 to-green-600 border-green-700 text-white hover:brightness-110 active:translate-y-0.5'
                : 'bg-slate-200/80 border-slate-300 text-slate-500 cursor-not-allowed grayscale'
            }`}
          >
            {isLastStage ? '完成' : '下一步 >'}
          </button>
        </div>
      </motion.div>

      <FooterLinks />
    </div>
  );
}

function Wallpaper() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${WALLPAPER_URL}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60 backdrop-blur-[2px]" />
    </>
  );
}

function WindowButtons({ small }: { small?: boolean }) {
  const sizeClass = small ? 'w-7' : 'w-8';
  const icon = 12;
  return (
    <div className="flex gap-1">
      <button className={`${sizeClass} h-6 bg-gradient-to-b from-white/90 to-slate-100 rounded-sm shadow border border-white/70 flex items-center justify-center hover:brightness-110`}>
        <Minus size={icon} className="text-slate-700" />
      </button>
      <button className={`${sizeClass} h-6 bg-gradient-to-b from-white/90 to-slate-100 rounded-sm shadow border border-white/70 flex items-center justify-center hover:brightness-110`}>
        <Square size={icon - 1} className="text-slate-700" />
      </button>
      <button className={`${sizeClass} h-6 bg-gradient-to-b from-red-200 to-red-500 rounded-sm shadow border border-red-300 flex items-center justify-center hover:brightness-110`}>
        <X size={icon + 1} className="text-white drop-shadow" />
      </button>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 flex gap-3 md:gap-6 text-xs md:text-sm text-white drop-shadow z-30">
      <a
        href="https://x.com/youknow028"
        target="_blank"
        rel="noreferrer"
        className="bg-black/50 backdrop-blur-sm border border-white/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full hover:bg-black/60 transition"
      >
        @youknow028
      </a>
      <a
        href="https://x.com/0xark21"
        target="_blank"
        rel="noreferrer"
        className="bg-black/50 backdrop-blur-sm border border-white/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full hover:bg-black/60 transition"
      >
        @0xark21
      </a>
    </div>
  );
}
