export type StageId = 
  | 'level1' | 'level2' | 'level3' | 'level4' | 'level5'
  | 'level6' | 'level7' | 'level8' | 'level9' | 'level10';

export type TagType =
  | 'degen' // 赌狗
  | 'rekt' // 冤种
  | 'holder' // 死拿
  | 'slave' // 撸毛/黑奴
  | 'shark' // 镰刀/科学家
  | 'normie' // 萌新
  | 'midcurve' // 中智商
  | 'simp' // 舔狗
  | 'maxi' // 极端主义
  | 'larper' // 装逼犯
  | 'dev' // 开发者/阴谋家
  | 'npc'; // 气氛组

export interface Option {
  id: string;
  text: string;
  tag: TagType;
}

// 心理维度影响接口
export interface DimensionImpact {
  riskAppetite?: number;      // 风险偏好 (-20 to +20)
  emotionalControl?: number;  // 情绪控制 (-20 to +20)
  cognitiveBias?: number;     // 认知偏差 (-20 to +20)
  socialDependency?: number;  // 社交依赖 (-20 to +20)
  greedIndex?: number;        // 贪婪指数 (-20 to +20)
}

// 扩展选项接口（向后兼容）
export interface EnhancedOption extends Option {
  dimensions?: DimensionImpact;  // 心理维度影响（可选，保持向后兼容）
  madnessImpact?: number;        // 疯狂指数影响 (-10 to +15)（可选，保持向后兼容）
}

export interface Question {
  id: StageId;
  title: string;
  subtitle: string;
  options: EnhancedOption[];
}

export interface Result {
  id: string;
  title: string;
  roast: string;
  img: string;
  color: string;
}

// 导入 10 层关卡数据
import { QUESTIONS_10_LEVELS } from './questionsData';

// 导出 10 层关卡作为主要 QUESTIONS
export const QUESTIONS: Question[] = QUESTIONS_10_LEVELS;

