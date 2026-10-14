# China Table · 中国家常食谱

英文为主、中英双语的静态食谱网站。支持部署到 Cloudflare Pages，源码放在 GitHub。网站本身不需要付费模板、数据库、服务器或 AI API。

网站已通过 Cloudflare Pages 发布：**[https://china-table.pages.dev](https://china-table.pages.dev)**。源码位于 **[stare911/-](https://github.com/stare911/-)** 的 `main` 分支，自动部署已启用。无需重复创建项目或上传源码。

## 已包含

- 100 道菜、200 个中英独立菜谱页面，涵盖蔬菜、肉类、海鲜、汤粥和面饭。
- 新增50道中有10道“海外中餐入门”选择，参考海外中餐菜单类型，不代表所有人的口味；首页可单独筛选。
- 食谱每页展示 12 道，支持前后翻页；搜索与筛选会检查全部 100 道菜。
- 菜名、食材和拼音搜索；30 分钟以内、素食和地域筛选。
- 浏览器本地收藏；人数调整；克/盎司、毫升/液体盎司换算；食材勾选；打印布局。
- 食材指南、内容说明、隐私说明和图片授权署名页。
- Recipe JSON-LD；生成正式 canonical、hreflang 和 sitemap，网址匹配 Cloudflare 的无扩展名页面路径。
- AdSense 验证与自动广告开关，默认关闭。

配方为 AI 辅助编辑内容，尚未实际试做。站内已如实说明，不含虚构评分、作者经历或试做证言。配图为 32 张授权参考照片和 68 张明确标注的 AI 生成菜品成品示意图。署名与授权在 `src/credits.json`、`src/credits-extras.json` 和站内图片来源页。申请广告审核前需要进行内容核查，不能保证审核或收入。

小红书公开检索与页面读取未取得笔记正文，本版不声称取自小红书。现有 6 道菜的部分技法参考实际读取的 The Woks of Life 和 Made With Lau 创作者网页，链接显示在相应菜谱中；并非原作者背书、配方完整复现或本站实测。详见 `research/食谱来源核查.md`。

## 本地运行

需要 Node.js 20 或更新版本。没有第三方依赖，无须 `npm install`。

```powershell
npm run build
npm run check
npm run preview
```

浏览器打开 `http://127.0.0.1:4173`。停止预览按 Ctrl+C。
也可以直接打开 `dist/index.html` 查看静态页面。搜索和部分存储行为以 HTTP 预览为准，不同浏览器对本地文件的存储规则不同。

## Cloudflare Pages + GitHub（部署设置留档）

当前项目名为 `china-table`，下列流程用于查看配置或将来重新部署。现有项目已经上线。

1. 使用已上传的仓库 `stare911/-`。如果将来另建仓库，免费计划可以使用公开或私有仓库。
2. 当前源码和必需图片已放在仓库根部。`qa/`、凭据和临时文件未上传；`dist/` 由构建生成，也无须上传。
3. 在 Cloudflare 创建 Pages 项目并连接这个 GitHub 仓库，授权时只选择所需仓库。
4. 生产分支选择 `main`；框架预设选择 `None`；构建命令填 `npm run build`；输出目录填 `dist`；项目根目录使用仓库根目录。
5. 如构建环境需要指定版本，添加 `NODE_VERSION` = `24`。不要启用付费 Functions、Workers 或数据库服务；本项目只使用静态文件。
6. 部署后获得 `https://实际项目名.pages.dev`。项目名是否可用由平台决定。
7. 把该真实网址写到 `site.config.mjs` 的 `siteUrl`，并填写自己的联系邮箱 `contactEmail`。提交修改会触发重新部署。
8. 重新部署后检查 `/sitemap.xml`、`/robots.txt`、中英切换和菜谱页。将站点地图提交到 Google Search Console，收录与排名由 Google 决定。

官方参考：[GitHub 集成](https://developers.cloudflare.com/pages/get-started/git-integration/)、[免费额度](https://developers.cloudflare.com/pages/platform/limits/)。截至 2026-10-13，Pages 免费版每月 500 次构建、最多 20,000 个文件、单个文件最大 25 MiB；以平台最新规则为准。本项目没有在线注册、付费 API 或服务器功能，免费配置适合首版。

## 修改内容

- 配方：`src/recipes.mjs`（原有 6 道）和 `src/recipes-extra.mjs`（新增 44 道）。英文和中文同时更新，食材格式在文件首部有说明。
- 页面模板、文字和食材指南：`scripts/build.mjs`。
- 外观：`public/assets/styles.css`。
- 互动：`public/assets/app.js`。
- 联系方式、正式网址、广告编号：`site.config.mjs`。
- 图片：`public/assets/`；新增图片映射在 `src/image-map.json`，署名在两个 credits 文件中。示意图须保持 `illustration: true`，不能冒充实拍。
- 技法参考：`src/recipe-references.json`；仅记录实际读取过的资料。

修改后运行 `npm run build` 和 `npm run check`。输出文件会更新；不要直接修改 `dist/` 来长期维护内容。

## AdSense

完整操作见 [AdSense接入说明.md](AdSense接入说明.md)。无需购买广告插件。

填写真实 `publisherId` 后，构建会生成所有页面的验证 meta 标签和根目录 `ads.txt`；即使广告开关关闭，也能进行网站验证。正式开启广告前，需要完成内容核查、隐私说明和适用的同意管理。编号、网址或同意状态缺失时，构建会拒绝启用广告。

本项目不包含真实 AdSense 编号。网站已经通过 Cloudflare Pages 上线，尚未提交 Google 广告审核，广告仍然关闭。所有广告状态以实际 AdSense 后台为准。

## 授权

项目代码见 LICENSE（MIT）。第三方照片分别遵循 `src/credits.json` 所列的 Creative Commons 授权，MIT 不覆盖这些照片。修改或重新分发照片时，请遵守各自的署名与相同方式共享条件。配方正文为本项目编写的 AI 辅助草稿，不复制第三方食谱文章全文。
