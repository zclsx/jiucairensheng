# 韭菜人生升级需求文档 - 从心理测试到深度诊断

## 简介

将现有的"韭菜人生"心理测试升级为更具深度和可玩性的 Crypto 心理诊断系统。保持原有的黑色幽默和 Crypto 梗，同时增加多维度心理分析、详细诊断报告和个性化建议，让用户在娱乐中获得对自己投资心理的深度认知。

## 术语表

- **Crypto_Psychology_System**: 韭菜人生心理诊断系统
- **Madness_Score**: 疯狂指数，0-100 分制，衡量用户的 Crypto 成瘾程度
- **Survival_Rating**: 生存评级，基于心理韧性的生存能力评估
- **Multi_Dimension_Analysis**: 多维度分析，包含风险偏好、情绪控制、认知偏差、社交依赖等维度
- **Detailed_Diagnosis**: 详细诊断报告，包含各维度得分、人格分析和改善建议
- **Enhanced_Questions**: 增强题目系统，在原有基础上增加更多场景化和深度化题目
- **Tag_System**: 保持现有的 12 种人格标签系统
- **Roast_Engine**: 毒舌引擎，生成个性化的犀利点评

## 需求

### 需求 1

**用户故事:** 作为 Crypto 玩家，我希望通过有趣的测试深度了解自己的投资心理状态，这样我能在娱乐中认识自己的问题并获得改善建议。

#### 验收标准

1. WHEN 测评开始 THEN THE Crypto_Psychology_System SHALL 保持现有的三关卡结构（身份、行为、精神状态）
2. WHEN 用户选择选项 THEN THE Crypto_Psychology_System SHALL 同时计算传统 Tag 得分和新增的多维度心理得分
3. WHEN 用户完成所有题目 THEN THE Crypto_Psychology_System SHALL 生成 0-100 分的 Madness_Score（疯狂指数）
4. WHEN 计算完成 THEN THE Crypto_Psychology_System SHALL 确定用户的 Survival_Rating（韭菜、老韭菜、韭菜王、镰刀预备役、终极镰刀）
5. WHEN 测评结束 THEN THE Crypto_Psychology_System SHALL 显示疯狂指数、生存评级和主要人格类型

### 需求 2

**用户故事:** 作为用户，我希望测试能从多个心理维度分析我的状态，这样我能获得比单一人格类型更全面的自我认知。

#### 验收标准

1. WHEN 用户选择 "degen" 类型选项 THEN THE Crypto_Psychology_System SHALL 增加风险偏好得分 8-15 分，减少情绪控制得分 5-12 分
2. WHEN 用户选择 "rekt" 类型选项 THEN THE Crypto_Psychology_System SHALL 减少风险管理得分 10-20 分，增加受害者心态得分 8-15 分
3. WHEN 用户选择 "slave" 类型选项 THEN THE Crypto_Psychology_System SHALL 增加勤奋指数 5-10 分，减少独立思考得分 8-15 分
4. WHEN 用户选择 "shark" 类型选项 THEN THE Crypto_Psychology_System SHALL 增加操控能力得分 10-18 分，减少同理心得分 5-12 分
5. WHEN 计算维度得分 THEN THE Crypto_Psychology_System SHALL 基于选项组合计算风险偏好、情绪控制、认知偏差、社交依赖四个核心维度

### 需求 3

**用户故事:** 作为用户，我希望看到详细的诊断报告而不只是一个人格标签，这样我能全面了解自己的投资心理问题。

#### 验收标准

1. WHEN 测评结束 THEN THE Crypto_Psychology_System SHALL 生成包含至少 5 个维度的 Detailed_Diagnosis 报告
2. WHEN 显示报告 THEN THE Crypto_Psychology_System SHALL 展示每个维度的得分、雷达图和文字说明
3. WHEN 生成诊断 THEN THE Crypto_Psychology_System SHALL 基于维度组合识别用户的核心心理问题（如过度自信、损失厌恶、羊群效应等）
4. WHEN 显示人格类型 THEN THE Crypto_Psychology_System SHALL 保持现有 12 种人格的毒舌式点评风格
5. WHEN 报告生成 THEN THE Crypto_Psychology_System SHALL 为每个识别出的问题提供具体的改善建议

### 需求 4

**用户故事:** 作为用户，我希望结果页面有更丰富的数据展示，这样我能更直观地看到自己的"战绩"并分享给朋友。