// --- 原始 200+ 选项库 (保留用于兼容性) ---
export const QUESTIONS_LEGACY: Question[] = [
  {
    id: 'level1' as StageId,
    title: 'LEVEL 1: 你的成分 (多选)',
    subtitle: '你是谁？你在哪？你在干什么？(至少选 3 个)',
    options: [
      // Degen (Solana/Meme)
      { id: 'i1', text: 'Pump.fun 榜一大哥', tag: 'degen' },
      { id: 'i2', text: '开盘 3 秒冲入的勇士', tag: 'degen' },
      { id: 'i3', text: '125x 高倍合约战神', tag: 'degen' },
      { id: 'i4', text: '只冲市值 < 50k 的盘子', tag: 'degen' },
      { id: 'i5', text: '土狗群喊单王', tag: 'degen' },
      { id: 'i6', text: 'Meme 币钻石手 (拿到归零)', tag: 'degen' },
      { id: 'i7', text: '看头像炒币 (Milady/Pudgy)', tag: 'degen' },
      { id: 'i8', text: 'Copy Trader (跟单狗)', tag: 'degen' },
      { id: 'i9', text: '链上 PVP 胜率 5%', tag: 'degen' },
      { id: 'i10', text: '半夜 4 点还在看 DexScreener', tag: 'degen' },

      // Slave (Airdrop/Task)
      { id: 'i11', text: '指纹浏览器拥有者 (500窗口)', tag: 'slave' },
      { id: 'i12', text: '推特抽奖机器人', tag: 'slave' },
      { id: 'i13', text: 'Discord 等级 100 级肝帝', tag: 'slave' },
      { id: 'i14', text: '银河任务 (Galxe) 做题家', tag: 'slave' },
      { id: 'i15', text: '测试网节点维护工', tag: 'slave' },
      { id: 'i16', text: '领水龙头专业户', tag: 'slave' },
      { id: 'i17', text: 'TON 小游戏点击器 (手指点断)', tag: 'slave' },
      { id: 'i18', text: 'LayerZero 交互了 1000 次', tag: 'slave' },
      { id: 'i19', text: 'Berachain 领水困难户', tag: 'slave' },
      { id: 'i20', text: 'Farcaster 互关互赞乞丐', tag: 'slave' },

      // Rekt (Victim)
      { id: 'i21', text: '被盗金额 > 10 ETH', tag: 'rekt' },
      { id: 'i22', text: '维权群群主', tag: 'rekt' },
      { id: 'i23', text: '貔貅盘收藏家', tag: 'rekt' },
      { id: 'i24', text: 'CEX 提币去赌博输光', tag: 'rekt' },
      { id: 'i25', text: '跨链桥丢币者', tag: 'rekt' },
      { id: 'i26', text: '买到了假的合约地址', tag: 'rekt' },
      { id: 'i27', text: '被谷歌假广告钓鱼', tag: 'rekt' },
      { id: 'i28', text: '钱包授权给了不知名网站', tag: 'rekt' },

      // Simp/NPC (Community)
      { id: 'i29', text: 'KOL 的提款机', tag: 'simp' },
      { id: 'i30', text: '某个大 V 的死忠粉', tag: 'simp' },
      { id: 'i31', text: '付费群群友 (被割版)', tag: 'simp' },
      { id: 'i32', text: '只会转发抽奖', tag: 'npc' },
      { id: 'i33', text: '看见利好才追高', tag: 'npc' },
      { id: 'i34', text: '永远在问“能买吗”', tag: 'npc' },
      { id: 'i35', text: '相信“社区接管” (CTO)', tag: 'simp' },

      // Shark/Dev (Predator)
      { id: 'i36', text: 'U 商 (高价收U)', tag: 'shark' },
      { id: 'i37', text: '夹子机器人 (MEV)', tag: 'shark' },
      { id: 'i38', text: '内幕老鼠仓', tag: 'shark' },
      { id: 'i39', text: '发过 Rug 盘的 Dev', tag: 'dev' },
      { id: 'i40', text: '带单老师 (胜率 100%)', tag: 'shark' },
      { id: 'i41', text: 'OTC 骗子', tag: 'shark' },
      { id: 'i42', text: '黑客 (Whitehat 也是黑)', tag: 'shark' },

      // Holder/Maxi (Bitcoin/ETH)
      { id: 'i43', text: 'BTC 原教旨主义者 (只买大饼)', tag: 'maxi' },
      { id: 'i44', text: 'ETH 死忠 (L2 也没用)', tag: 'maxi' },
      { id: 'i45', text: 'Solana 屠龙勇士', tag: 'maxi' },
      { id: 'i46', text: '删除了交易所 App', tag: 'holder' },
      { id: 'i47', text: '忘记了助记词', tag: 'holder' },
      { id: 'i48', text: '定投党 (越跌越买)', tag: 'holder' },
      { id: 'i49', text: 'Ordinals 铭文守墓人', tag: 'maxi' },
      { id: 'i50', text: 'Runes 符文被套者', tag: 'holder' },

      // Midcurve/Larper (Intellectual)
      { id: 'i51', text: '画线派 (技术分析)', tag: 'midcurve' },
      { id: 'i52', text: '宏观经济学家 (自封)', tag: 'midcurve' },
      { id: 'i53', text: 'LinkedIn 上的 Web3 Founder', tag: 'larper' },
      { id: 'i54', text: '没钱硬装的大佬', tag: 'larper' },
      { id: 'i55', text: '只会发英文推特 (装老外)', tag: 'larper' },
      { id: 'i56', text: '参加 Token2049 只为蹭饭', tag: 'larper' },
      { id: 'i57', text: '自称“Builder”其实在炒币', tag: 'larper' },
      { id: 'i58', text: 'Restaking 套娃玩家 (LRT)', tag: 'midcurve' },
      { id: 'i59', text: 'DePin 矿机受害者', tag: 'midcurve' },

      // Normie (Newcomer)
      { id: 'i60', text: '只会买 ETF', tag: 'normie' },
      { id: 'i61', text: '看新闻炒币', tag: 'normie' },
      { id: 'i62', text: '只在 CEX 交易', tag: 'normie' },
      { id: 'i63', text: '不知道什么是 Gas', tag: 'normie' },
      { id: 'i64', text: '被朋友拉进群的', tag: 'normie' },
      { id: 'i65', text: '以为 USDT 是投资产品', tag: 'normie' },

      // New: L2 / Restaking / Ordinals / TON / Berachain / Farcaster / DePin
      { id: 'i66', text: 'Base Onchain Summer 盖楼民工', tag: 'slave' },
      { id: 'i67', text: 'Scroll 交互表哥 (Excel 打满)', tag: 'slave' },
      { id: 'i68', text: 'zkSync 欠条收藏家 (空投错过)', tag: 'rekt' },
      { id: 'i69', text: 'Starknet 永远 Pending 患者', tag: 'midcurve' },
      { id: 'i70', text: 'Blast Gold 信徒 (点黄钻续命)', tag: 'maxi' },
      { id: 'i71', text: 'EigenLayer 全仓 Restaking 党', tag: 'maxi' },
      { id: 'i72', text: 'LRT 拼多多玩家 (Puffer/Kelp/LiquidX 全上)', tag: 'slave' },
      { id: 'i73', text: 'L2 多链搬砖人 (十桥同开)', tag: 'slave' },
      { id: 'i74', text: 'Berachain HONEY 幻想家', tag: 'larper' },
      { id: 'i75', text: 'Berachain Validator 候补 (家里没机器)', tag: 'larper' },
      { id: 'i76', text: 'Ordinals 稀有 sats 猎人', tag: 'maxi' },
      { id: 'i77', text: 'BRC-20 999 sats 全套收藏', tag: 'degen' },
      { id: 'i78', text: 'Runes 草鞋厂打工人', tag: 'slave' },
      { id: 'i79', text: 'TON Tap-to-Earn 军团长', tag: 'slave' },
      { id: 'i80', text: 'TON 钱包空投幻觉患者', tag: 'normie' },
      { id: 'i81', text: 'Farcaster Frame 刷屏狂魔', tag: 'dev' },
      { id: 'i82', text: 'Farcaster Warp 鲸 (互刷邀请)', tag: 'simp' },
      { id: 'i83', text: 'Lens OG (还在搬砖)', tag: 'larper' },
      { id: 'i84', text: 'Friend.tech S1 接盘侠', tag: 'rekt' },
      { id: 'i85', text: 'DePin Helium 天线布道者', tag: 'midcurve' },
      { id: 'i86', text: 'Hivemapper 车载摄像头司机', tag: 'slave' },
      { id: 'i87', text: 'WeatherXM 气象站屯机党', tag: 'holder' },
      { id: 'i88', text: 'Sol DEX 量化自称科学家', tag: 'shark' },
      { id: 'i89', text: 'AI Agent 交易员 (其实回测不了)', tag: 'larper' },
      { id: 'i90', text: 'On-chain Data 线程仔', tag: 'midcurve' },
      { id: 'i91', text: '安全研究员 (只会 Revoke 截图)', tag: 'shark' },
      { id: 'i92', text: '治理投票狂魔 (Snapshot 必到)', tag: 'midcurve' },
      { id: 'i93', text: 'Discord 超管 (挂工牌打工)', tag: 'npc' },
      { id: 'i94', text: 'Oracle 报价员 (自称基建)', tag: 'dev' },
      { id: 'i95', text: 'Restaking 风险极限派 (敢上未知 AVS)', tag: 'degen' },
      { id: 'i96', text: 'Runes 铸造脚本贩子', tag: 'dev' },
      { id: 'i97', text: 'Berachain Meme Maker (Bear+Bee 创世)', tag: 'degen' },
      { id: 'i98', text: 'Ordinals 钱包多签保守派', tag: 'holder' },
      { id: 'i99', text: 'TON Notcoin 矿场主', tag: 'slave' },
      { id: 'i100', text: 'Base Meme Mogger (jeet 也敢冲)', tag: 'degen' },
      { id: 'i101', text: 'Solana Saga 二手机囤货者', tag: 'degen' },
      { id: 'i102', text: 'Restaking 研究员 (写长文骗赞)', tag: 'larper' },
      { id: 'i103', text: 'Perp Dex 福音传教士', tag: 'maxi' },
      { id: 'i104', text: 'Manta 生态空投狙击手', tag: 'slave' },
      { id: 'i105', text: 'Linea 交互补课班', tag: 'slave' },
      { id: 'i106', text: 'Zora 周周 mint 白嫖党', tag: 'slave' },
      { id: 'i107', text: 'Arbitrum DAO 喊砍通胀代表', tag: 'maxi' },
      { id: 'i108', text: 'Base degen 派 (Mog + Bret combo)', tag: 'degen' },
      { id: 'i109', text: 'Bitcoin L2 叙事批发商', tag: 'larper' },
      { id: 'i110', text: '超低市值 L1 信仰者', tag: 'maxi' },
      { id: 'i111', text: 'Celestia 点燃 TIA 的火柴人', tag: 'holder' },
      { id: 'i112', text: 'Telegram Bot 热衷者 (Banana/Unibot 回忆录)', tag: 'degen' },
      { id: 'i113', text: 'Restaking 流动性循环赛选手', tag: 'midcurve' },
      { id: 'i114', text: '脚本刷 Farcaster Follow 的机器人爸爸', tag: 'dev' },
      { id: 'i115', text: 'Memecoin 盯盘群管理员', tag: 'shark' },
    ],
  },
  {
    id: 'level2' as StageId,
    title: 'LEVEL 2: 死亡操作 (多选)',
    subtitle: '这些蠢事你干过几件？(至少选 3 个)',
    options: [
      // 交易类 - midcurve: cognitiveBias +15, emotionalControl -5, socialDependency -5
      { id: 'a1', text: '卖飞了 100 倍币', tag: 'midcurve', dimensions: { cognitiveBias: 18, emotionalControl: -8, greedIndex: 10 }, madnessImpact: 8 },
      // degen: riskAppetite +15, emotionalControl -10, greedIndex +12
      { id: 'a2', text: '全仓梭哈归零', tag: 'degen', dimensions: { riskAppetite: 20, emotionalControl: -15, greedIndex: 18 }, madnessImpact: 15 },
      { id: 'a3', text: '做空 BTC 爆仓', tag: 'degen', dimensions: { riskAppetite: 18, emotionalControl: -12, cognitiveBias: 10 }, madnessImpact: 12 },
      // normie: riskAppetite -10, socialDependency +12, cognitiveBias +5
      { id: 'a4', text: '高位接盘 NFT', tag: 'normie', dimensions: { riskAppetite: -5, socialDependency: 15, cognitiveBias: 12 }, madnessImpact: 6 },
      { id: 'a5', text: '抄底抄在半山腰', tag: 'midcurve', dimensions: { cognitiveBias: 15, emotionalControl: -5, greedIndex: 8 }, madnessImpact: 7 },
      // holder: riskAppetite -5, emotionalControl +10, greedIndex -5
      { id: 'a6', text: '不仅没跑还加仓 (死扛)', tag: 'holder', dimensions: { riskAppetite: 5, emotionalControl: 8, cognitiveBias: 10 }, madnessImpact: 5 },
      // shark: riskAppetite +10, emotionalControl +15, cognitiveBias -5
      { id: 'a7', text: '成功逃顶 (吹一年)', tag: 'shark', dimensions: { riskAppetite: 8, emotionalControl: 15, cognitiveBias: -8 }, madnessImpact: -3 },
      { id: 'a8', text: '抓住了 1000x (做梦)', tag: 'shark', dimensions: { riskAppetite: 12, emotionalControl: 10, greedIndex: 15 }, madnessImpact: 5 },
      // rekt: riskAppetite -5, emotionalControl -15, cognitiveBias +10
      { id: 'a9', text: 'Mint 完图就破发', tag: 'rekt', dimensions: { riskAppetite: 5, emotionalControl: -12, cognitiveBias: 8 }, madnessImpact: 8 },
      { id: 'a10', text: '买了同名假币 (NEIRO vs NEIRO)', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -10, socialDependency: 5 }, madnessImpact: 10 },

      // 操作失误类
      { id: 'a11', text: '点了钓鱼链接', tag: 'rekt', dimensions: { cognitiveBias: 12, emotionalControl: -10, riskAppetite: -5 }, madnessImpact: 8 },
      { id: 'a12', text: '把私钥发给了“客服”', tag: 'normie', dimensions: { cognitiveBias: 18, socialDependency: 15, emotionalControl: -8 }, madnessImpact: 12 },
      { id: 'a13', text: '转账填错链/地址', tag: 'normie', dimensions: { cognitiveBias: 10, emotionalControl: -5, riskAppetite: -8 }, madnessImpact: 6 },
      { id: 'a14', text: 'Gas 费花了 5 ETH 啥也没捞着', tag: 'slave', dimensions: { greedIndex: 10, emotionalControl: -10, cognitiveBias: 8 }, madnessImpact: 9 },
      { id: 'a15', text: '签名了 Drainer 恶意交易', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -12, riskAppetite: -5 }, madnessImpact: 10 },
      { id: 'a16', text: '跨链桥卡了 7 天', tag: 'slave', dimensions: { emotionalControl: -8, socialDependency: 5, cognitiveBias: 5 }, madnessImpact: 5 },
      { id: 'a17', text: '忘记取消授权 (Revoke)', tag: 'rekt', dimensions: { cognitiveBias: 12, emotionalControl: -8, riskAppetite: -3 }, madnessImpact: 7 },

      // 社交/情绪类
      { id: 'a18', text: '听大 V 喊单接盘', tag: 'simp', dimensions: { socialDependency: 20, emotionalControl: -10, cognitiveBias: 12 }, madnessImpact: 10 },
      { id: 'a19', text: '参与 CTO (社区接管) 被埋', tag: 'simp', dimensions: { socialDependency: 15, cognitiveBias: 12, greedIndex: 8 }, madnessImpact: 9 },
      { id: 'a20', text: '群里发红包比赚的还多', tag: 'larper', dimensions: { socialDependency: 15, greedIndex: -5, emotionalControl: -5 }, madnessImpact: 4 },
      { id: 'a21', text: '看着别人赚钱比亏钱还难受', tag: 'degen', dimensions: { greedIndex: 15, emotionalControl: -15, cognitiveBias: 10 }, madnessImpact: 12 },
      { id: 'a22', text: '骂 Project God', tag: 'degen', dimensions: { emotionalControl: -18, riskAppetite: 10, cognitiveBias: 8 }, madnessImpact: 10 },
      { id: 'a23', text: '被禁言/踢出 VIP 群', tag: 'simp', dimensions: { socialDependency: 12, emotionalControl: -10, cognitiveBias: 8 }, madnessImpact: 7 },
      { id: 'a24', text: '在推特上跟人对喷一整天', tag: 'maxi', dimensions: { emotionalControl: -15, cognitiveBias: 15, socialDependency: 5 }, madnessImpact: 10 },
      { id: 'a25', text: '假装自己在迪拜开会', tag: 'larper', dimensions: { socialDependency: 12, cognitiveBias: 10, greedIndex: 10 }, madnessImpact: 6 },
      { id: 'a26', text: '发推特艾特 V 神', tag: 'npc', dimensions: { socialDependency: 18, cognitiveBias: 10, emotionalControl: -5 }, madnessImpact: 5 },
      { id: 'a27', text: '被拉黑 (Blocked)', tag: 'maxi', dimensions: { emotionalControl: -12, cognitiveBias: 12, socialDependency: -8 }, madnessImpact: 8 },

      // 生活影响类
      { id: 'a28', text: '用网贷/信用卡炒币', tag: 'degen', dimensions: { riskAppetite: 20, emotionalControl: -18, greedIndex: 18 }, madnessImpact: 15 },
      { id: 'a29', text: '把生活费亏光了', tag: 'degen', dimensions: { riskAppetite: 15, emotionalControl: -15, greedIndex: 15 }, madnessImpact: 14 },
      { id: 'a30', text: '每天只睡 3 小时', tag: 'slave', dimensions: { emotionalControl: -12, greedIndex: 10, socialDependency: 8 }, madnessImpact: 10 },
      { id: 'a31', text: '辞职全职炒币 (然后饿死)', tag: 'degen', dimensions: { riskAppetite: 18, emotionalControl: -15, greedIndex: 15 }, madnessImpact: 14 },
      { id: 'a32', text: '跟家人吵架/断绝关系', tag: 'rekt', dimensions: { emotionalControl: -18, socialDependency: -10, cognitiveBias: 12 }, madnessImpact: 12 },
      { id: 'a33', text: '手机屏碎了没钱换', tag: 'rekt', dimensions: { emotionalControl: -10, greedIndex: 8, cognitiveBias: 8 }, madnessImpact: 8 },
      { id: 'a34', text: '吃了一年泡面', tag: 'slave', dimensions: { emotionalControl: -8, greedIndex: 10, socialDependency: 5 }, madnessImpact: 7 },
      { id: 'a35', text: '因为炒币分手', tag: 'rekt', dimensions: { emotionalControl: -15, socialDependency: -12, cognitiveBias: 10 }, madnessImpact: 11 },
      { id: 'a36', text: '头发掉光了', tag: 'slave', dimensions: { emotionalControl: -12, greedIndex: 8, cognitiveBias: 5 }, madnessImpact: 8 },

      // 撸毛类
      { id: 'a37', text: '撸毛被判定女巫 (Sybil)', tag: 'slave', dimensions: { socialDependency: 10, emotionalControl: -10, greedIndex: 8 }, madnessImpact: 8 },
      { id: 'a38', text: '为了白名单去才艺展示', tag: 'slave', dimensions: { socialDependency: 15, emotionalControl: -8, greedIndex: 10 }, madnessImpact: 7 },
      { id: 'a39', text: '给黑客写小作文求退款', tag: 'simp', dimensions: { socialDependency: 18, emotionalControl: -12, cognitiveBias: 10 }, madnessImpact: 9 },
      { id: 'a40', text: '买了 100 个 Twitter 账号', tag: 'slave', dimensions: { greedIndex: 12, socialDependency: 10, emotionalControl: -5 }, madnessImpact: 8 },

      // 恶人类
      { id: 'a41', text: 'Rug 别人 (发假盘)', tag: 'dev', dimensions: { riskAppetite: 15, emotionalControl: 10, cognitiveBias: -10 }, madnessImpact: 5 },
      { id: 'a42', text: '内幕交易出货', tag: 'shark', dimensions: { riskAppetite: 12, emotionalControl: 15, cognitiveBias: -8 }, madnessImpact: -2 },
      { id: 'a43', text: '建老鼠仓', tag: 'shark', dimensions: { riskAppetite: 15, emotionalControl: 12, greedIndex: 15 }, madnessImpact: 3 },
      { id: 'a44', text: '做局杀猪', tag: 'shark', dimensions: { riskAppetite: 18, emotionalControl: 15, greedIndex: 18 }, madnessImpact: 5 },

      // New failure specifics
      { id: 'a45', text: 'Base 上冲了假合约 (0xdead...) 直接归零', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -12, riskAppetite: 8 }, madnessImpact: 10 },
      { id: 'a46', text: '跨链桥卡了 72 小时还要 KYC', tag: 'rekt', dimensions: { emotionalControl: -10, cognitiveBias: 8, socialDependency: 5 }, madnessImpact: 7 },
      { id: 'a47', text: '被 MEV 三明治夹出天价滑点', tag: 'rekt', dimensions: { cognitiveBias: 12, emotionalControl: -10, riskAppetite: 5 }, madnessImpact: 9 },
      { id: 'a48', text: '忘记设滑点被吃成 30% 税', tag: 'normie', dimensions: { cognitiveBias: 12, emotionalControl: -8, riskAppetite: -5 }, madnessImpact: 7 },
      { id: 'a49', text: 'Restaking 平台突然冻结提现', tag: 'rekt', dimensions: { emotionalControl: -15, cognitiveBias: 10, riskAppetite: 8 }, madnessImpact: 10 },
      { id: 'a50', text: 'LRT 赎回只拿回空气 (IOU)', tag: 'rekt', dimensions: { emotionalControl: -12, cognitiveBias: 12, greedIndex: 8 }, madnessImpact: 9 },
      { id: 'a51', text: 'Blast 提前解锁被罚款+扣收益', tag: 'degen', dimensions: { riskAppetite: 12, emotionalControl: -10, greedIndex: 12 }, madnessImpact: 9 },
      { id: 'a52', text: 'Ordinals 铭文卡 mempool 三天', tag: 'slave', dimensions: { emotionalControl: -10, socialDependency: 8, greedIndex: 8 }, madnessImpact: 7 },
      { id: 'a53', text: 'Runes 铸在错误区块号白忙活', tag: 'midcurve', dimensions: { cognitiveBias: 15, emotionalControl: -8, greedIndex: 10 }, madnessImpact: 8 },
      { id: 'a54', text: 'Berachain 测试网冲榜结果清零', tag: 'slave', dimensions: { emotionalControl: -12, socialDependency: 10, greedIndex: 8 }, madnessImpact: 8 },
      { id: 'a55', text: 'Farcaster Frame 打开就是 Drainer', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -12, socialDependency: 8 }, madnessImpact: 10 },
      { id: 'a56', text: 'Friend.tech 开盘 10e 买了自己 keys', tag: 'rekt', dimensions: { cognitiveBias: 18, emotionalControl: -10, greedIndex: 12 }, madnessImpact: 11 },
      { id: 'a57', text: 'TON 小游戏账号突然被封禁', tag: 'slave', dimensions: { emotionalControl: -10, socialDependency: 8, greedIndex: 8 }, madnessImpact: 7 },
      { id: 'a58', text: 'DePin 矿机被断电罚款还倒贴', tag: 'rekt', dimensions: { emotionalControl: -12, cognitiveBias: 10, greedIndex: 8 }, madnessImpact: 9 },
      { id: 'a59', text: 'Base Meme 低流动性被 jeet 出局', tag: 'degen', dimensions: { riskAppetite: 15, emotionalControl: -12, greedIndex: 12 }, madnessImpact: 10 },
      { id: 'a60', text: '写了抢跑脚本结果挂单没撤光亏', tag: 'dev', dimensions: { riskAppetite: 12, emotionalControl: -5, cognitiveBias: 10 }, madnessImpact: 7 },
      { id: 'a61', text: '签了假 Twitter 蓝勾 bot 链接', tag: 'normie', dimensions: { cognitiveBias: 15, socialDependency: 12, emotionalControl: -8 }, madnessImpact: 9 },
      { id: 'a62', text: '硬件钱包买到开封机被预植木马', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -12, riskAppetite: -5 }, madnessImpact: 10 },
      { id: 'a63', text: '跨到不存在的链 (RPC 配错直接消失)', tag: 'normie', dimensions: { cognitiveBias: 15, emotionalControl: -10, riskAppetite: -8 }, madnessImpact: 9 },
      { id: 'a64', text: 'DEX 下单小数点错位直接梭哈', tag: 'normie', dimensions: { cognitiveBias: 12, emotionalControl: -8, riskAppetite: -5 }, madnessImpact: 8 },
      { id: 'a65', text: 'Funding Rate 反向收割被扣成负资产', tag: 'degen', dimensions: { riskAppetite: 18, emotionalControl: -12, cognitiveBias: 12 }, madnessImpact: 12 },
      { id: 'a66', text: '永续合约忘记止损睡着爆仓', tag: 'degen', dimensions: { riskAppetite: 18, emotionalControl: -15, cognitiveBias: 10 }, madnessImpact: 13 },
      { id: 'a67', text: '把 LP 放到假池子被项目方抹掉', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -12, greedIndex: 10 }, madnessImpact: 10 },
      { id: 'a68', text: 'NFT 盲盒开到复制品还锁仓', tag: 'normie', dimensions: { cognitiveBias: 12, socialDependency: 10, emotionalControl: -8 }, madnessImpact: 7 },
      { id: 'a69', text: '节点 Slash 被罚没保证金', tag: 'dev', dimensions: { riskAppetite: 10, emotionalControl: -8, cognitiveBias: 8 }, madnessImpact: 7 },
      { id: 'a70', text: 'Restaking AVS 黑天鹅 Slash 一路清零', tag: 'rekt', dimensions: { emotionalControl: -15, cognitiveBias: 12, riskAppetite: 10 }, madnessImpact: 11 },
      { id: 'a71', text: '撸到大号被官方标记 Sybil 全没', tag: 'slave', dimensions: { emotionalControl: -15, socialDependency: 10, greedIndex: 12 }, madnessImpact: 11 },
      { id: 'a72', text: 'Gas 优化脚本写错直接多花 10 倍', tag: 'dev', dimensions: { cognitiveBias: 12, emotionalControl: -5, riskAppetite: 8 }, madnessImpact: 6 },
      { id: 'a73', text: 'Flashbot Bundle 失败交易卡死资金', tag: 'dev', dimensions: { riskAppetite: 12, emotionalControl: -8, cognitiveBias: 10 }, madnessImpact: 8 },
      { id: 'a74', text: '链上拍卖出价单位写错直接破产', tag: 'midcurve', dimensions: { cognitiveBias: 18, emotionalControl: -12, greedIndex: 10 }, madnessImpact: 12 },
      { id: 'a75', text: '抢 ICO 白名单结果名单是假的', tag: 'simp', dimensions: { socialDependency: 15, cognitiveBias: 12, emotionalControl: -10 }, madnessImpact: 9 },
      { id: 'a76', text: 'RWA 线下见面会被推销理财产品', tag: 'normie', dimensions: { socialDependency: 15, cognitiveBias: 10, emotionalControl: -5 }, madnessImpact: 5 },
      { id: 'a77', text: 'Fork 别人项目没改 logo 就上线', tag: 'dev', dimensions: { riskAppetite: 12, cognitiveBias: 8, emotionalControl: 5 }, madnessImpact: 4 },
      { id: 'a78', text: 'MEV Bot 反被夹净亏 gas', tag: 'shark', dimensions: { riskAppetite: 15, emotionalControl: 8, cognitiveBias: -5 }, madnessImpact: 3 },
      { id: 'a79', text: 'Telegram Bot 更新偷走私钥', tag: 'rekt', dimensions: { cognitiveBias: 15, emotionalControl: -12, socialDependency: 8 }, madnessImpact: 10 },
      { id: 'a80', text: '被 Rug 后还在社群发 Copium', tag: 'simp', dimensions: { socialDependency: 18, cognitiveBias: 15, emotionalControl: -10 }, madnessImpact: 10 },
      { id: 'a81', text: '跟风 Restake 被强制解押手续费吃光', tag: 'midcurve', dimensions: { cognitiveBias: 15, socialDependency: 12, emotionalControl: -8 }, madnessImpact: 9 },
      { id: 'a82', text: '跨链没等确认就在另一边开杠杆亏两头', tag: 'degen', dimensions: { riskAppetite: 20, emotionalControl: -15, cognitiveBias: 12 }, madnessImpact: 14 },
      { id: 'a83', text: 'BTC L2 空投脚本跑一周没 Gas 费', tag: 'slave', dimensions: { emotionalControl: -10, socialDependency: 8, greedIndex: 10 }, madnessImpact: 7 },
      { id: 'a84', text: 'ZK 空投多签没加白名单资金锁死', tag: 'dev', dimensions: { cognitiveBias: 12, emotionalControl: -10, riskAppetite: 8 }, madnessImpact: 8 },
    ],
  },
  {
    id: 'level3' as StageId,
    title: 'LEVEL 3: 精神病诊断 (多选)',
    subtitle: '现在的你，脑子还正常吗？(至少选 3 个)',
    options: [
      { id: 'm1', text: '电子阳痿 (毫无波澜)', tag: 'holder', dimensions: { riskAppetite: -8, emotionalControl: 15, greedIndex: -10 }, madnessImpact: -5 },
      { id: 'm2', text: '看见 K 线就生理性反胃', tag: 'rekt', dimensions: { emotionalControl: -18, cognitiveBias: 8, riskAppetite: -10 }, madnessImpact: 8 },
      { id: 'm3', text: '严重幻觉 (觉得下个币能回本)', tag: 'degen', dimensions: { riskAppetite: 15, emotionalControl: -12, greedIndex: 18, cognitiveBias: 15 }, madnessImpact: 12 },
      { id: 'm4', text: '杀红了眼 (不知死活)', tag: 'degen', dimensions: { riskAppetite: 20, emotionalControl: -18, greedIndex: 15 }, madnessImpact: 15 },
      { id: 'm5', text: '早已麻木 (行尸走肉)', tag: 'slave', dimensions: { emotionalControl: -15, socialDependency: 5, greedIndex: -5 }, madnessImpact: 10 },
      { id: 'm6', text: '准备注册美团骑手', tag: 'rekt', dimensions: { emotionalControl: -12, cognitiveBias: 5, riskAppetite: -15 }, madnessImpact: 6 },
      { id: 'm7', text: '彻底疯狂 (Joker)', tag: 'degen', dimensions: { riskAppetite: 18, emotionalControl: -20, greedIndex: 15, cognitiveBias: 12 }, madnessImpact: 15 },
      { id: 'm8', text: '想重开 (Remake)', tag: 'rekt', dimensions: { emotionalControl: -20, cognitiveBias: 10, riskAppetite: -10 }, madnessImpact: 12 },
      { id: 'm9', text: '看谁都像骗子 (PTSD)', tag: 'shark', dimensions: { emotionalControl: 12, cognitiveBias: -10, socialDependency: -15 }, madnessImpact: 5 },
      { id: 'm10', text: '只会阿巴阿巴', tag: 'npc', dimensions: { socialDependency: 18, emotionalControl: -10, cognitiveBias: 15 }, madnessImpact: 8 },
      { id: 'm11', text: 'WAGMI 挂嘴边 (骗自己)', tag: 'simp', dimensions: { socialDependency: 15, emotionalControl: -5, cognitiveBias: 18 }, madnessImpact: 7 },
      { id: 'm12', text: '每天极度焦虑', tag: 'midcurve', dimensions: { emotionalControl: -18, cognitiveBias: 12, greedIndex: 10 }, madnessImpact: 10 },
      { id: 'm13', text: '情绪极度不稳定 (躁郁症)', tag: 'degen', dimensions: { emotionalControl: -20, riskAppetite: 12, cognitiveBias: 10 }, madnessImpact: 12 },
      { id: 'm14', text: '觉得自己是巴菲特转世', tag: 'midcurve', dimensions: { cognitiveBias: 20, emotionalControl: 5, greedIndex: 12 }, madnessImpact: 8 },
      { id: 'm15', text: '已经把钱当数字了', tag: 'shark', dimensions: { emotionalControl: 18, riskAppetite: 15, greedIndex: -8 }, madnessImpact: -2 },
      { id: 'm16', text: '与社会脱节 (山顶洞人)', tag: 'slave', dimensions: { socialDependency: -15, emotionalControl: -10, cognitiveBias: 8 }, madnessImpact: 10 },
      { id: 'm17', text: '不想工作只想炒币', tag: 'degen', dimensions: { riskAppetite: 15, emotionalControl: -12, greedIndex: 18 }, madnessImpact: 12 },
      { id: 'm18', text: '众叛亲离', tag: 'rekt', dimensions: { emotionalControl: -15, socialDependency: -18, cognitiveBias: 10 }, madnessImpact: 11 },
      { id: 'm19', text: '获得内心平静 (其实是归零了)', tag: 'holder', dimensions: { emotionalControl: 15, riskAppetite: -12, greedIndex: -15 }, madnessImpact: -3 },
      { id: 'm20', text: '充满希望 (也是幻觉)', tag: 'maxi', dimensions: { cognitiveBias: 18, emotionalControl: 5, greedIndex: 12 }, madnessImpact: 6 },
      { id: 'm21', text: '只想找个班上', tag: 'normie', dimensions: { riskAppetite: -15, socialDependency: 10, emotionalControl: 5 }, madnessImpact: -5 },
      { id: 'm22', text: '攻击性极强', tag: 'maxi', dimensions: { emotionalControl: -15, cognitiveBias: 15, socialDependency: -12 }, madnessImpact: 10 },
      { id: 'm23', text: '每天高强度对线', tag: 'maxi', dimensions: { emotionalControl: -12, cognitiveBias: 15, socialDependency: -8 }, madnessImpact: 9 },
      { id: 'm24', text: '虚荣心爆棚', tag: 'larper', dimensions: { socialDependency: 15, cognitiveBias: 12, greedIndex: 10 }, madnessImpact: 7 },
      { id: 'm25', text: '看到别人亏钱就开心', tag: 'shark', dimensions: { emotionalControl: 10, cognitiveBias: -5, socialDependency: -10 }, madnessImpact: 3 },
      { id: 'm26', text: '每天祈祷绿柱子', tag: 'simp', dimensions: { socialDependency: 12, emotionalControl: -10, cognitiveBias: 15 }, madnessImpact: 8 },
      { id: 'm27', text: '怀疑世界是虚拟的', tag: 'degen', dimensions: { cognitiveBias: 18, emotionalControl: -8, riskAppetite: 10 }, madnessImpact: 10 },
      { id: 'm28', text: '觉得法币是庞氏骗局', tag: 'maxi', dimensions: { cognitiveBias: 20, riskAppetite: 12, socialDependency: -15 }, madnessImpact: 8 },
      { id: 'm29', text: '只和二次元头像说话', tag: 'degen', dimensions: { socialDependency: -12, emotionalControl: -8, cognitiveBias: 10 }, madnessImpact: 9 },
      { id: 'm30', text: '卸载推特又装回来 (第 10 次)', tag: 'degen', dimensions: { emotionalControl: -15, socialDependency: 15, greedIndex: 8 }, madnessImpact: 10 },
      { id: 'm31', text: '30 秒看一次价格', tag: 'degen', dimensions: { emotionalControl: -18, greedIndex: 15, riskAppetite: 12 }, madnessImpact: 12 },
      { id: 'm32', text: '暴饮暴食 / 厌食', tag: 'rekt', dimensions: { emotionalControl: -18, cognitiveBias: 8, socialDependency: -5 }, madnessImpact: 10 },
      { id: 'm33', text: '每天插管吸 Copium', tag: 'degen', dimensions: { cognitiveBias: 18, emotionalControl: -12, greedIndex: 12 }, madnessImpact: 11 },
      { id: 'm34', text: '嘴上 Mog everyone 仓里只剩 Stable', tag: 'larper', dimensions: { socialDependency: 12, cognitiveBias: 15, greedIndex: -5 }, madnessImpact: 5 },
      { id: 'm35', text: '一听 Restaking 就高潮', tag: 'midcurve', dimensions: { cognitiveBias: 15, greedIndex: 15, emotionalControl: -8 }, madnessImpact: 9 },
      { id: 'm36', text: 'Farcaster 刷屏求多巴胺', tag: 'simp', dimensions: { socialDependency: 20, emotionalControl: -10, cognitiveBias: 8 }, madnessImpact: 9 },
      { id: 'm37', text: '做梦也在算 APY 和年化', tag: 'midcurve', dimensions: { cognitiveBias: 18, greedIndex: 12, emotionalControl: -10 }, madnessImpact: 10 },
      { id: 'm38', text: '对每个新 L2 失忆式冲锋', tag: 'degen', dimensions: { riskAppetite: 18, emotionalControl: -12, cognitiveBias: 12, greedIndex: 10 }, madnessImpact: 12 },
      { id: 'm39', text: '自称 Anti-jeet 实际第一时间砸盘', tag: 'maxi', dimensions: { cognitiveBias: 18, emotionalControl: 8, socialDependency: -10 }, madnessImpact: 6 },
      { id: 'm40', text: '买菜都会想设置止损', tag: 'midcurve', dimensions: { cognitiveBias: 15, emotionalControl: -5, riskAppetite: 8 }, madnessImpact: 7 },
      { id: 'm41', text: '看到验证码 PTSD (Galxe 后遗症)', tag: 'slave', dimensions: { emotionalControl: -15, socialDependency: 10, greedIndex: 8 }, madnessImpact: 9 },
      { id: 'm42', text: '钱包震动幻觉（明明没推送）', tag: 'rekt', dimensions: { emotionalControl: -18, cognitiveBias: 12, greedIndex: 10 }, madnessImpact: 11 },
      { id: 'm43', text: '梦里跨链还是 Pending', tag: 'slave', dimensions: { emotionalControl: -12, socialDependency: 8, greedIndex: 10 }, madnessImpact: 8 },
      { id: 'm44', text: '觉得 MEV 才是命运共同体', tag: 'shark', dimensions: { riskAppetite: 12, emotionalControl: 15, cognitiveBias: -8 }, madnessImpact: 2 },
      { id: 'm45', text: '硬把拉盘解释为"机构扫货"', tag: 'simp', dimensions: { cognitiveBias: 20, socialDependency: 15, emotionalControl: -5 }, madnessImpact: 8 },
      { id: 'm46', text: '已经不会讲人话只剩缩写 (GM/WAGMI/NGMI)', tag: 'npc', dimensions: { socialDependency: 18, cognitiveBias: 15, emotionalControl: -8 }, madnessImpact: 9 },
      { id: 'm47', text: '把朋友当 exit liquidity 还理直气壮', tag: 'shark', dimensions: { emotionalControl: 12, cognitiveBias: -5, socialDependency: -18 }, madnessImpact: 4 },
      { id: 'm48', text: '准备用 AI Agent 帮自己看链上情绪', tag: 'larper', dimensions: { cognitiveBias: 12, socialDependency: 8, greedIndex: 10 }, madnessImpact: 5 },
      { id: 'm49', text: '对价格麻木但对梗图高度敏感', tag: 'degen', dimensions: { emotionalControl: -10, socialDependency: 12, cognitiveBias: 10 }, madnessImpact: 8 },
      { id: 'm50', text: '相信所有下跌都是做市商洗盘', tag: 'maxi', dimensions: { cognitiveBias: 20, emotionalControl: -5, socialDependency: -8 }, madnessImpact: 9 },
    ],
  },
];

