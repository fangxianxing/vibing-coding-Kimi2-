# 🏠 租房合同避坑助手  
**基于 Kimi AI 的智能合同风险扫描工具**

[📖 功能一览](#-功能特性) · [🚀 快速开始](#-快速开始) · [🎯 使用说明](#-使用说明) · [🔧 配置说明](#-配置说明) · [🤝 贡献指南](#-贡献指南)

![MIT License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Kimi AI](https://img.shields.io/badge/Kimi-AI-ff6900?logo=openai)


---

## 📋 项目简介
租房合同避坑助手是一个基于 **Kimi AI 大模型** 的智能合同分析工具，专为租房人群设计。  
上传合同图片即可一键识别风险条款，获得专业法律建议，并参考真实小红书案例，帮你远离租房陷阱，守护钱包与权益。

---

## ✨ 功能特性

| 类别 | 亮点 |
|---|---|
| 🤖 **AI 智能分析** | 精准识别风险条款 / 自动风险评级（高/中/低）/ 给出可执行的法律建议 |
| 📱 **便捷操作** | 图片直传，无需手打 / 批量上传多份合同 / 实时进度条，结果一目了然 |
| 🔍 **详细分析** | 条款四档分类（高/中/低/良好）/ 附小红书真实案例链接 / 引用《民法典》等权威法规 |
| 🛡️ **隐私保护** | 本地浏览器完成解析，合同不上云 / API Key 仅存本地 / 零日志、零追踪 |

---

## 🚀 技术栈

- **前端框架**  
  React 18 + Vite + Tailwind CSS  
- **UI 与动画**  
  shadcn/ui + Lucide React + Framer Motion  
- **AI 与文件处理**  
  Kimi AI API + 联网小红书搜索 + 图片 OCR  
- **工程化**  
  ESLint + PostCSS + Axios

---

## 📦 快速开始

### 1. 环境要求
Node.js ≥ 16  
npm 或 yarn

### 2. 一键启动
```bash
# 克隆
git clone https://github.com/your-username/rental-contract-analyzer.git](https://github.com/fangxianxing/vibing-coding-Kimi2-.git
cd vibing-coding-Kimi2-

# 安装依赖
npm install        # 或 yarn

# 启动开发服务器
npm run dev        # 或 yarn dev

# 构建生产版本
npm run build      # 或 yarn build
```
## 🎯 使用说明

| 步骤 | 操作提示 |
|---|---|
| ① 配置密钥 | 前往 [Kimi 开放平台](https://platform.moonshot.cn) 创建应用 → 复制 API Key → 在网页弹窗中粘贴并保存 |
| ② 上传合同 | 拖拽或点击上传区域，支持 JPG/PNG，单张 ≤ 10 MB，可批量 |
| ③ 查看报告 | 30 秒内生成风险等级、条款分类、改进建议、小红书案例、对应法条 |
| ④ 避坑指南 | 侧边栏提供「租房避坑 30 条」「看房检查清单」「必问房东 20 题」等实用攻略 |


## 🔧 配置说明
### 环境变量（可选）
```bash
# .env.local
VITE_KIMI_API_KEY=your_api_key_here
```
## 📝 注意事项
本工具提供的建议仅供参考，不构成正式法律意见；重大纠纷请咨询执业律师。
所有合同图片均在本地解析，不会上传到任何服务器，请放心使用。
## 请合理调用 API，避免短时间内高频请求，达到速率限制需等待重置。
🤝 贡献指南
欢迎 PR / Issue / 吐槽！可以根据这个基础代码进行二创，补全相关功能，比如关联相关案例分析等等
## 📄 开源协议
MIT License —— 详见 LICENSE
<div align="center">
Made with ❤️ for a better rental experience
如果觉得有用，请给仓库点一颗 ⭐️ 吧！
