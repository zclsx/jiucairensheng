import { TagType, QUESTIONS, RESULTS, Result, getOptionById } from './gameData';
import {
  DimensionScores,
  SurvivalRating,
  TAG_DIMENSION_MAPPING,
  DEFAULT_DIMENSION_SCORES,
  SURVIVAL_RATING_THRESHOLDS,
} from './psychologyData';

// Build option lookup map for efficient access
const optionLookup = new Map<string, { tag: TagType }>();
QUESTIONS.forEach((q) => {
  q.options.forEach((opt) => {
    optionLookup.set(opt.id, { tag: opt.tag });
  });
});

/**
 * Calculate Tag scores from selected option IDs
 * This maintains compatibility with the existing calculateResult function
 * 
 * @param selectedIds - Array of selected option IDs
 * @returns Record of TagType to score count
 */
export function calculateTagScores(selectedIds: string[]): Record<TagType, number> {
  const scores: Record<TagType, number> = {
    degen: 0,
    rekt: 0,
    holder: 0,
    slave: 0,
    shark: 0,
    normie: 0,
    midcurve: 0,
    simp: 0,
    maxi: 0,
    larper: 0,
    dev: 0,
    npc: 0,
  };

  selectedIds.forEach((id) => {
    const opt = optionLookup.get(id);
    if (opt) {
      scores[opt.tag] += 1;
    }
  });

  return scores;
}

/**
 * Calculate dimension scores based on selected options
 * Uses TAG_DIMENSION_MAPPING to compute psychological dimension scores
 * 
 * @param selectedIds - Array of selected option IDs
 * @returns DimensionScores with all four core dimensions (0-100 range)
 */
export function calculateDimensionScores(selectedIds: string[]): DimensionScores {
  // Start with default scores (50 for each dimension)
  const scores: DimensionScores = { ...DEFAULT_DIMENSION_SCORES };

  // Apply dimension impacts from each selected option
  selectedIds.forEach((id) => {
    const opt = optionLookup.get(id);
    if (opt) {
      const dimensionImpact = TAG_DIMENSION_MAPPING[opt.tag];
      if (dimensionImpact) {
        // Apply each dimension impact
        (Object.keys(dimensionImpact) as (keyof DimensionScores)[]).forEach((dimension) => {
          const impact = dimensionImpact[dimension];
          if (impact !== undefined) {
            scores[dimension] += impact;
          }
        });
      }
    }
  });

  // Clamp all scores to 0-100 range
  (Object.keys(scores) as (keyof DimensionScores)[]).forEach((dimension) => {
    scores[dimension] = Math.max(0, Math.min(100, scores[dimension]));
  });

  return scores;
}

/**
 * Calculate Madness Score based on selected options' madnessImpact
 * 直接基于选项的疯狂影响值计算，更准确反映用户选择
 * 
 * 设计目标：
 * - 20个选项，分数范围 0-100
 * - 大部分用户应该在 30-70 分之间
 * - 只有极端选择才能达到 80+ 或 20-
 * 
 * @param selectedIds - Array of selected option IDs
 * @returns Madness score in range 0-100
 */
export function calculateMadnessScoreFromSelections(selectedIds: string[]): number {
  // 基础分数 15 分（较低起点）
  let rawScore = 15;
  
  // 遍历所有选项，累加影响值
  selectedIds.forEach((id) => {
    const opt = getOptionById(id);
    if (opt) {
      // 如果选项有 madnessImpact，使用缩放后的值
      const impact = (opt as any).madnessImpact;
      if (typeof impact === 'number') {
        // 原始 madnessImpact 范围大约 -5 到 +15
        // 缩放到 -1 到 +3 的范围
        rawScore += impact * 0.2;
      } else {
        // 没有 madnessImpact 的选项，根据 tag 给小的默认值
        const tagImpacts: Record<string, number> = {
          degen: 2.5,   // 赌狗 - 高疯狂
          rekt: 2,      // 冤种 - 中高疯狂
          holder: 0.5,  // 死拿 - 低疯狂
          slave: 1.5,   // 撸毛 - 中疯狂
          shark: -0.5,  // 镰刀 - 负疯狂（理性）
          normie: 1,    // 萌新 - 低疯狂
          midcurve: 1.5,// 中智商 - 中疯狂
          simp: 2,      // 舔狗 - 中高疯狂
          maxi: 2,      // 极端主义 - 中高疯狂
          larper: 1.5,  // 装逼犯 - 中疯狂
          dev: 0,       // 开发者 - 中性
          npc: 1,       // 气氛组 - 低疯狂
        };
        rawScore += tagImpacts[opt.tag] ?? 1;
      }
    }
  });

  // 20个选项，平均每个+1.5分 = 30分，加上基础15分 = 45分是平均情况
  // 极端 degen 选择：20 * 2.5 + 15 = 65分
  // 极端 shark 选择：20 * (-0.5) + 15 = 5分
  
  // 应用 S 曲线变换，让中间分数更集中，极端分数更难达到
  // 目标：rawScore 45 -> 输出 50 左右
  const normalized = rawScore / 80; // 假设最大原始分约80
  
  // S曲线变换：让分数更集中在中间
  const sigmoid = 1 / (1 + Math.exp(-6 * (normalized - 0.5)));
  const transformed = sigmoid * 100;

  return Math.max(0, Math.min(100, Math.round(transformed)));
}

/**
 * Calculate Madness Score based on dimension scores (保留兼容)
 * 
 * @param dimensionScores - The calculated dimension scores
 * @returns Madness score in range 0-100
 */
export function calculateMadnessScore(dimensionScores: DimensionScores): number {
  const weights = {
    riskAppetite: 0.22,
    emotionalControl: -0.18,
    cognitiveBias: 0.18,
    socialDependency: 0.12,
    greedIndex: 0.18,
  };

  let rawScore = 0;
  (Object.keys(weights) as (keyof typeof weights)[]).forEach((dimension) => {
    const weight = weights[dimension];
    const score = dimensionScores[dimension];
    
    if (weight < 0) {
      rawScore += Math.abs(weight) * (100 - score);
    } else {
      rawScore += weight * score;
    }
  });

  const normalized = rawScore / 100;
  const transformed = Math.pow(normalized, 0.9) * 100;

  return Math.max(0, Math.min(100, Math.round(transformed)));
}

/**
 * Calculate Survival Rating based on madness score
 * Maps madness score to one of five survival ratings
 * 调整后的阈值让分布更合理
 * 
 * @param madnessScore - The calculated madness score (0-100)
 * @returns SurvivalRating string
 */
export function calculateSurvivalRating(madnessScore: number): SurvivalRating {
  if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.LEEK) {
    return '韭菜';           // >= 75: 最惨，纯韭菜
  } else if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.OLD_LEEK) {
    return '老韭菜';         // 55-74: 被割过很多次了
  } else if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.LEEK_KING) {
    return '韭菜王';         // 40-54: 韭菜中的战斗机
  } else if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.SICKLE_TRAINEE) {
    return '镰刀预备役';     // 25-39: 开始学会割人了
  } else {
    return '终极镰刀';       // < 25: 真正的镰刀
  }
}
