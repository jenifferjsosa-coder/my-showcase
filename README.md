# 好心茂名 · 山海荔乡

一个手机端（430px）的茂名城市宣传小程序：产业、好物、景点、美食、人文、路线、时令、到达方式，一屏一屏往下翻。

纯静态，无框架、无构建、无依赖：双击 `index.html` 就能看，也能直接丢到 GitHub Pages 上。

**在线地址（GitHub Pages）**：https://jenifferjsosa-coder.github.io/my-showcase/

## 有什么

- 五个 tab：首页 / 好物 / 游玩 / 人文 / 我的，70+ 张本地照片，深色模式
- **内置搜索引擎**：27 组同义词（搜「妃子笑」也能命中荔枝）、分类筛选、命中高亮、搜索历史、耗时统计、随便逛逛
- **动效层**：跑马灯、动态图册（WebP 逐帧短片）、飘叶、滚动进度条、hero 视差，可在「我的 → 设置 → 动效」一键关掉
- **PWA**：manifest + Service Worker + 图标，手机上「添加到主屏幕」后像 App 一样全屏打开，离线也能看
- **微信小程序外壳**：`miniprogram/` 用 `web-view` 承载网页版（`miniprogram/pages/index/index.js` 里把 `SITE` 换成上面的在线地址）

## 打开方式

- 直接看：双击 `index.html`
- 本地起服务（推荐，图片懒加载与分享卡更正常）：

```powershell
# 在项目目录下，任选一个
python -m http.server 8123
# 然后浏览器打开 http://127.0.0.1:8123/index.html
```

## 目录

```
index.html            外壳：顶部搜索层、内容区 #view、底部 5 个 tab、详情面板 #sheet
style.css             全部样式（配色 / 手机壳 / 动效 / 深色模式）
app.js                全部逻辑与内容数据（IIFE，无依赖）
manifest.webmanifest  PWA 清单（名称、图标、快捷方式）
sw.js                 Service Worker：首屏预缓存 + 同源 stale-while-revalidate
assets/               图片：xxx.jpg 长边 1400，xxx-s.jpg 宽 640 缩略图
assets/motion/        maoming.webp 动态图册（560×350，60 帧）+ poster.jpg 封面
assets/icons/         192 / 512 / apple-touch 图标
miniprogram/          原生微信小程序（8 个页面，与网页版同素材）
miniprogram-webview/  旧的 web-view 外壳（保留备用）
```

## 五个 tab

| tab | 内容 |
| --- | --- |
| 首页 | 封面、四个数字、五棵树一条鱼产业矩阵、今日一物（按日期轮换）、四季时令、必去打卡、一桌菜、三条路线、怎么到茂名 |
| 好物 | 10 个农产品（荔枝 / 化橘红 / 储良龙眼 / 沉香 / 三华李 / 香蕉 / 罗非鱼 / 水东芥菜 / 怀乡鸡 / 高凉菜），按佳果、南药、水产、山林、一桌菜分类 |
| 游玩 | 手绘示意图 + 10 个景点（第一滩、放鸡岛、浪漫海岸、冼太庙、好心湖、博贺渔港、窦州古城、御水古温泉、晏镜岭、贡园） |
| 人文 | 时间轴、六张非遗名片（年例 / 飘色 / 冼夫人信俗 / 跳花棚 / 木偶戏 / 荔枝花）、四段故事、茂名话、夜色 |
| 我的 | 昵称与积分等级、每日签到、收藏（好物 / 景点 / 故事 / 路线）、夜间模式、清除本机数据 |
| 品种图谱 | 从首页横幅或好物页底部进入：荔枝 12 个品种、化州糖水 10 碗、博贺海味 8 样、籺 6 种、高凉菜 8 道、化橘红 4 类、龙眼 4 种、牛杂 6 样 |

## 品种与种类（KINDS）

每个好物详情页里都有一节「品种与种类」，数据在 `app.js` 的 `KINDS` 里，按物种 id 分组：

```js
KINDS = {
  lychee: [ { n: '白糖罂', t: '5月下旬—6月上旬', d: '茂名招牌，皮薄、蜜甜、核小。' }, … ],
  tangshui: [ { n: '香芋椰汁西米', t: '夏夜', d: '化州糖水铺的常驻款。' }, … ],
  …
}
```