// --- 12 种确诊人格 (Crypto Native / Savage Edition) ---
// 风格：嘴臭、嘲讽、充满了 Web3 的荒诞现实主义
export const RESULTS: Record<TagType, Result> = {
  degen: {
    id: 'res_degen',
    title: '链上赌博成瘾晚期',
    roast: '你的多巴胺受体已经被土狗盘烧坏了。别人看 K 线是分析，你看 K 线是心电图。只要手里有 U，不冲进去就在全身蚂蚁爬。每天在 "WAGMI" 和 "美团外卖" 之间反复横跳。承认吧，你不是来投资的，你就是来送钱顺便体验心跳过速的。',
    img: '🎰',
    color: 'text-purple-600',
  },
  rekt: {
    id: 'res_rekt',
    title: '北韩黑客赞助商',
    roast: '你就是链上的活菩萨，黑客眼里的提款机。钓鱼链接你点，授权你随便给，土狗归零你接盘。你的钱包地址应该被刻在以太坊的耻辱柱上供人瞻仰。别复盘了，你的每一次操作都是在给骗子发年终奖，建议直接把私钥纹在脑门上更省事。',
    img: '🤡',
    color: 'text-red-600',
  },
  slave: {
    id: 'res_slave',
    title: '赛博富士康流水线黑奴',
    roast: '手指磨出了茧，键盘敲烂了三个，为了那点像喂狗一样的空投，你活得像个脚本。开了 500 个号以为自己又单项目A8了，结果一查 " you are not eligible "。答应我留着200u，还能mint一辆雅迪',
    img: '⛓️',
    color: 'text-zinc-500',
  },
  holder: {
    id: 'res_holder',
    title: '归零币守墓人',
    roast: '别用 "钻石手" 。你不是拿得住，你是被套傻了。看着账户缩水 95%，你还在幻想着 "技术面修复" 和 "下轮牛市"。当有个人一直跟你在聊一个币，他一定是被套了兄弟，没招了。',
    img: '🗿',
    color: 'text-blue-600',
  },
  shark: {
    id: 'res_shark',
    title: '收割机',
    roast: '你没有感情，只有算法。你把别人的爆仓当成香槟的开瓶声。在别人因为亏钱跳楼的时候，你只关心 Gas 费有没有飙升。你不是在交易，你是在吃人。虽然你赚到了钱，但每一张 USDT 上都沾着韭菜的眼泪，不过我知道你根本不在乎，毕竟良心不能当饭吃。',
    img: '🩸',
    color: 'text-yellow-600',
  },
  normie: {
    id: 'res_normie',
    title: 'Web3 观光韭菜',
    roast: '你就像是误入原始森林的小白兔，手里拿着法币，脸上写着"快来割我"。买币靠新闻，卖币靠恐慌，不知道什么是私钥，以为 USDT 是理财产品。你存在的唯一意义，就是在大牛市顶峰接盘，好让真正的鲸鱼能够优雅离场。',
    img: '🥬',
    color: 'text-green-500',
  },
  midcurve: {
    id: 'res_midcurve',
    title: 'IQ1000',
    roast: '你读了所有的白皮书，画了最复杂的图，最后收益率跑不过一直乱冲的傻子。你总是想太多，总是在寻找完美的入场点，结果完美错过了整轮行情。你嘲笑土狗没有价值，土狗嘲笑你没有钱。你的智商就是你亏钱的罪魁祸首，不如 IQ 50"。',
    img: '📉',
    color: 'text-indigo-500',
  },
  simp: {
    id: 'res_simp',
    title: 'KOL 的专属舔狗',
   roast: '大 V 放个屁你都觉得是 Alpha。别人把你当 Exit Liquidity（退出流动性），你把别人当家人。只要群主喊单，你连看合约都不看就冲。被割了还要帮人数钱，甚至还要在推特上维护割你的镰刀。你的膝盖是软的，钱包是空的，脑子是水的。',
    img: '🐕',
    color: 'text-pink-500',
  },
  maxi: {
    id: 'res_maxi',
    title: '原教旨疯狗',
    roast: '你的世界非黑即白，除了你持有的那个币，其他全是垃圾 (Scam)。你像个邪教徒一样在推特上撕咬每一个持不同意见的人。你以为你在捍卫去中心化，其实你只是在掩盖你错过其他百倍币的焦虑。你的傲慢比你的持仓还要重。',
    img: '⚡',
    color: 'text-orange-600',
  },
  larper: {
    id: 'res_larper',
    title: '空气项目装逼犯',
    roast: '推特简介 "Founder / Builder"，实际存款三位数。每天在 Space 上指点江山，满嘴 "叙事"、"范式转移"，实际上连个像样的 Demo 都拿不出来。你用 PPT 融资，用嘴盘拉盘。你最大的技能不是写代码，而是假装自己在迪拜有很多大佬朋友。',
    img: '🎭',
    color: 'text-teal-500',
  },
  dev: {
    id: 'res_dev',
    title: '匿名跑路预备役',
    roast: '代码写的像屎，后门留得像门。你发项目的目的只有一个：Rug Pull。什么路线图、什么 DAO，全是你为了把 LP 池子卷走而编织的谎言。Tornado Cash 是你唯一的归宿。别装了，你的 GitHub 提交记录比你的良心还干净。',
    img: '🌪️',
    color: 'text-slate-400',
  },
  npc: {
    id: 'res_npc',
    title: '链上气氛组',
    roast: '你是群里的复读机，只会发 "GM" 和表情包。你在 Crypto 世界里就像游戏里的路人 NPC，没有任何剧情属于你。暴涨没你份，暴跌你也跟着亏。你提供了流动性，提供了活跃度，唯独没有提供智商。你来过，你亏了，你走了，没人在意。',
    img: '😶',
    color: 'text-gray-500',
  },
};

