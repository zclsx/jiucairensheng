/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格模式
  reactStrictMode: true,
  
  // 图片优化配置
  images: {
    unoptimized: false,
  },
  
  // 输出独立部署包（可选，Vercel 默认不需要）
  // output: 'standalone',
}

module.exports = nextConfig
