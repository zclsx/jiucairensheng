import { TagType, Result, RESULTS, calculateResult } from './gameData';
import {
  DimensionScores,
  SurvivalRating,
  PsychologicalIssue,
  Recommendation,
  DiagnosisReport,
  IssueSeverity,
  DIMENSIONS,
} from './psychologyData';
import {
  calculateTagScores,
  calculateDimensionScores,
  calculateMadnessScore,
  calculateSurvivalRating,
} from './scoreCalculator';

// --- 心理问题定义库 (Savage Edition) ---
const PSYCHOLOGICAL_ISSUES_LIBRARY: Omit<PsychologicalIssue, 'severity'>[] = [
  {
    id: 'overconfidence',
    name: '普信巨鲸幻觉 (Whale Delusion)',
    description: '你总觉得自己是巴菲特转世，其实只是流动性提供商。市场不需要你的信仰，只需要你的本金。',
    relatedDimensions: ['riskAppetite', 'cognitiveBias'],
  },
  {
    id: 'loss_aversion',
    name: '钻石手强迫症 (Bagholder Syndrome)',
    description: '亏损让你智商归零。你把"死扛"叫"信仰"，把"割肉"当"背叛"。承认吧，你只是不敢面对那红色的 -99%。',
    relatedDimensions: ['emotionalControl', 'riskAppetite'],
  },
  {
    id: 'herd_mentality',
    name: '无脑跟单虫 (NPC Protocol)',
    description: '你没有脑子，只有跟风。看到群里刷屏你就冲，看到推特喊单你就买。你是去中心化世界里最中心化的韭菜。',
    relatedDimensions: ['socialDependency', 'cognitiveBias'],
  },
  {
    id: 'fomo',
    name: '高位接盘圣体 (Top Buyer Saint)',
    description: '看到绿柱子你的手就不听使唤。如果不买在山顶，你浑身难受。你就是那个为项目方出货买单的天选之子。',
    relatedDimensions: ['greedIndex', 'emotionalControl'],
  },
  {
    id: 'gambling_addiction',
    name: '多巴胺乞丐 (Dopamine Beggar)',
    description: '你根本不在乎钱，你只想要那种心跳加速的快感。你是来链上找刺激的，K 线就是你的电子咖啡因。',
    relatedDimensions: ['riskAppetite', 'greedIndex'],
  },
  {
    id: 'confirmation_bias',
    name: '利好筛选器 (Hopium Filter)',
    description: '你自动过滤所有 FUD，只看那些让你爽的喊单推文。你在给自己喂 Copium，直到归零那一刻。',
    relatedDimensions: ['cognitiveBias', 'socialDependency'],
  },
  {
    id: 'emotional_trading',
    name: '躁郁症操盘手 (Bipolar Trader)',
    description: '你的交易策略完全取决于今天的心情。涨了就狂躁觉得自己是神，跌了就抑郁想去送外卖。',
    relatedDimensions: ['emotionalControl', 'riskAppetite'],
  },
  {
    id: 'sunk_cost_fallacy',
    name: '沉没成本死囚 (Sunk Cost Prisoner)',
    description: '"都亏这么多了，现在卖就是傻X"。不，兄弟，现在不卖，过两天归零了才是真傻X。',
    relatedDimensions: ['cognitiveBias', 'emotionalControl'],
  },
  {
    id: 'kol_dependency',
    name: '巨婴综合症 (Giant Baby Syndrome)',
    description: '没有 KOL 喂饭你就不知道怎么张嘴。你的钱包私钥应该交给带单老师保管，反正迟早也是送给他们。',
    relatedDimensions: ['socialDependency', 'cognitiveBias'],
  },
  {
    id: 'greed_blindness',
    name: '暴富妄想狂 (Lambo Dreamer)',
    description: '赚了 5 倍不走，非要等 100 倍。你的目标是游艇嫩模，现实是泡面火腿。贪婪是你通往贫穷的高速列车。',
    relatedDimensions: ['greedIndex', 'riskAppetite'],
  },
];

