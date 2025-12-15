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
 * @param selectedIds - Array of selected option IDs
 * @returns Madness score in range 0-100
 */
export function calculateMadnessScoreFromSelections(selectedIds: string[]): number {
  // 基础分数 30 分（中等偏低）
  let madnessScore = 30;
  
  // 遍历所有选项，累加 madnessImpact
  selectedIds.forEach((id) => {
    const opt = getOptionById(id);
    if (opt) {
      // 如果选项有 madnessImpact，直接使用
      const impact = (opt as any).madnessImpact;
      if (typeof impact === 'number') {
        madnessScore += impact * 0.8; // 缩放系数，避免爆表
      } else {
        // 没有 madnessImpact 的选项，根据 tag 给默认值
        const tagImpacts: Record<string, number> = {
          degen: 4, rekt: 3, holder: 1, slave: 2, shark: -1,
          normie: 1, midcurve: 2, simp: 3, maxi: 3, larper: 2, dev: 1, npc: 2,
        };
        madnessScore += tagImpacts[opt.tag] || 2;
      }
    }
  });

  // 应用非线性变换，让分数分布更合理
  // 20个选项，每个平均+2.5分 = 50分，加上基础30分 = 80分左右是极端情况
  const normalized = Math.min(madnessScore / 100, 1);
  const transformed = Math.pow(normalized, 0.9) * 100;

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
