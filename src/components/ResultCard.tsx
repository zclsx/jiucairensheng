'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Copy, Check, Minus, Square, X } from 'lucide-react';
import { Result, TagType } from '@/data/gameData';
import { 
  DimensionScores, 
  SurvivalRating, 
  PsychologicalIssue,
  Recommendation,
} from '@/data/psychologyData';
import RadarChart from './RadarChart';
import MadnessBar from './MadnessBar';

export interface ResultCardProps {
  result: Result;                    // 现有人格结果
  madnessScore: number;              // 疯狂指数
  survivalRating: SurvivalRating;    // 生存评级
  dimensionScores: DimensionScores;  // 维度得分
  tagDistribution: Record<TagType, { count: number; percentage: number }>; // Tag 分布
  recommendations: Recommendation[]; // 改善建议
  issues: PsychologicalIssue[];      // 心理问题
  shareText: string;                 // 分享文案
}

/**
 * ResultCard 组件 - 升级版结果展示卡片
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 * - 左侧显示人格类型和毒舌点评
 * - 右侧显示数据面板（疯狂指数、生存评级、维度得分）
 * - 集成雷达图和 Tag 分布
 */
export default function ResultCard({
  result,
  madnessScore,
  survivalRating,
  dimensionScores,
  tagDistribution,
  recommendations,
  issues,
  shareText,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'diagnosis' | 'advice'>('overview');

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get top tags for display
  const topTags = Object.entries(tagDistribution)
    .filter(([, data]) => data.count > 0)
    .sort((a, b) => b[1].percentage - a[1].percentage)
    .slice(0, 5);

  // Get survival rating color
  const getSurvivalColor = (rating: SurvivalRating): string => {
    switch (rating) {
      case '韭菜': return 'text-red-500';
      case '老韭菜': return 'text-orange-500';
      case '韭菜王': return 'text-yellow-500';
      case '镰刀预备役': return 'text-blue-500';
      case '终极镰刀': return 'text-green-500';
      default: return 'text-slate-500';
    }
  };

  // Get severity color
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'severe': return 'bg-red-100 text-red-700 border-red-200';
      case 'moderate': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-5xl bg-white/18 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.55)] overflow-hidden z-10"
    >
      {/* Window Title Bar */}
      <div className="h-10 bg-gradient-to-b from-slate-200/90 via-slate-200/60 to-slate-300/40 border-b border-white/40 flex items-center justify-between px-4 select-none">
        <span className="text-sm font-semibold text-slate-900 drop-shadow flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Windows_logo_-_2012_%28dark_blue%29.svg"
            alt="Windows"
            className="w-4 h-4 opacity-70"
          />
          韭菜人生 - 深度诊断报告.exe
        </span>
        <WindowButtons />
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white/40 border-b border-white/30">
        {[
          { id: 'overview', label: '📊 总览' },
          { id: 'diagnosis', label: '🔍 诊断' },
          { id: 'advice', label: '💡 建议' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-2 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white/60 text-slate-800 border-b-2 border-blue-500'
                : 'text-slate-600 hover:bg-white/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-gradient-to-b from-white/80 via-white/55 to-white/20 text-slate-800 relative min-h-[500px]">
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(152,214,255,0.6),transparent_35%)]" />
        
        <div className="relative p-6">
          {activeTab === 'overview' && (
            <OverviewTab
              result={result}
              madnessScore={madnessScore}
              survivalRating={survivalRating}
              dimensionScores={dimensionScores}
              topTags={topTags}
              getSurvivalColor={getSurvivalColor}
            />
          )}
          
          {activeTab === 'diagnosis' && (
            <DiagnosisTab
              issues={issues}
              getSeverityColor={getSeverityColor}
            />
          )}
          
          {activeTab === 'advice' && (
            <AdviceTab recommendations={recommendations} />
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white/30 border-t border-white/40 p-4 flex justify-center gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gradient-to-b from-white/90 to-slate-200 border border-white/70 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_20px_rgba(0,0,0,0.25)] hover:brightness-110 active:scale-95 text-slate-800 font-bold flex items-center gap-2"
        >
          <RefreshCw size={16} /> 重新测试
        </button>
        <button
          onClick={handleCopyShare}
          className="px-6 py-2 bg-gradient-to-b from-emerald-400 to-emerald-600 border border-emerald-700 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_25px_rgba(16,185,129,0.45)] hover:brightness-110 active:scale-95 text-white font-bold flex items-center gap-2 drop-shadow"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? '已复制!' : '复制分享'}
        </button>
        <button
          onClick={() => window.open('https://x.com', '_blank')}
          className="px-6 py-2 bg-gradient-to-b from-sky-300 to-sky-500 border border-sky-600 rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_25px_rgba(14,165,233,0.45)] hover:brightness-110 active:scale-95 text-white font-bold flex items-center gap-2 drop-shadow"
        >
          <Share2 size={16} /> 分享到 X
        </button>
      </div>
    </motion.div>
  );
}

