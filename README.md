# dsh-client-ui-theme-taffy — 永雏塔菲主题

为 DeepSeek Harness（dsh）Web 界面提供永雏塔菲（AceTaffy）配色与场景背景的主题插件。Github中也已有相关的美化主题插件，功能更加完善，因而本主题仅为自用，设计仅符合个人美学

<p align="center">
  <img src="docs/screenshot-dark.png" width="720" alt="暗色主题">
  <br><sub>暗色主题</sub>
</p>

<p align="center">
  <img src="docs/screenshot-light.png" width="720" alt="浅色主题">
  <br><sub>浅色主题</sub>
</p>

## 素材来源

全部素材取自 [永雏塔菲图片站 (image.acetaffy.org)](https://image.acetaffy.org/) 与
[永雏塔菲百科 (acetaffy.org)](https://acetaffy.org/)，构建时内联为 data URI，离线可用、不依赖热链。

| 原始文件 | 来源（图片站路径） | 用途 |
| --- | --- | --- |
| `assets/art-dark.jpg` | `装扮&收藏集/永雏塔菲/背景图/image1_landscape.jpg`（夜空） | 暗色全屏背景 |
| `assets/art-light.jpg` | `装扮&收藏集/永雏塔菲/背景图/image3_landscape.jpg`（粉玫瑰） | 浅色全屏背景 |
| `assets/icons/LOGO96_URI.png` | 永雏塔菲百科官方 logo | 标签页 favicon |
| `assets/icons/EMO_HERO_URI.png` | 表情包「闪亮登场」 | 首页吉祥物 |
| `assets/icons/EMO_SEND_URI.png` | 表情包「星星眼」 | 发送按钮 |
| `assets/icons/EMO_HEADER_URI.png` | 表情包「嘻嘻喵」 | 会话头部头像 |

## 美化特性

在完整覆盖 `--dsw-*` 语义色（light / dark / system 三态照常工作）之外，主题还叠加了以下非颜色维度的装饰，全部遵循「美而不伤可用」的原则：

- **代码高亮**：覆盖 `--shiki-token-*`，把默认蓝绿语法色换成玫瑰/薰衣草系（keyword 用品牌粉 `#FD779E`），同时保留关键字/字符串/函数之间的语义色相区分，保证代码仍可读。
- **主题可选化**：在「设置 → 通用」里注册一行「永雏塔菲主题」开关（`settings.general.item`），持久化到 `localStorage`，默认开启；关闭即卸载 token 覆盖层、场景背景、粒子与装饰，回退到原版外观。
- **动效**：hero 吉祥物浮动、五角星水印 twinkle、发送按钮 hover 光晕、头部药丸 hover 轻抬、吉祥物进场淡入。所有动效统一包在 `@media (prefers-reduced-motion: no-preference)` 内，尊重系统「减少动态」设置。
- **漂浮粒子/星屑**：`setArtVars` 注入 `[data-taffy-particles]` 全屏容器 + 若干逐颗漂浮闪烁的星屑（`pointer-events:none`、`z-index:0`，位于场景之上、内容之下）；reduced-motion 下静止为低透明度星点。
- **首屏 hero**：吉祥物放大加柔光、蓝色光晕椭圆改为塔菲粉、headline 下方注入「永雏塔菲 · AceTaffy」签名副标题。
- **渐变滚动条**：thumb 从纯粉改为「发色粉 → 薰衣草」渐变。
- **对比度微调**：caption / dimmed / tertiary 等弱对比标签色做了适度加深/提亮，保持柔和粉调的同时守住可读性。

> 说明：`--shiki-foreground` / `--shiki-background` 未覆盖——上游 `shiki.css` 已把它们别名到 `--dsw-alias-markdown-code-block`，随主题 token 层自动跟随，无需重复声明。

## 安装

```
dsh plugin --profile web add /path/to/dsh-theme-taffy
```

并在 `~/.dsh/profiles/web/cordis.patch.yml` 的 insert 列表加入 roster 行：

```yaml
- insert:
    - id: taffy-theme
      name: 'dsh-client-ui-theme-taffy'
```

重启 web 服务生效。

## 构建

```
node scripts/build.mjs   # 读取 assets/ + src/client.template.js，生成 lib/client.js
```
