# 五子棋游戏 (Gomoku Game)

一个使用原生JavaScript开发的前端五子棋游戏，支持人机对战和双人对战模式。

## 🎮 功能特性

- **双人对战**：支持两个玩家在同一设备上进行对战
- **智能AI**：内置AI对手，提供挑战性游戏体验
- **悔棋功能**：支持悔棋操作，让游戏更加友好
- **胜负判定**：自动检测五子连珠，判定胜负
- **响应式设计**：适配不同屏幕尺寸
- **简洁界面**：清晰的游戏界面，易于操作

## 🛠️ 技术栈

- **HTML5**：页面结构和语义化标签
- **CSS3**：样式设计和布局
- **JavaScript (ES6+)**：游戏逻辑和交互
- **Canvas API**：绘制棋盘和棋子
- **Module Pattern**：使用ES6模块组织代码

## 📦 安装和使用

### 前提条件

- Node.js (推荐使用最新版本)
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 安装步骤

1. 克隆仓库到本地
```bash
git clone https://github.com/jiangnm001/gomoku-game.git
cd gomoku-game
```

2. 安装依赖
```bash
npm install
```

3. 启动本地服务器
```bash
npm run serve
```

4. 在浏览器中打开
```
http://localhost:8080
```

## 🎯 游戏规则

五子棋是一种传统的棋类游戏，规则简单：

1. **黑白双方轮流下棋**，黑棋先行
2. **在棋盘交叉点上落子**，每次只能下一子
3. **先形成五子连珠的一方获胜**（横、竖、斜任意方向）
4. **落子无悔**（除非使用悔棋功能）

## 📁 项目结构

```
gomoku-game/
├── index.html          # 主页面文件
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── main.js         # 主入口文件
│   ├── game.js         # 游戏逻辑核心
│   ├── board.js        # 棋盘绘制相关
│   └── ai.js           # AI算法（如果有）
├── package.json        # 项目配置
├── .gitignore         # Git忽略文件
└── README.md          # 项目说明
```

## 💻 开发说明

### 本地开发

```bash
# 启动开发服务器
npm run serve

# 构建项目（当前为示例命令）
npm run build

# 类型检查（当前为示例命令）
npm run typecheck
```

### 代码规范

- 使用ES6模块语法（import/export）
- 采用语义化的变量和函数命名
- 添加必要的代码注释
- 保持代码结构清晰

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 感谢五子棋这一经典游戏带来的灵感
- 感谢开源社区提供的优秀工具和资源

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/jiangnm001/gomoku-game/issues)

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！