// --- 建议库 (Roast & Action) ---
const RECOMMENDATIONS_LIBRARY: Record<string, Omit<Recommendation, 'issueId'>[]> = {
  overconfidence: [
    {
      title: '去照照镜子 (Touch Grass)',
      description: '你不是索罗斯，你只是个散户。市场每一次暴跌都是在抽你的脸。',
      actionItems: ['每笔交易止损设在 5%，别觉得自己能扛单', '把"我是韭菜"写在便签上贴屏幕边'],
    },
    {
      title: '记录你的弱智操作',
      description: '别只吹牛逼，把你亏钱的单子都打印出来挂墙上。',
      actionItems: ['每周复盘一次亏损单，并大声朗读', '计算如果不瞎操作现在的资产是多少'],
    },
  ],
  loss_aversion: [
    {
      title: '学会割肉 (Cut Your Bags)',
      description: '留得青山在，不怕没柴烧。归零了连灰都不剩。',
      actionItems: ['亏损超过 20% 无脑砍仓，别废话', '删掉那个已经归零的币的自选'],
    },
    {
      title: '别想回本了 (Forget Breakeven)',
      description: '想回本是亏完的第一步。忘记你的成本价，现在的钱才是钱。',
      actionItems: ['清仓休息 3 天，去公园走走', '不要在亏钱的币上补仓 (加倍送死)'],
    },
  ],
  herd_mentality: [
    {
      title: '长点脑子 (Use Your Brain)',
      description: '如果你买入的理由是"群里都在买"，那你就是流动性。',
      actionItems: ['买入前写下 3 个非情绪化的理由', '如果理由是"XXX喊单"，直接扇自己一巴掌'],
    },
    {
      title: '屏蔽噪音 (Mute The Noise)',
      description: '推特上的 Alpha 只有两种：骗你的和割你的。',
      actionItems: ['取关所有喊单型 KOL', '退订那些只会发火箭表情的电报群'],
    },
  ],
  fomo: [
    {
      title: '剁手疗法 (Chop Hands)',
      description: '看到大阳线就想追？建议把手绑起来。市场永远不缺机会，缺的是本金。',
      actionItems: ['涨幅榜前 10 的币绝对不买', '规定每天只看盘 30 分钟'],
    },
    {
      title: '做个狙击手',
      description: '像个猎人一样等待，而不是像个无头苍蝇一样乱撞。',
      actionItems: ['提前挂单在支撑位，成交就成，不成交拉倒', '追高一次罚款自己 100U 捐给慈善'],
    },
  ],
  gambling_addiction: [
    {
      title: '把钱交给妈妈管',
      description: '你控制不住自己的，承认吧，你就是个冲动型选手。',
      actionItems: ['只留 10% 的资金在热钱包', '设定充值冷静期，想充钱先洗个冷水澡'],
    },
    {
      title: '物理戒断',
      description: '卸载交易所 APP，这对你的钱包和头发都好。',
      actionItems: ['删除手机上的行情软件', '找份正经工作分散注意力'],
    },
    {
      title: '找个朋友聊聊',
      description: '这不是玩笑。如果你动用了生活费，赶紧找人倾诉。',
      actionItems: ['承认自己需要帮助', '停止所有合约交易'],
    },
  ],
  confirmation_bias: [
    {
      title: '去读读空头报告',
      description: '别整天意淫 WAGMI 了，看看别人为什么说这项目是垃圾。',
      actionItems: ['买入前强迫自己找 5 个不买的理由', '关注几个专门唱反调的分析师'],
    },
    {
      title: '假设项目方明天跑路',
      description: '如果是真的，你现在会怎么做？Web3 里这通常是真的。',
      actionItems: ['检查合约是否有后门', '查查团队是不是匿名的骗子'],
    },
  ],
  emotional_trading: [
    {
      title: '找个班上吧 (Get A Job)',
      description: '你的情绪波动比土狗币还大。全职炒币不适合你，去麦当劳炸薯条更稳定。',
      actionItems: ['情绪激动时禁止打开交易所', '制定机械化交易规则，像机器人一样执行'],
    },
    {
      title: '不要盯盘',
      description: '盯盘不会让币涨，只会让你血压涨。',
      actionItems: ['下单后设置好止盈止损就关机', '用警报代替肉眼盯盘'],
    },
  ],
  sunk_cost_fallacy: [
    {
      title: '承认自己是傻X',
      description: '买错了就认。死扛不是坚持，是愚蠢。',
      actionItems: ['无论亏多少，看着现在的图表决定去留', '把"回本"两个字从字典里删掉'],
    },
    {
      title: '定期大扫除',
      description: '垃圾币就像家里的垃圾，留着只会发臭。',
      actionItems: ['每月清理一次持仓，卖掉垃圾', '把归零的币转到销毁地址眼不见为净'],
    },
  ],
  kol_dependency: [
    {
      title: 'DYOR or NGMI',
      description: 'Do Your Own Research，否则你永远是 Exit Liquidity。',
      actionItems: ['看不懂白皮书就不买', '学会看链上数据而不是推特截图'],
    },
    {
      title: '大 V 也是人',
      description: '他们喊单是因为他们买了老鼠仓，不是因为他们爱你可以带你发财。',
      actionItems: ['复盘 KOL 过去的喊单胜率', '不要为任何人的认知买单'],
    },
  ],
  greed_blindness: [
    {
      title: '卖一半改善生活',
      description: '纸面富贵全是假的，换成法币买排骨才是真的。',
      actionItems: ['翻倍出本，永远的真理', '给自己定个规矩：赚了钱必须提现 20% 消费'],
    },
    {
      title: '没人能卖在最高点',
      description: '别想吃到最后一口鱼尾，那是留给刺得满嘴血的人的。',
      actionItems: ['分批止盈，别想着梭哈逃顶', '知足常乐，在这个圈子活下来就是胜利'],
    },
  ],
};