// 构建选项查找表
const optionLookup = new Map<string, EnhancedOption>();
QUESTIONS.forEach((q) => {
  q.options.forEach((opt) => {
    optionLookup.set(opt.id, opt);
  });
});

// 获取选项详情
export function getOptionById(id: string): EnhancedOption | undefined {
  return optionLookup.get(id);
}

// 人格权重配置 - 某些人格更"极端"，需要更高的阈值
const PERSONALITY_WEIGHTS: Record<TagType, number> = {
  degen: 1.0,    // 赌狗 - 标准权重
  rekt: 1.0,     // 冤种 - 标准权重
  holder: 1.1,   // 死拿 - 稍微难匹配
  slave: 1.0,    // 撸毛 - 标准权重
  shark: 1.3,    // 镰刀 - 需要更多证据才能判定
  normie: 0.9,   // 萌新 - 容易匹配
  midcurve: 1.1, // 中智商 - 稍微难匹配
  simp: 1.0,     // 舔狗 - 标准权重
  maxi: 1.1,     // 极端主义 - 稍微难匹配
  larper: 1.0,   // 装逼犯 - 标准权重
  dev: 1.2,      // 开发者 - 需要更多证据
  npc: 0.9,      // 气氛组 - 容易匹配
};

/**
 * 计算人格结果 - 基于选项的 tag 统计
 * 20个选择中，哪个 tag 出现最多就是你的人格
 */
