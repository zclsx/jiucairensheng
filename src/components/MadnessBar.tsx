'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MADNESS_WARNING_THRESHOLD } from '@/data/psychologyData';

export interface MadnessBarProps {
  score: number;           // 0-100
  animated?: boolean;      // 是否显示动画
  showLabel?: boolean;     // 是否显示文字标签
}

/**
 * MadnessBar 组件 - 疯狂指数进度条
 * 
 * Requirements: 5.1, 5.2, 5.3
 * - 在界面顶部显示疯狂指数进度条
 * - 使用动画效果展示疯狂指数的变化
 * - 疯狂指数超过 70 分时进度条颜色变为红色警告状态
 */
export default function MadnessBar({ 
  score, 
  animated = true, 
  showLabel = true 
}: MadnessBarProps) {
  // Clamp score to 0-100 range
  const clampedScore = Math.max(0, Math.min(100, score));
  
  // Determine if in warning state (score > 70)
  const isWarning = clampedScore > MADNESS_WARNING_THRESHOLD;
  
  // Get status text based on score
  const getStatusText = (score: number): string => {
    if (score >= 80) return '加大药量 🤯';
    if (score >= 70) return '抓紧治疗 😵';
    if (score >= 50) return '有点上头 😤';
    if (score >= 30) return '还算清醒 😐';
    return '冷静如镰刀 🧊';
  };

  // Gradient colors based on warning state
  const barGradient = isWarning
    ? 'from-red-400 via-red-500 to-red-600'
    : 'from-amber-300 via-orange-400 to-orange-500';
  
  const glowColor = isWarning
    ? 'rgba(239, 68, 68, 0.65)'
    : 'rgba(251, 146, 60, 0.55)';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-700 drop-shadow-sm flex items-center gap-2">
            🔥 疯狂指数
          </span>
          <span className={`text-sm font-bold drop-shadow-sm ${
            isWarning ? 'text-red-500' : 'text-orange-500'
          }`}>
            {clampedScore}/100 · {getStatusText(clampedScore)}
          </span>
        </div>
      )}
      
      <div className="w-full h-3 bg-slate-200/60 border border-white/60 rounded-full overflow-hidden shadow-inner shadow-white/40 relative">
        {/* Background pulse effect for warning state */}
        {isWarning && (
          <motion.div
            className="absolute inset-0 bg-red-500/20"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        
        {/* Progress bar */}
        <motion.div
          className={`h-full bg-gradient-to-r ${barGradient} border-t border-white/30 relative`}
          initial={animated ? { width: 0 } : { width: `${clampedScore}%` }}
          animate={{ width: `${clampedScore}%` }}
          transition={animated ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
          style={{
            boxShadow: `0 0 14px ${glowColor}`,
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent h-1/2" />
        </motion.div>
      </div>
    </div>
  );
}
