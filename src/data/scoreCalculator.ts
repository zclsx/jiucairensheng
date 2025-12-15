import { TagType, QUESTIONS, RESULTS, Result } from './gameData';
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
 * Calculate Madness Score based on dimension scores
 * The madness score is a weighted combination of dimension scores
 * 
 * @param dimensionScores - The calculated dimension scores
 * @returns Madness score in range 0-100
 */
export function calculateMadnessScore(dimensionScores: DimensionScores): number {
  // Weights for each dimension contributing to madness
  // Higher risk appetite, cognitive bias, social dependency, and greed increase madness
  // Higher emotional control decreases madness
  const weights = {
    riskAppetite: 0.25,
    emotionalControl: -0.20, // Negative weight - higher control = lower madness
    cognitiveBias: 0.20,
    socialDependency: 0.15,
    greedIndex: 0.20,
  };

  // Calculate weighted sum
  let madnessScore = 0;
  (Object.keys(weights) as (keyof typeof weights)[]).forEach((dimension) => {
    const weight = weights[dimension];
    const score = dimensionScores[dimension];
    
    if (weight < 0) {
      // For emotional control, invert the contribution
      // High emotional control (100) should reduce madness
      madnessScore += Math.abs(weight) * (100 - score);
    } else {
      madnessScore += weight * score;
    }
  });

  // Clamp to 0-100 range
  return Math.max(0, Math.min(100, Math.round(madnessScore)));
}

/**
 * Calculate Survival Rating based on madness score
 * Maps madness score to one of five survival ratings
 * 
 * @param madnessScore - The calculated madness score (0-100)
 * @returns SurvivalRating string
 */
export function calculateSurvivalRating(madnessScore: number): SurvivalRating {
  if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.LEEK) {
    return '韭菜';
  } else if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.OLD_LEEK) {
    return '老韭菜';
  } else if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.LEEK_KING) {
    return '韭菜王';
  } else if (madnessScore >= SURVIVAL_RATING_THRESHOLDS.SICKLE_TRAINEE) {
    return '镰刀预备役';
  } else {
    return '终极镰刀';
  }
}