/**
 * 根据维度得分计算问题严重程度
 */
function calculateSeverity(score: number, dimension: keyof DimensionScores): IssueSeverity {
  const config = DIMENSIONS.find(d => d.id === dimension);
  if (!config) return 'mild';

  // 对于 emotionalControl，低分表示问题严重
  if (dimension === 'emotionalControl') {
    if (score <= config.criticalThreshold) return 'severe';
    if (score <= config.warningThreshold) return 'moderate';
    return 'mild';
  }

  // 对于其他维度，高分表示问题严重
  if (score >= config.criticalThreshold) return 'severe';
  if (score >= config.warningThreshold) return 'moderate';
  return 'mild';
}

/**
 * 计算问题的综合得分（用于排序）
 */
function calculateIssueScore(issue: Omit<PsychologicalIssue, 'severity'>, dimensionScores: DimensionScores): number {
  let totalScore = 0;
  issue.relatedDimensions.forEach(dimension => {
    const score = dimensionScores[dimension];
    // emotionalControl 需要反转（低分 = 高问题分）
    if (dimension === 'emotionalControl') {
      totalScore += (100 - score);
    } else {
      totalScore += score;
    }
  });
  return totalScore / issue.relatedDimensions.length;
}

/**
 * 识别核心心理问题
 */
export function identifyPsychologicalIssues(dimensionScores: DimensionScores): PsychologicalIssue[] {
  const scoredIssues = PSYCHOLOGICAL_ISSUES_LIBRARY.map(issue => ({
    issue,
    score: calculateIssueScore(issue, dimensionScores),
  }));

  scoredIssues.sort((a, b) => b.score - a.score);
  const topIssues = scoredIssues.slice(0, 3);

  return topIssues.map(({ issue, score }) => {
    let severity: IssueSeverity;
    if (score >= 75) {
      severity = 'severe';
    } else if (score >= 55) {
      severity = 'moderate';
    } else {
      severity = 'mild';
    }
    return {
      ...issue,
      severity,
    };
  });
}


/**
 * 为心理问题生成改善建议
 */