// Overview Tab Component
function OverviewTab({
  result,
  madnessScore,
  survivalRating,
  dimensionScores,
  topTags,
  getSurvivalColor,
}: {
  result: Result;
  madnessScore: number;
  survivalRating: SurvivalRating;
  dimensionScores: DimensionScores;
  topTags: [string, { count: number; percentage: number }][];
  getSurvivalColor: (rating: SurvivalRating) => string;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Personality Type */}
      <div className="flex-1">
        <div className="text-center lg:text-left">
          <div className="text-7xl mb-4 drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
            {result.img}
          </div>
          <h2 className={`text-3xl font-bold mb-2 drop-shadow-sm ${result.color}`}>
            {result.title}
          </h2>
          <div className={`text-lg font-bold mb-4 ${getSurvivalColor(survivalRating)}`}>
            🏆 生存评级: {survivalRating}
          </div>
          <div className="bg-white/60 border border-white/70 p-4 rounded-xl shadow-inner shadow-white/40">
            <p className="text-base leading-relaxed font-semibold text-slate-800 drop-shadow">
              {result.roast}
            </p>
          </div>
        </div>

        {/* Madness Bar */}
        <div className="mt-6">
          <MadnessBar score={madnessScore} animated={true} showLabel={true} />
        </div>

        {/* Tag Distribution */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">📈 人格成分分布</h3>
          <div className="space-y-2">
            {topTags.map(([tag, data]) => (
              <div key={tag} className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600 w-20 truncate">
                  {tag}
                </span>
                <div className="flex-1 h-2 bg-slate-200/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${data.percentage}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 w-10 text-right">
                  {data.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Radar Chart */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">🎯 心理维度分析</h3>
        <RadarChart dimensions={dimensionScores} size={280} showLabels={true} />
      </div>
    </div>
  );
}

// Diagnosis Tab Component
function DiagnosisTab({
  issues,
  getSeverityColor,
}: {
  issues: PsychologicalIssue[];
  getSeverityColor: (severity: string) => string;
}) {
  const getSeverityLabel = (severity: string): string => {
    switch (severity) {
      case 'severe': return '严重';
      case 'moderate': return '中度';
      default: return '轻度';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">🔍 核心心理问题诊断</h3>
      {issues.length === 0 ? (
        <p className="text-slate-600">恭喜！没有发现明显的心理问题。</p>
      ) : (
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/60 border border-white/70 rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-base font-bold text-slate-800">
                  {index + 1}. {issue.name}
                </h4>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getSeverityColor(issue.severity)}`}>
                  {getSeverityLabel(issue.severity)}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {issue.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {issue.relatedDimensions.map((dim) => (
                  <span
                    key={dim}
                    className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                  >
                    {dim}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Advice Tab Component
function AdviceTab({ recommendations }: { recommendations: Recommendation[] }) {
  // Group recommendations by issue
  const groupedRecs = recommendations.reduce((acc, rec) => {
    if (!acc[rec.issueId]) {
      acc[rec.issueId] = [];
    }
    acc[rec.issueId].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">💡 改善建议</h3>
      {recommendations.length === 0 ? (
        <p className="text-slate-600">暂无建议，继续保持！</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedRecs).map(([issueId, recs], groupIndex) => (
            <div key={issueId}>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 capitalize">
                针对: {issueId.replace(/_/g, ' ')}
              </h4>
              <div className="space-y-3">
                {recs.map((rec, index) => (
                  <motion.div
                    key={`${issueId}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * recs.length + index) * 0.05 }}
                    className="bg-white/60 border border-white/70 rounded-lg p-4"
                  >
                    <h5 className="font-bold text-slate-800 mb-1">{rec.title}</h5>
                    <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                    <ul className="space-y-1">
                      {rec.actionItems.map((item, i) => (
                        <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Window Buttons Component
function WindowButtons() {
  return (
    <div className="flex gap-1">
      <button className="w-7 h-6 bg-gradient-to-b from-white/90 to-slate-100 rounded-sm shadow border border-white/70 flex items-center justify-center hover:brightness-110">
        <Minus size={12} className="text-slate-700" />
      </button>
      <button className="w-7 h-6 bg-gradient-to-b from-white/90 to-slate-100 rounded-sm shadow border border-white/70 flex items-center justify-center hover:brightness-110">
        <Square size={11} className="text-slate-700" />
      </button>
      <button className="w-7 h-6 bg-gradient-to-b from-red-200 to-red-500 rounded-sm shadow border border-red-300 flex items-center justify-center hover:brightness-110">
        <X size={13} className="text-white drop-shadow" />
      </button>
    </div>
  );
}