export function calculateResult(selectedIds: string[]): Result {
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

  // 统计每个 tag 的出现次数
  selectedIds.forEach((id) => {
    const opt = optionLookup.get(id);
    if (opt) {
      scores[opt.tag] += 1;
    }
  });

  // 应用权重调整
  const weightedScores = Object.entries(scores).map(([tag, score]) => ({
    tag: tag as TagType,
    rawScore: score,
    weightedScore: score / PERSONALITY_WEIGHTS[tag as TagType],
  }));

  // 按加权分数排序，取最高的
  weightedScores.sort((a, b) => b.weightedScore - a.weightedScore);
  
  // 如果最高分为0，返回默认人格 (normie)
  const topResult = weightedScores[0];
  if (topResult.rawScore === 0) {
    return RESULTS.normie;
  }

  return RESULTS[topResult.tag];
}

/**
 * 获取人格分布详情 - 用于显示雷达图等
 */
export function getPersonalityDistribution(selectedIds: string[]): Record<TagType, { count: number; percentage: number }> {
  const scores: Record<TagType, number> = {
    degen: 0, rekt: 0, holder: 0, slave: 0, shark: 0, normie: 0,
    midcurve: 0, simp: 0, maxi: 0, larper: 0, dev: 0, npc: 0,
  };

  selectedIds.forEach((id) => {
    const opt = optionLookup.get(id);
    if (opt) {
      scores[opt.tag] += 1;
    }
  });

  const total = selectedIds.length || 1;
  const distribution: Record<TagType, { count: number; percentage: number }> = {} as any;
  
  (Object.keys(scores) as TagType[]).forEach((tag) => {
    distribution[tag] = {
      count: scores[tag],
      percentage: Math.round((scores[tag] / total) * 100),
    };
  });

  return distribution;
}