export function generateRecommendations(issues: PsychologicalIssue[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  issues.forEach(issue => {
    const issueRecommendations = RECOMMENDATIONS_LIBRARY[issue.id];
    if (issueRecommendations) {
      let count: number;
      if (issue.severity === 'severe') {
        count = Math.min(3, issueRecommendations.length);
      } else if (issue.severity === 'moderate') {
        count = Math.min(Math.max(2, Math.ceil(issueRecommendations.length * 0.7)), 3);
      } else {
        count = Math.min(2, issueRecommendations.length);
      }

      const selectedRecommendations = issueRecommendations.slice(0, count);
      selectedRecommendations.forEach(rec => {
        recommendations.push({
          ...rec,
          issueId: issue.id,
        });
      });
    }
  });

  return recommendations;
}

/**
 * 计算 Tag 分布
 */
export function calculateTagDistribution(
  tagScores: Record<TagType, number>
): Record<TagType, { count: number; percentage: number }> {
  const totalCount = Object.values(tagScores).reduce((sum, count) => sum + count, 0);
  const distribution: Record<TagType, { count: number; percentage: number }> = {} as Record<
    TagType,
    { count: number; percentage: number }
  >;

  if (totalCount === 0) {
    (Object.keys(tagScores) as TagType[]).forEach(tag => {
      distribution[tag] = { count: 0, percentage: 0 };
    });
    return distribution;
  }

  const rawPercentages: Record<TagType, number> = {} as Record<TagType, number>;
  let totalPercentage = 0;

  (Object.keys(tagScores) as TagType[]).forEach(tag => {
    const percentage = (tagScores[tag] / totalCount) * 100;
    rawPercentages[tag] = percentage;
    totalPercentage += Math.floor(percentage);
  });

  const remainder = 100 - totalPercentage;
  const sortedTags = (Object.keys(tagScores) as TagType[]).sort(
    (a, b) => (rawPercentages[b] % 1) - (rawPercentages[a] % 1)
  );

  sortedTags.forEach((tag, index) => {
    const basePercentage = Math.floor(rawPercentages[tag]);
    const extraPoint = index < remainder ? 1 : 0;
    distribution[tag] = {
      count: tagScores[tag],
      percentage: basePercentage + extraPoint,
    };
  });

  return distribution;
}

/**
 * 生成分享文案 (Savage Edition)
 */
export function generateShareText(
  personalityType: Result,
  madnessScore: number,
  survivalRating: SurvivalRating
): string {
  const emoji = personalityType.img;
  const title = personalityType.title;

  // 疯狂描述 - 更有画面感
  let madnessDesc: string;
  if (madnessScore >= 90) {
    madnessDesc = '建议直接送精神病院';
  } else if (madnessScore >= 75) {
    madnessDesc = '为了回本已经疯了';
  } else if (madnessScore >= 60) {
    madnessDesc = '正在通往归零的路上';
  } else if (madnessScore >= 40) {
    madnessDesc = '偶尔上头，偶尔清醒';
  } else if (madnessScore >= 20) {
    madnessDesc = '还算是个正常人';
  } else {
    madnessDesc = '冷血机器人';
  }

  // 生存评级描述
  const survivalEmoji: Record<SurvivalRating, string> = {
    '韭菜': '💀 肥料',
    '老韭菜': '🦐 待宰虾米',
    '韭菜王': '🐟 普通游资',
    '镰刀预备役': '🦈 顶级猎手',
    '终极镰刀': '👑 链上之王',
  };

  const survivalDesc = survivalEmoji[survivalRating] || '💀 肥料';

  return `🤡【Web3 韭菜人格确诊通知书】

我是：${emoji} ${title}

🧠 脑残指数: ${madnessScore}/100 (${madnessDesc})
⚰️ 存活概率: ${survivalDesc}

💬 诊断评价："${personalityType.roast.substring(0, 60)}..."

💊 医生建议：别看了，去送外卖吧，只有那个能回本。

👇 快来测测你还有救吗？
[Link] #Web3Psychology #NGMI`;
}

/**
 * 生成完整诊断报告
 */
export function generateDiagnosisReport(selectedIds: string[]): DiagnosisReport {
  const tagScores = calculateTagScores(selectedIds);
  const dimensionScores = calculateDimensionScores(selectedIds);
  const madnessScore = calculateMadnessScore(dimensionScores);
  const survivalRating = calculateSurvivalRating(madnessScore);
  const personalityType = calculateResult(selectedIds);
  const tagDistribution = calculateTagDistribution(tagScores);
  const issues = identifyPsychologicalIssues(dimensionScores);
  const recommendations = generateRecommendations(issues);
  const shareText = generateShareText(personalityType, madnessScore, survivalRating);

  return {
    personalityType,
    madnessScore,
    survivalRating,
    dimensionScores,
    tagDistribution,
    issues,
    recommendations,
    shareText,
  };
}
