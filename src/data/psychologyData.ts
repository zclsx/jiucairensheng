import { TagType, Result } from './gameData';

// 维度得分接口
export interface DimensionScores {
  riskAppetite: number;      // 风险偏好 (0-100)
  emotionalControl: number;  // 情绪控制 (0-100)
  cognitiveBias: number;     // 认知偏差 (0-100)
  socialDependency: number;  // 社交依赖 (0-100)
  greedIndex: number;        // 贪婪指数 (0-100)
}

// 生存评级类型
export type SurvivalRating = 
  | '韭菜'           // madness >= 80
  | '老韭菜'         // madness 60-79
  | '韭菜王'         // madness 40-59
  | '镰刀预备役'     // madness 20-39
  | '终极镰刀';      // madness < 20

// 生存评级阈值常量
export const SURVIVAL_RATING_THRESHOLDS = {
  LEEK: 80,           // 韭菜: >= 80
  OLD_LEEK: 60,       // 老韭菜: 60-79
  LEEK_KING: 40,      // 韭菜王: 40-59
  SICKLE_TRAINEE: 20, // 镰刀预备役: 20-39
  ULTIMATE_SICKLE: 0, // 终极镰刀: < 20
} as const;

// 心理问题严重程度
export type IssueSeverity = 'mild' | 'moderate' | 'severe';

// 心理问题接口
export interface PsychologicalIssue {
  id: string;
  name: string;
  severity: IssueSeverity;
  description: string;
  relatedDimensions: (keyof DimensionScores)[];
}

// 改善建议接口
export interface Recommendation {
  issueId: string;
  title: string;
  description: string;
  actionItems: string[];
}

// 诊断报告接口
export interface DiagnosisReport {
  personalityType: Result;
  madnessScore: number;
  survivalRating: SurvivalRating;
  dimensionScores: DimensionScores;
  tagDistribution: Record<TagType, { count: number; percentage: number }>;
  issues: PsychologicalIssue[];
  recommendations: Recommendation[];
  shareText: string;
}


// Tag 分布接口
export interface TagDistribution {
  [key: string]: {
    count: number;
    percentage: number;
  };
}

// 维度配置接口
export interface DimensionConfig {
  id: keyof DimensionScores;
  name: string;
  description: string;
  warningThreshold: number;
  criticalThreshold: number;
}

// 维度配置常量
export const DIMENSIONS: DimensionConfig[] = [
  { 
    id: 'riskAppetite', 
    name: '风险偏好', 
    description: '你对高风险投资的渴望程度', 
    warningThreshold: 60, 
    criticalThreshold: 80 
  },
  { 
    id: 'emotionalControl', 
    name: '情绪控制', 
    description: '你在市场波动时的情绪稳定性', 
    warningThreshold: 40, 
    criticalThreshold: 20 
  },
  { 
    id: 'cognitiveBias', 
    name: '认知偏差', 
    description: '你受各种心理偏差影响的程度', 
    warningThreshold: 60, 
    criticalThreshold: 80 
  },
  { 
    id: 'socialDependency', 
    name: '社交依赖', 
    description: '你依赖他人意见做决策的程度', 
    warningThreshold: 60, 
    criticalThreshold: 80 
  },
  { 
    id: 'greedIndex', 
    name: '贪婪指数', 
    description: '你对暴富的渴望程度', 
    warningThreshold: 70, 
    criticalThreshold: 85 
  },
];

// 疯狂指数警告阈值
export const MADNESS_WARNING_THRESHOLD = 70;

// 默认维度得分
export const DEFAULT_DIMENSION_SCORES: DimensionScores = {
  riskAppetite: 50,
  emotionalControl: 50,
  cognitiveBias: 50,
  socialDependency: 50,
  greedIndex: 50,
};

// Tag 类型与维度映射
export const TAG_DIMENSION_MAPPING: Record<TagType, Partial<DimensionScores>> = {
  degen: { riskAppetite: 15, emotionalControl: -10, greedIndex: 12 },
  rekt: { riskAppetite: -5, emotionalControl: -15, cognitiveBias: 10 },
  holder: { riskAppetite: -5, emotionalControl: 10, greedIndex: -5 },
  slave: { socialDependency: 8, emotionalControl: -8, greedIndex: 5 },
  shark: { riskAppetite: 10, emotionalControl: 15, cognitiveBias: -5 },
  normie: { riskAppetite: -10, socialDependency: 12, cognitiveBias: 5 },
  midcurve: { cognitiveBias: 15, emotionalControl: -5, socialDependency: -5 },
  simp: { socialDependency: 18, emotionalControl: -8, cognitiveBias: 10 },
  maxi: { riskAppetite: 12, cognitiveBias: 15, socialDependency: -10 },
  larper: { socialDependency: 10, cognitiveBias: 8, greedIndex: 8 },
  dev: { riskAppetite: 8, emotionalControl: 5, cognitiveBias: -8 },
  npc: { socialDependency: 15, emotionalControl: -5, cognitiveBias: 12 },
};