- `n` 名称、`t` 时令或等级、`d` 一句话说明
- 在 `ATLAS` 数组里加一项 `{ id, name, unit, kicker, sub, kind }`，品种图谱页就会多出一段
- 品种条目同时进入搜索索引（分类显示为「品种」），搜「糯米糍」「南风螺」「灰水籺」都能直达

## 交互

- 点卡片 → 底部弹出详情：大图、关键数字、一年时令条、细说、小提示、收藏 / 生成分享卡
- 收藏 +2 分、签到 +10 分、收藏路线 +3 分，每 50 分升一级（荔乡新人 → 山海边民 → 高凉食客 → 好心使者 → 茂名通）
- 分享卡：canvas 画一张 900×1200 的竖版卡片；`file://` 下浏览器会禁止导出，页面会提示长按截图
- 夜间模式、搜索层（热门词直接点）、数字滚动、滚动淡入
- 数据只存本机 `localStorage`，键名 `maoming.v2`

## 搜索怎么做的

`app.js` 里先把好物 / 景点 / 味道 / 人文 / 非遗 / 时令 / 方言 / 路线 / 行程 / 年表全部压成一条条索引 `IDX`，每条带 `title / sub / tags / text / alias`。

打分规则：标题完全相同 120 · 标题前缀 84 · 标题包含 58 · 标签命中 30 · 同义词命中 26 · 正文包含 12；多个关键词是 AND 关系，命中后按分数和分类顺序排，命中的字用 `<mark>` 高亮。

## 部署到 GitHub Pages

1. 把整个目录推到仓库（默认分支 `main`）
2. 仓库 → Settings → Pages → Source 选 `Deploy from a branch`，Branch 选 `main` / `(root)`，保存
3. 一两分钟后访问 `https://<用户名>.github.io/<仓库名>/`
4. 换成自己的域名：Settings → Pages → Custom domain

## 做成微信小程序

miniprogram/ 是**原生小程序**工程，不是 web-view 外壳。

1. 微信开发者工具 → 导入项目 → 目录选 miniprogram/
2. AppID：project.config.json 里默认填了本机缓存账号的 AppID，换成自己的即可；没有就去公众平台注册一个
3. 「详情 → 本地设置」勾选**不校验合法域名**（图片来自 GitHub Pages 的 https 地址）；正式发布前把 jenifferjsosa-coder.github.io 加进 downloadFile 合法域名，或把图片搬到自家 CDN
4. 渲染引擎保持 `webview`（`app.json` 里的 `renderer` 字段）
5. 预览：工具右上角「预览」扫码；发布：右上角「上传」→ 公众平台「版本管理」提交审核

页面：首页 / 好物 / 游玩 / 人文 / 我的（tabBar 五页）+ 品种图谱 / 详情 / 搜索（跳转页）。
数据在 `miniprogram/utils/data.js`（从网页版 `app.js` 抽取），改文案先改网页版再重新生成。
头像与简介文案见 [小程序资料.md](小程序资料.md)。

## 评论模块（测试版，未接入正式页面）

`miniprogram/` 里带一套微信云开发的评论模块，依附于已有内容（一条内容一组评论），**没有发帖入口、没有话题流、只做纯文本**。

| 位置 | 内容 |
| --- | --- |
| `miniprogram/components/comment-section/` | 评论组件：列表（顶层 + 楼中楼）、输入 200 字、回复、点赞、删除、举报 |
| `miniprogram/cloudfunctions/` | `listComments` / `submitComment` / `likeComment` / `deleteComment` 四个云函数 |
| `miniprogram/pages/comment-demo/` | 测试页，不改正式页面就能验证全部功能 |
| `miniprogram/database-rules/` | `comments`、`comment_likes`、`config`、`admins` 的安全规则 |
| `miniprogram/docs/评论区部署说明.md` | 部署步骤、管理员开启、审核模式切换、接入详情页 |

要点：

- 发布评论走云函数，内部调 `security.msgSecCheck` 做内容安全校验，命中即拦截
- 审核模式在 `config/commentSetting.auditMode` 里切：`after` 先发后审（默认）、`before` 先审后发
- 点赞用 `comment_likes` 独立集合记 `openid + commentId`，配合唯一索引防重复
- 删除：本人只能删自己的，管理员（`admins` 集合或云函数环境变量 `ADMINS`）可删任意
- 客户端对这几个集合只读，写操作全部收归云函数

部署前先把 `miniprogram/app.js` 里的 `ENV_ID` 换成自己的云开发环境 ID。
