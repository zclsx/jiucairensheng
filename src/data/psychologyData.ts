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

// 生存评级阈值常量 (调整后让分布更合理)
export const SURVIVAL_RATING_THRESHOLDS = {
  LEEK: 75,           // 韭菜: >= 75 (最惨)
  OLD_LEEK: 55,       // 老韭菜: 55-74
  LEEK_KING: 40,      // 韭菜王: 40-54
  SICKLE_TRAINEE: 25, // 镰刀预备役: 25-39
  ULTIMATE_SICKLE: 0, // 终极镰刀: < 25 (最强)
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

// 维度配置常量 (Savage Edition)
export const DIMENSIONS: DimensionConfig[] = [
  { 
    id: 'riskAppetite', 
    name: '送钱欲望', 
    description: '你有多想把钱送给项目方', 
    warningThreshold: 60, 
    criticalThreshold: 80 
  },
  { 
    id: 'emotionalControl', 
    name: '心态稳定', 
    description: '你看到红色K线时能不能忍住不骂娘', 
    warningThreshold: 40, 
    criticalThreshold: 20 
  },
  { 
    id: 'cognitiveBias', 
    name: '脑残程度', 
    description: '你被 Copium 洗脑的严重程度', 
    warningThreshold: 60, 
    criticalThreshold: 80 
  },
  { 
    id: 'socialDependency', 
    name: '舔狗指数', 
    description: '你有多依赖 KOL 喂饭', 
    warningThreshold: 60, 
    criticalThreshold: 80 
  },
  { 
    id: 'greedIndex', 
    name: '贪婪指数', 
    description: '你离 Lambo 的妄想有多严重', 
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

// Tag 类型与维度映射 (降低影响值，20个选项不会轻易爆表)
export const TAG_DIMENSION_MAPPING: Record<TagType, Partial<DimensionScores>> = {
  degen: { riskAppetite: 4, emotionalControl: -3, greedIndex: 3 },
  rekt: { riskAppetite: -2, emotionalControl: -4, cognitiveBias: 3 },
  holder: { riskAppetite: -2, emotionalControl: 3, greedIndex: -2 },
  slave: { socialDependency: 2, emotionalControl: -2, greedIndex: 2 },
  shark: { riskAppetite: 3, emotionalControl: 4, cognitiveBias: -2 },
  normie: { riskAppetite: -3, socialDependency: 3, cognitiveBias: 2 },
  midcurve: { cognitiveBias: 4, emotionalControl: -2, socialDependency: -2 },
  simp: { socialDependency: 5, emotionalControl: -2, cognitiveBias: 3 },
  maxi: { riskAppetite: 3, cognitiveBias: 4, socialDependency: -3 },
  larper: { socialDependency: 3, cognitiveBias: 2, greedIndex: 2 },
  dev: { riskAppetite: 2, emotionalControl: 2, cognitiveBias: -2 },
  npc: { socialDependency: 4, emotionalControl: -2, cognitiveBias: 3 },
};