#### 验收标准

1. WHEN 测评结束 THEN THE Crypto_Psychology_System SHALL 在结果页面左侧显示人格类型和毒舌点评
2. WHEN 显示结果 THEN THE Crypto_Psychology_System SHALL 在右侧显示包含疯狂指数、生存评级、各维度得分的数据面板
3. WHEN 生成数据面板 THEN THE Crypto_Psychology_System SHALL 使用雷达图可视化展示多维度得分
4. WHEN 显示统计数据 THEN THE Crypto_Psychology_System SHALL 展示用户在各个 Tag 类型上的分布百分比
5. WHEN 用户查看结果 THEN THE Crypto_Psychology_System SHALL 提供一键生成分享文案功能，包含疯狂指数、人格类型和犀利点评

### 需求 5

**用户故事:** 作为用户，我希望测试过程中能看到实时的心理状态变化，这样能增加测试的互动性和趣味性。

#### 验收标准

1. WHEN 用户进行测试 THEN THE Crypto_Psychology_System SHALL 在界面顶部显示疯狂指数进度条
2. WHEN 用户选择选项后 THEN THE Crypto_Psychology_System SHALL 使用动画效果展示疯狂指数的变化
3. WHEN 疯狂指数超过 70 分 THEN THE Crypto_Psychology_System SHALL 将进度条颜色变为红色警告状态
4. WHEN 用户完成每个关卡 THEN THE Crypto_Psychology_System SHALL 显示当前关卡的心理状态小结
5. WHEN 显示状态变化 THEN THE Crypto_Psychology_System SHALL 使用幽默的文案提示用户当前的心理倾向

### 需求 6

**用户故事:** 作为用户，我希望能在测试中遇到一些意外的场景题目，这样能让测试更有趣且更贴近真实的 Crypto 体验。

#### 验收标准

1. WHEN 系统设计题目 THEN THE Crypto_Psychology_System SHALL 在现有三关基础上增加至少 10 个场景化题目
2. WHEN 显示场景题目 THEN THE Crypto_Psychology_System SHALL 提供具体的情境描述（如"你有 1000U，今晚怎么操作？"）
3. WHEN 用户选择场景选项 THEN THE Crypto_Psychology_System SHALL 根据选择计算对应的心理维度得分
4. WHEN 设计选项 THEN THE Crypto_Psychology_System SHALL 确保每个选项都有明确的心理学含义（风险偏好、从众心理等）
5. WHEN 题目呈现 THEN THE Crypto_Psychology_System SHALL 保持现有的 Crypto 梗和黑色幽默风格

### 需求 7

**用户故事:** 作为用户，我希望诊断报告能给我具体可行的建议，而不只是告诉我有什么问题。

#### 验收标准

1. WHEN 生成建议 THEN THE Roast_Engine SHALL 基于用户的维度得分识别前 3 个最突出的心理问题
2. WHEN 显示建议 THEN THE Crypto_Psychology_System SHALL 为每个问题提供 2-3 条具体的改善建议
3. WHEN 建议生成 THEN THE Crypto_Psychology_System SHALL 使用幽默但不失专业的语气
4. WHEN 用户查看建议 THEN THE Crypto_Psychology_System SHALL 提供相关的 Crypto 投资心理学知识链接或资源
5. WHEN 显示改善建议 THEN THE Crypto_Psychology_System SHALL 包含可操作的行为改变建议（如"设置止损"、"减少盯盘频率"等）

### 需求 8

**用户故事:** 作为开发者，我希望保持现有代码结构的兼容性，这样能在不破坏原有功能的基础上平滑升级。

#### 验收标准

1. WHEN 系统升级 THEN THE Crypto_Psychology_System SHALL 保持现有的 Tag_System 和 12 种人格类型不变
2. WHEN 计算结果 THEN THE Crypto_Psychology_System SHALL 继续使用 calculateResult 函数确定主要人格类型
3. WHEN 扩展数据模型 THEN THE Crypto_Psychology_System SHALL 在 Option 接口基础上添加新的心理维度字段
4. WHEN 显示结果 THEN THE Crypto_Psychology_System SHALL 保持现有的 Windows 风格 UI 设计
5. WHEN 系统运行 THEN THE Crypto_Psychology_System SHALL 确保现有的 QUESTIONS 和 RESULTS 数据结构继续有效