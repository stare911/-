# Google AdSense 接入说明

目前广告关闭，没有配置任何真实发布商编号。接入不需要付费插件或 AdSense API。查看收入直接使用 Google AdSense 后台。

## 第一步：上线内容

先通过 Cloudflare Pages 发布网站，拿到真实网址。核查配方用量、译文、熟度提示、图片授权，并在 `site.config.mjs` 填写 `siteUrl` 和自己的 `contactEmail`。本项目 6 道配方尚未实际试做，网站有明确说明；它是首版内容，不是“保证通过广告审核”的成品。Google 没有在本文引用的申请要求中承诺“满多少篇必通过”。

## 第二步：注册和添加网站

前往 [AdSense](https://adsense.google.com/start/)，用自己的 Google 账号注册，填写真实账户和付款资料。在“网站”里添加你的网址。

Google 允许公共后缀列表中平台的子域名作为网站添加，`pages.dev` 在该列表中；依据这两项规则，可以提交实际的 `你的项目.pages.dev`。实际能否添加和通过审核，以后台结果为准。[网站类型规则](https://support.google.com/adsense/answer/12170421?hl=en)、[公共后缀列表](https://publicsuffix.org/list/public_suffix_list.dat)。

## 第三步：填写发布商编号

从 AdSense 复制自己的 `ca-pub-` 开头编号，修改 `site.config.mjs`：

```javascript
adsense: {
  publisherId: 'ca-pub-这里替换为你自己的16位数字',
  enabled: false,
  consentReady: false
}
```

这段是填写示意，不能把文字占位符当成正式编号。不要提供 Google 密码、验证码、银行资料或 API 密钥；发布商编号属于会出现在公开网页中的标识。

提交到 GitHub 触发重新部署。编号格式正确时，构建会自动：

- 在所有网页的 `<head>` 放置 `google-adsense-account` 验证标签。
- 在网站根目录生成 `ads.txt`，其中使用不带 `ca-` 的 `pub-` 编号。
- 保持广告脚本关闭，直到你完成后续配置。

检查 `https://你的实际站名.pages.dev/ads.txt` 是否显示 Google 提供的那一行内容。`ads.txt` 是 Google 强烈推荐的配置，不是普遍强制要求。[官方 ads.txt 指南](https://support.google.com/adsense/answer/12171612?hl=zh-Hans)。

## 第四步：验证并申请审核

回到 AdSense，选择 meta 标签或 ads.txt 验证方式，点击“验证”，然后“申请审核”。正式网站必须公开可访问，不能被密码、错误的 robots.txt 或错误页面挡住。等待网站状态变成可展示广告的“就绪”。通过技术验证不代表通过内容审核。[官方添加与审核流程](https://support.google.com/adsense/answer/12169212?hl=zh-Hans)。

## 第五步：配置隐私与同意管理

面向欧洲经济区、英国和瑞士投放广告时，Google 要求使用经认证的同意管理平台。可以在 AdSense 的“隐私权和消息”里配置 Google 的方案。针对实际访客地区完成适用设置，并核对启用广告后的隐私说明。[Google 同意管理要求](https://support.google.com/adsense/answer/13554116?hl=zh-Hans)。

`consentReady` 只是本项目的发布确认开关，不是同意管理平台，不会代替 Cookie 同意消息，也不会自动认证你的配置。

## 第六步：开启广告

内容审核通过、真实网址正确、隐私和同意设置完成后，把配置改成：

```javascript
adsense: {
  publisherId: 'ca-pub-你自己的真实编号',
  enabled: true,
  consentReady: true
}
```

再次提交部署。构建会在所有网页加载 Google 提供的自动广告脚本，并更新站内隐私说明。进入 AdSense 的“广告”，编辑对应网站，启用“自动广告”，预览后应用到网站。建议先控制广告投放量，避免覆盖食材和操作步骤。[自动广告设置](https://support.google.com/adsense/answer/9261307?hl=zh-Hans)。

只填写编号或添加 `ads.txt` 不会自动产生收入。网站审核、广告设置、有效展示与真实访客都需要实际完成。

## 查看收入

登录 AdSense：

- 首页：今天、昨天、本月至今的估算收入、余额和最近一笔付款。
- 报告 → 网站：当前食谱网站的收入和页面浏览数据。
- 付款相关的交易页面：最终结算与付款记录。

估算收入可能调整，最终收入以结算为准。[首页收入说明](https://support.google.com/adsense/answer/32852?hl=zh-Hans)、[网站报告](https://support.google.com/adsense/answer/9973395?hl=zh-Hans)。
