/**
 * 永雏塔菲 (AceTaffy) web theme — browser half.
 *
 * 全屏场景背景（暗 / 浅双主题）+ 遮罩 + 半透明面板；素材内联为 data URI，
 * 运行时转 Blob URL（超长 data URI 会被浏览器丢弃）。
 */

window.__ModuleLoader__.load({
	id: "dsh-client-ui-theme-taffy",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		let react = require("react");
		let jsxRuntime = require("react/jsx-runtime");
		//#region lib/types/client/assets.js
		/** Layer source: this package id, pinned by the theme seat. */
		const LAYER_SOURCE = "dsh-client-ui-theme-taffy";

		/**
		 * 官方「背景图」素材，内联为 data URI（场景图，非角色立绘）：
		 *  - ART_DARK_URI：image1_landscape（1260×1260 夜空场景），暗色主题背景。
		 *  - ART_LIGHT_URI：image3_landscape（1260×1260 粉玫瑰场景），浅色主题背景。
		 *  - LOGO / EMO：延续旧版的官方 logo 与表情包图标。
		 */
		const ART_DARK_URI = /*__ART_DARK_URI__*/;
		const ART_LIGHT_URI = /*__ART_LIGHT_URI__*/;
		const LOGO96_URI = /*__LOGO96_URI__*/;
		const LOGO48_URI = /*__LOGO48_URI__*/;
		const EMO_HERO_URI = /*__EMO_HERO_URI__*/;
		const EMO_SEND_URI = /*__EMO_SEND_URI__*/;
		const EMO_HEADER_URI = /*__EMO_HEADER_URI__*/;

		/** 背景场景的焦点与构图参数（cover 裁切时保留主体）。 */
		const ART = {
			dark: "50% 45%",
			light: "50% 45%",
		};
		//#endregion
		//#region lib/types/client/tokens.js
		/**
		 * Alias-token 覆盖层 `{ light, dark }`，叠加在激活配色之上。
		 * 与旧版一致，保证 light / dark / system 三态照常工作。
		 */
		const TOKENS = {
			// ── surfaces ─────────────────────────────────────────────────────────
			"--dsw-alias-bg-base": { light: "#FFF9FB", dark: "#21172B" },
			"--dsw-alias-bg-layer-1": { light: "#FFFDFE", dark: "#291D36" },
			"--dsw-alias-bg-layer-2": { light: "#FDF1F6", dark: "#30223F" },
			"--dsw-alias-bg-layer-3": { light: "#FBE8F0", dark: "#382A49" },
			"--dsw-alias-bg-module-platform": { light: "#FDF1F6", dark: "#312440" },
			"--dsw-alias-bg-multi-select": { light: "#FBE8F0", dark: "#3A2D4A" },
			"--dsw-alias-bg-overlay": { light: "#FBE7EF", dark: "#2C2038" },
			"--dsw-alias-bg-skeleton": { light: "rgba(253, 119, 158, 0.10)", dark: "rgba(255, 255, 255, 0.08)" },
			"--dsw-alias-bg-mask-1": { light: "rgba(60, 20, 45, 0.24)", dark: "rgba(0, 0, 0, 0.50)" },
			"--dsw-alias-bg-mask-2": { light: "rgba(60, 20, 45, 0.12)", dark: "rgba(0, 0, 0, 0.20)" },
			"--dsw-alias-bg-mask-3": { light: "rgba(60, 20, 45, 0.48)", dark: "rgba(0, 0, 0, 0.55)" },
			"--dsw-alias-bg-mask-photo": { light: "rgba(20, 8, 15, 0.88)", dark: "rgba(10, 5, 15, 0.88)" },
			"--dsw-alias-bg-mask-drop": { light: "rgba(255, 255, 255, 0.70)", dark: "rgba(33, 23, 43, 0.70)" },
			// ── borders ─────────────────────────────────────────────────────────
			"--dsw-alias-border-inverted": { light: "rgba(255, 255, 255, 0.60)", dark: "rgba(0, 0, 0, 0.28)" },
			"--dsw-alias-border-inverted2": { light: "rgba(255, 255, 255, 0.50)", dark: "rgba(0, 0, 0, 0.32)" },
			"--dsw-alias-border-l1": { light: "rgba(253, 119, 158, 0.12)", dark: "rgba(255, 255, 255, 0.07)" },
			"--dsw-alias-border-l2-darkmode-thin": { light: "rgba(253, 119, 158, 0.14)", dark: "rgba(255, 255, 255, 0.07)" },
			"--dsw-alias-border-l2": { light: "rgba(253, 119, 158, 0.22)", dark: "rgba(253, 119, 158, 0.16)" },
			"--dsw-alias-border-l3": { light: "rgba(253, 119, 158, 0.30)", dark: "rgba(253, 119, 158, 0.24)" },
			"--dsw-alias-border-l4": { light: "rgba(253, 119, 158, 0.38)", dark: "rgba(253, 119, 158, 0.34)" },
			// ── brand ───────────────────────────────────────────────────────────
			"--dsw-alias-brand-primary": { light: "#E25480", dark: "#FD779E" },
			"--dsw-alias-brand-primary-invert": { light: "#FFFFFF", dark: "#21172B" },
			"--dsw-alias-brand-primary-new-colorprimary-new-color": { light: "#FD779E", dark: "#FD779E" },
			"--dsw-alias-brand-text": { light: "#B6456B", dark: "#FFD9E4" },
			// ── buttons ─────────────────────────────────────────────────────────
			"--dsw-alias-button-contrast-fill": { light: "#B6456B", dark: "#FFD9E4" },
			"--dsw-alias-button-elevated-fill": { light: "#FFFFFF", dark: "#302244" },
			"--dsw-alias-button-floating-fill": { light: "#FFFFFF", dark: "#302244" },
			"--dsw-alias-button-floating-hover": { light: "#FDF1F6", dark: "#3A2B4E" },
			"--dsw-alias-button-ghost-active-border": { light: "#FD9AB8", dark: "#FD9AB8" },
			"--dsw-alias-button-ghost-active-fill": { light: "#FBE8F0", dark: "#3A2B4E" },
			"--dsw-alias-button-ghost-active-hover": { light: "#F8DCE8", dark: "#443356" },
			"--dsw-alias-button-info-fill": { light: "#3FA9E0", dark: "#6BB8F2" },
			"--dsw-alias-button-info-hover": { light: "#2E99D6", dark: "#4FA6EC" },
			"--dsw-alias-button-primary-dimmed": { light: "#FBE8F0", dark: "#452C3E" },
			"--dsw-alias-button-primary-fill": { light: "#ED6A93", dark: "#FD779E" },
			"--dsw-alias-button-primary-hover": { light: "#E25A87", dark: "#FF8FAD" },
			"--dsw-alias-button-tool-bar-fill": { light: "rgba(253, 119, 158, 0.25)", dark: "rgba(253, 119, 158, 0.22)" },
			"--dsw-alias-button-tool-bar-fill-invisible": { light: "rgba(253, 119, 158, 0.12)", dark: "rgba(253, 119, 158, 0.14)" },
			"--dsw-alias-button-tool-bar-hover": { light: "rgba(253, 119, 158, 0.35)", dark: "rgba(253, 119, 158, 0.32)" },
			// ── interactive ─────────────────────────────────────────────────────
			"--dsw-alias-interactive-bg-active": { light: "rgba(253, 119, 158, 0.14)", dark: "rgba(253, 119, 158, 0.16)" },
			"--dsw-alias-interactive-bg-hover": { light: "rgba(253, 119, 158, 0.08)", dark: "rgba(253, 119, 158, 0.10)" },
			"--dsw-alias-interactive-bg-hover-accent": { light: "rgba(253, 119, 158, 0.16)", dark: "rgba(253, 119, 158, 0.18)" },
			"--dsw-alias-interactive-bg-hover-danger": { light: "rgba(229, 72, 77, 0.08)", dark: "rgba(255, 107, 122, 0.16)" },
			"--dsw-alias-interactive-bg-hover-solid": { light: "#FDF1F6", dark: "#382B4A" },
			// ── labels ──────────────────────────────────────────────────────────
			"--dsw-alias-label-caption": { light: "#97788F", dark: "#A894B0" },
			"--dsw-alias-label-dimmed": { light: "#C6A8BB", dark: "#7A6684" },
			"--dsw-alias-label-primary": { light: "#3A2438", dark: "#FDEFF4" },
			"--dsw-alias-label-primary-bluish": { light: "#C2507A", dark: "#FFB8CF" },
			"--dsw-alias-label-primary-dimmed": { light: "#2E1B2C", dark: "#F6DCE6" },
			"--dsw-alias-label-primary-foreground": { light: "#FFFFFF", dark: "#21172B" },
			"--dsw-alias-label-primary-inverted": { light: "#FFFFFF", dark: "#21172B" },
			"--dsw-alias-label-secondary": { light: "#7C5F75", dark: "#CBB3C6" },
			"--dsw-alias-label-tertiary": { light: "#97788F", dark: "#A894B0" },
			// ── markdown ────────────────────────────────────────────────────────
			"--dsw-alias-markdown-citation": { light: "#FBE8F0", dark: "#382B4A" },
			"--dsw-alias-markdown-code-block": { light: "#FDF1F6", dark: "#1C1326" },
			"--dsw-alias-markdown-code-block-banner": { light: "#FBE8F0", dark: "#291D36" },
			"--dsw-alias-markdown-code-segment-selected": { light: "#FFFFFF", dark: "#443453" },
			"--dsw-alias-markdown-code-segment-unselected": { light: "#FBE8F0", dark: "#2A1E36" },
			"--dsw-alias-markdown-inline-code": { light: "#FBE8F0", dark: "#3A2B4A" },
			"--dsw-alias-markdown-placeholder": { light: "#FDF1F6", dark: "#2E2338" },
			"--dsw-alias-markdown-tag": { light: "#FBE8F0", dark: "#382C46" },
			// ── shiki syntax highlight — pink-mauve, hue-separated for legibility ──
			// (foreground/background 已由 base shiki.css 别名到 markdown-code-block，
			//  这里只覆盖 token 语义色：keyword 用品牌粉 #FD779E，其余保持在各自色相内
			//  向玫瑰/薰衣草偏，既统一又保留「关键字/字符串/函数」的语义区分。)
			"--shiki-token-constant": { light: "#1F6FB8", dark: "#7CC8F7" },
			"--shiki-token-string": { light: "#2F8A5B", dark: "#8CE99A" },
			"--shiki-token-comment": { light: "#9C7A8C", dark: "#A98AA0" },
			"--shiki-token-keyword": { light: "#C23B74", dark: "#FD779E" },
			"--shiki-token-parameter": { light: "#C0563F", dark: "#FFA94D" },
			"--shiki-token-function": { light: "#7A4FB0", dark: "#C4A5F5" },
			"--shiki-token-string-expression": { light: "#2F8A5B", dark: "#8CE99A" },
			"--shiki-token-punctuation": { light: "#6E5A76", dark: "#CBB3C6" },
			"--shiki-token-link": { light: "#B6456B", dark: "#FFB8CF" },
			// ── scrollbar — her hair-pink thumb ─────────────────────────────────
			"--dsw-alias-scrollbar-bg-l1": { light: "#F4C3D4", dark: "#4A3A58" },
			"--dsw-alias-scrollbar-bg-l2": { light: "#F4C3D4", dark: "#5A4668" },
			"--dsw-alias-scrollbar-hover-l1": { light: "#FD779E", dark: "#FD779E" },
			"--dsw-alias-scrollbar-hover-l2": { light: "#F76894", dark: "#FF8FAD" },
			// ── states ──────────────────────────────────────────────────────────
			"--dsw-alias-state-business-primary": { light: "#3FA9E0", dark: "#7CC8F7" },
			"--dsw-alias-state-business-tertiary": { light: "#E3F2FD", dark: "#2C4560" },
			"--dsw-alias-state-error-primary": { light: "#E5484D", dark: "#FF6B7A" },
			"--dsw-alias-state-error-secondary": { light: "#F2555A", dark: "#FF8A96" },
			"--dsw-alias-state-success-primary": { light: "#2FBF8F", dark: "#4FD99B" },
			"--dsw-alias-state-success-secondary": { light: "#4FD9A8", dark: "#6BE3AF" },
			"--dsw-alias-state-success-tertiary": { light: "#E1F7EF", dark: "#1E4A36" },
			"--dsw-alias-state-warn-label": { light: "#C77D12", dark: "#F5C242" },
			"--dsw-alias-state-warn-primary": { light: "#E8A33D", dark: "#F0B53C" },
			"--dsw-alias-state-warn-secondary": { light: "#F0B95E", dark: "#F7C95E" },
			"--dsw-alias-state-warn-tertiary": { light: "#FDF3E0", dark: "#4A3A1E" },
			// ── overlays ────────────────────────────────────────────────────────
			"--dsw-alias-toast-bg": { light: "#594560", dark: "#3B2C4C" },
			"--dsw-alias-tooltip-bg": { light: "#594560", dark: "#3B2C4C" },
			// ── dsw-specific surfaces ───────────────────────────────────────────
			"--dsw-specific-bubble": { light: "#FDEBF2", dark: "#332642" },
			"--dsw-specific-bubble-highlight": { light: "#FAD8E6", dark: "#443454" },
			"--dsw-specific-input-major": { light: "#FFFFFF", dark: "#291D36" },
			"--dsw-specific-login-input": { light: "#FFF9FB", dark: "#241A2E" },
			"--dsw-specific-menu": { light: "#FBE8F0", dark: "#382A49" },
			"--dsw-specific-selector": { light: "#FDF1F6", dark: "#312440" },
			"--dsw-specific-sidebar-fill": { light: "#FFF3F8", dark: "#1E1527" },
			"--dsw-specific-sidebar-nav-item-active": { light: "#FBE3EC", dark: "#3A2B4A" },
			"--dsw-specific-sidebar-nav-item-active-accent": { light: "#FD779E", dark: "#FD779E" },
			"--dsw-specific-sidebar-nav-item-hover": { light: "#FDF1F6", dark: "#2E2338" },
			"--dsw-specific-tip": { light: "#FDF1F6", dark: "#312440" },
			// ── composite helpers ───────────────────────────────────────────────
			"--dsw-linear-gradient-think": { light: "linear-gradient(180deg, #FFFFFF 20.19%, rgba(255, 255, 255, 0) 100%)", dark: "linear-gradient(180deg, #291D36 20.19%, rgba(41, 29, 54, 0) 100%)" },
			"--dsw-linear-think-select": { light: "linear-gradient(180deg, #FDF1F6 20.19%, rgba(253, 241, 246, 0) 100%)", dark: "linear-gradient(180deg, #382B4A 20.19%, rgba(56, 43, 74, 0) 100%)" },
			"--dsw-shadow-lv1": { light: "0 2px 4px 0 rgba(253, 119, 158, 0.16)", dark: "0 2px 4px 0 rgba(253, 119, 158, 0.14)" },
			"--dsw-shadow-lv1-blur": { light: "0 4px 12px 0 rgba(253, 119, 158, 0.06)", dark: "0 4px 12px 0 rgba(253, 119, 158, 0.08)" },
			"--dsw-shadow-lv2": { light: "0 4px 12px 0 rgba(253, 119, 158, 0.08), 0 2px 8px 0 rgba(253, 119, 158, 0.12)", dark: "0 4px 12px 0 rgba(253, 119, 158, 0.10), 0 2px 8px 0 rgba(253, 119, 158, 0.16)" },
			"--dsw-shadow-lv3": { light: "0 0 1px 0 rgba(0, 0, 0, 0.20), 0 0 4px 0 rgba(253, 119, 158, 0.06), 0 12px 32px 0 rgba(253, 119, 158, 0.16)", dark: "0 0 1px 0 rgba(0, 0, 0, 0.50), 0 0 4px 0 rgba(253, 119, 158, 0.10), 0 12px 32px 0 rgba(253, 119, 158, 0.22)" }
		};
		//#endregion
		//#region lib/types/client/icons.js
		/** Kawaii pink Taffy-style replacement icons (16px grid, her hair gradient). */
		const NEW_CHAT_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><defs><linearGradient id="taffyGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FD779E"/><stop offset="1" stop-color="#EAB5DD"/></linearGradient></defs><path fill="url(#taffyGrad)" d="M3.1 2.3h9.8a1.7 1.7 0 0 1 1.7 1.7v4.5a1.7 1.7 0 0 1-1.7 1.7H7.1l-2.9 2.15a.55.55 0 0 1-.88-.46V10.4A2.1 2.1 0 0 1 1.9 8.5V4a1.7 1.7 0 0 1 1.7-1.7h-.5Z"/><path fill="#FFFFFF" d="M8 4.6c-.42-.6-1.55-.95-2.2-.3-.72.72.15 1.85 1.25 2.7.4.32.63.42.95.46.32-.04.55-.14.95-.46 1.1-.85 1.97-1.98 1.25-2.7-.65-.65-1.78-.3-2.2.3Z"/></svg>';
		//#endregion
		//#region lib/types/client/decor.js
		/**
		 * 装饰样式：全屏场景背景 + 遮罩、半透明面板、发色粉选区 / 聚焦环 /
		 * 滚动条、五角星水印，以及由 DOM decorator 接线的 icon 装饰。
		 */
		const DECOR_CSS = [
			// ── 基础装饰 ─────────────────────────────────────────────────────────
			"html[data-dsh-taffy-skin] ::selection{background:rgba(253,119,158,0.88);color:#FFFFFF}",
			"html[data-dsh-taffy-skin] :focus-visible{outline-color:#FD779E}",
			"html[data-dsh-taffy-skin] ::-webkit-scrollbar-thumb{border-radius:999px}",
			"html[data-dsh-taffy-skin] ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#FD779E,#EAB5DD) !important}",
			"html[data-dsh-taffy-skin] ::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#FF8FAD,#F2C6E8) !important}",
			// ── 全屏场景背景（暗/浅各一张）───────────────────────────────────────
			"html[data-dsh-taffy-skin] body{background-color:var(--dsw-alias-bg-base);background-size:cover;background-attachment:fixed;background-repeat:no-repeat}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme]{background-image:var(--taffy-art-dark);background-position:var(--taffy-art-dark-position,50% 45%)}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]){background-image:var(--taffy-art-light);background-position:var(--taffy-art-light-position,50% 45%)}",
			// 让三栏 frame 透明，背景场景从后方透出
			"html[data-dsh-taffy-skin] [class*=\"frame\"]{background:transparent !important}",
			// ── 侧栏：半透明；显式高于 body 氛围层，避免会话切换时被压到后方 ────────
			"html[data-dsh-taffy-skin] [class*=\"sidebarCol\"]{position:relative;z-index:2;isolation:isolate}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme] [class*=\"sidebarCol\"]{background:linear-gradient(180deg,rgba(30,21,39,0.78),rgba(33,23,43,0.68)) !important;border-right:1px solid rgba(253,119,158,0.16) !important}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [class*=\"sidebarCol\"]{background:linear-gradient(180deg,rgba(255,243,248,0.74),rgba(255,249,251,0.64)) !important;border-right:1px solid rgba(253,119,158,0.20) !important}",
			// ── 会话根（active / settling 磨砂半透明，hero 全透明）──────────────
			"html[data-dsh-taffy-skin] [data-phase=\"active\"],html[data-dsh-taffy-skin] [data-phase=\"settling\"]{-webkit-backdrop-filter:blur(16px) saturate(108%);backdrop-filter:blur(16px) saturate(108%)}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme] [data-phase=\"active\"],html[data-dsh-taffy-skin] body[data-ds-dark-theme] [data-phase=\"settling\"]{background:rgba(33,23,43,0.86) !important}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [data-phase=\"active\"],html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [data-phase=\"settling\"]{background:rgba(255,249,251,0.86) !important}",
			"html[data-dsh-taffy-skin] [data-phase=\"hero\"]{position:relative;background:transparent !important}",
			// hero 安全区遮罩：中心文字区轻微压暗/提亮，边缘露出场景；
			// 遮罩位于内容之下（内容 z-index 1 抬升），保证文字可读
			"html[data-dsh-taffy-skin] [data-phase=\"hero\"]::after{content:\"\";position:absolute;inset:0;pointer-events:none;z-index:0}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme] [data-phase=\"hero\"]::after{background:radial-gradient(ellipse 74% 58% at 50% 46%,rgba(33,23,43,0.60),rgba(33,23,43,0.30) 56%,rgba(33,23,43,0.06) 100%)}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [data-phase=\"hero\"]::after{background:radial-gradient(ellipse 74% 58% at 50% 46%,rgba(255,249,251,0.64),rgba(255,249,251,0.32) 56%,rgba(255,249,251,0.06) 100%)}",
			"html[data-dsh-taffy-skin] [data-phase=\"hero\"] > *{position:relative;z-index:1}",
			// ── 头部：磨砂半透明 ───────────────────────────────────────────────
			"html[data-dsh-taffy-skin] [data-phase] [class*=\"header\"]{-webkit-backdrop-filter:blur(14px) saturate(108%);backdrop-filter:blur(14px) saturate(108%)}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme] [data-phase] [class*=\"header\"]{background:rgba(41,29,54,0.72) !important}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [data-phase] [class*=\"header\"]{background:rgba(255,253,254,0.72) !important}",
			// ── 输入区：seat 透明，card 用高不透明磨砂面隔开背景文字 ─────────────
			"html[data-dsh-taffy-skin] [data-composer-seat]{background:transparent !important}",
			"html[data-dsh-taffy-skin] [data-composer-card]{-webkit-backdrop-filter:blur(20px) saturate(112%);backdrop-filter:blur(20px) saturate(112%);box-shadow:0 12px 36px rgba(20,10,30,0.20),0 0 0 1px rgba(253,119,158,0.08) !important}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme] [data-composer-card]{background:rgba(41,29,54,0.92) !important;border-color:rgba(253,119,158,0.28) !important}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [data-composer-card]{background:rgba(255,253,254,0.92) !important;border-color:rgba(253,119,158,0.30) !important}",
			// ── 消息气泡：半透明，透出背景 ─────────────────────────────────────
			"html[data-dsh-taffy-skin] [class*=\"bubble\"]{box-shadow:0 8px 24px rgba(0,0,0,0.08)}",
			"html[data-dsh-taffy-skin] body[data-ds-dark-theme] [class*=\"bubble\"]{background:rgba(48,34,63,0.72) !important}",
			"html[data-dsh-taffy-skin] body:not([data-ds-dark-theme]) [class*=\"bubble\"]{background:rgba(253,235,242,0.72) !important}",
			// ── hero 吉祥物 ─────────────────────────────────────────────────────
			// hero 吉祥物：放大 + 柔光；浮动/进场动画统一放进 reduced-motion 媒体查询
			"[data-taffy-hero-img]{width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 0 10px rgba(253,119,158,0.45))}",
			"@keyframes taffy-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}",
			"@keyframes taffy-rise{from{opacity:0}to{opacity:1}}",
			"@keyframes taffy-twinkle{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:0.95;transform:scale(1.15)}}",
			// ── hero 首屏：蓝色光晕 → 塔菲粉；签名副标题 ─────────────────────────
			"html[data-dsh-taffy-skin] [class*=\"heroGlow\"] ellipse{fill:#FD779E}",
			"[data-taffy-signature]{text-align:center;font-size:12px;line-height:18px;letter-spacing:.12em;color:var(--dsw-alias-label-caption);font-weight:500}",
			// ── 发送按钮 → 塔菲表情包铺满整个按钮 ────────────────────────────────
			"html[data-dsh-taffy-skin] button[aria-label=\"发送消息\"],html[data-dsh-taffy-skin] button[aria-label=\"Send message\"]{background:linear-gradient(135deg,#FD779E,#E85C8A) !important;transition:box-shadow .25s ease,transform .15s ease}",
			"html[data-dsh-taffy-skin] button[aria-label=\"发送消息\"]:hover:not(:disabled),html[data-dsh-taffy-skin] button[aria-label=\"Send message\"]:hover:not(:disabled){background:linear-gradient(135deg,#FF8FAD,#F0659B) !important;box-shadow:0 0 0 4px rgba(253,119,158,0.28),0 6px 18px rgba(253,119,158,0.45);transform:translateY(-1px)}",
			"html[data-dsh-taffy-skin] button[aria-label=\"发送消息\"] img,html[data-dsh-taffy-skin] button[aria-label=\"Send message\"] img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}",
			// ── 右下角：渐变五角星水印 ─────────────────────────────────────────
			"[data-taffy-star]{position:fixed;right:18px;bottom:14px;width:16px;height:16px;background:linear-gradient(135deg,#FD779E,#EAB5DD);clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);opacity:0.5;pointer-events:none;z-index:2147483647;filter:drop-shadow(0 0 6px rgba(253,119,158,0.8))}",
			// ── 头部药丸：hover 轻抬 + 柔光 ─────────────────────────────────────
			"[data-taffy-header]{transition:transform .2s ease,box-shadow .2s ease}",
			"[data-taffy-header]:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(253,119,158,0.35)}",
			// ── 漂浮粒子：DOM 注入的星屑，逐颗漂浮/闪烁（reduced-motion 下静止）──
			"[data-taffy-particles]{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}",
			"[data-taffy-particle]{position:absolute;border-radius:50%;background:radial-gradient(circle at 50% 50%,#FD779E 0%,#EAB5DD 55%,rgba(234,181,221,0) 100%);opacity:var(--p-opacity,0.45);filter:drop-shadow(0 0 3px rgba(253,119,158,0.6))}",
			"@keyframes taffy-float{0%{transform:translateY(20px) translateX(0);opacity:0}30%{opacity:var(--p-opacity,0.45)}70%{opacity:var(--p-opacity,0.45)}100%{transform:translateY(-52px) translateX(8px);opacity:0}}",
			// ── 动效：统一尊重 prefers-reduced-motion ───────────────────────────
			"@media (prefers-reduced-motion: no-preference){[data-taffy-hero-img]{animation:taffy-bob 3.2s ease-in-out infinite,taffy-rise .6s ease-out both}[data-taffy-star]{animation:taffy-twinkle 4.5s ease-in-out infinite}[data-taffy-particle]{animation-name:taffy-float;animation-timing-function:linear;animation-iteration-count:infinite;animation-fill-mode:both}}"
		].join("\n");
		/** Inject the decoration stylesheet once, claimed by the plugin CSS inventory. */
		function injectDecor() {
			const tagId = "dsh-client-ui-theme-taffy/decor.css";
			if (typeof document === "undefined") return;
			if (document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`) !== null) return;
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-client-ui-theme-taffy";
			tag.dataset.pluginCss = tagId;
			tag.textContent = DECOR_CSS;
			document.head.appendChild(tag);
		}
		/** Official 永雏塔菲百科 logo as the tab favicon. */
		function setFavicon() {
			if (typeof document === "undefined") return;
			const href = LOGO96_URI;
			let found = false;
			for (const link of document.querySelectorAll('link[rel~="icon"]')) {
				link.href = href;
				found = true;
			}
			if (!found) {
				const link = document.createElement("link");
				link.rel = "icon";
				link.href = href;
				document.head.appendChild(link);
			}
		}
		/**
		 * 把 data URI 转成 Blob URL。浏览器会丢弃超长（>~2MB）的 data URI
		 * CSS 变量值，导致 `background-image` 解析为 `none`；Blob URL 只有几十
		 * 字节，图片字节在内存里只解码一次。
		 */
		function dataUriToBlobUrl(dataUri) {
			if (typeof URL === "undefined" || typeof URL.createObjectURL !== "function") return dataUri;
			const comma = dataUri.indexOf(",");
			if (comma < 0) return dataUri;
			const mime = /^data:([^;,]+)/.exec(dataUri.slice(0, comma))?.[1] || "image/jpeg";
			const binary = atob(dataUri.slice(comma + 1));
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
			return URL.createObjectURL(new Blob([bytes], { type: mime }));
		}
		/**
		 * 把背景场景 / 构图参数写成 CSS 变量，并挂上 `data-dsh-taffy-skin` 门控属性。
		 * 右下角的水印五角星也在这里一次性注入。
		 */
		function setArtVars() {
			if (typeof document === "undefined") return;
			const root = document.documentElement;
			root.setAttribute("data-dsh-taffy-skin", "");
			const darkUrl = dataUriToBlobUrl(ART_DARK_URI);
			const lightUrl = dataUriToBlobUrl(ART_LIGHT_URI);
			root.style.setProperty("--taffy-art-dark", `url("${darkUrl}")`);
			root.style.setProperty("--taffy-art-dark-position", ART.dark);
			root.style.setProperty("--taffy-art-light", `url("${lightUrl}")`);
			root.style.setProperty("--taffy-art-light-position", ART.light);
			// 五角星水印
			if (document.querySelector('[data-taffy-star]') === null) {
				const star = document.createElement("div");
				star.setAttribute("data-taffy-star", "");
				star.setAttribute("aria-hidden", "true");
				document.body.appendChild(star);
			}
			// 漂浮粒子层
			injectParticles();
		}
		/** 漂浮星屑：固定全屏容器 + 若干逐颗漂浮的粒子（reduced-motion 下静止）。 */
		function injectParticles() {
			if (typeof document === "undefined") return;
			if (document.querySelector('[data-taffy-particles]') !== null) return;
			const wrap = document.createElement("div");
			wrap.setAttribute("data-taffy-particles", "");
			wrap.setAttribute("aria-hidden", "true");
			// [left%, top%, size(px), duration(s), opacity]
			const seeds = [
				[15, 22, 3, 9, 0.5], [72, 12, 2, 11, 0.4], [86, 62, 3, 8, 0.45],
				[38, 74, 2, 12, 0.5], [56, 36, 3, 10, 0.4], [24, 54, 2, 9, 0.45],
				[62, 88, 3, 11, 0.5], [45, 8, 2, 10, 0.4], [8, 40, 2, 12, 0.45],
				[92, 30, 3, 9, 0.5], [30, 90, 2, 11, 0.4], [78, 80, 3, 10, 0.45]
			];
			for (let i = 0; i < seeds.length; i += 1) {
				const [x, y, size, dur, op] = seeds[i];
				const p = document.createElement("span");
				p.setAttribute("data-taffy-particle", "");
				p.style.left = x + "%";
				p.style.top = y + "%";
				p.style.width = size + "px";
				p.style.height = size + "px";
				p.style.setProperty("--p-opacity", String(op));
				p.style.animationDuration = dur + "s";
				p.style.animationDelay = (-((i * 7) % 13) / 4).toFixed(2) + "s";
				wrap.appendChild(p);
			}
			document.body.appendChild(wrap);
		}
		/** 关闭主题时撤掉皮肤门控、场景变量与注入的装饰 DOM。 */
		function unmountSkinDom() {
			if (typeof document === "undefined") return;
			const root = document.documentElement;
			root.removeAttribute("data-dsh-taffy-skin");
			root.style.removeProperty("--taffy-art-dark");
			root.style.removeProperty("--taffy-art-dark-position");
			root.style.removeProperty("--taffy-art-light");
			root.style.removeProperty("--taffy-art-light-position");
			document.querySelector('[data-taffy-star]')?.remove();
			document.querySelector('[data-taffy-particles]')?.remove();
		}
		// 只在工厂作用域注入样式表（让模块系统的样式清单接管它）；
		// 皮肤的实际启用（favicon / 门控 / 粒子 / 五角星）由 apply 按开关状态挂载。
		injectDecor();
		//#endregion
		//#region lib/types/client/decorator.js
		/**
		 * DOM decorator：把壳层吉祥物 / icon 换成塔菲素材。沿用可读的
		 * CSS-module 类名片段（构建间稳定）与 aria-label；每处 idempotent。
		 * 挂载与 DOM 变更时反复应用，会话切换 / 侧栏折叠后仍生效。
		 */
		function decorate() {
			if (typeof document === "undefined") return;
			// Hero（无会话）吉祥物：鱼 → 塔菲表情包。
			const hitbox = document.querySelector('[class*="fishHitbox"]');
			if (hitbox) {
				if (!hitbox.dataset.taffyHero) {
					hitbox.dataset.taffyHero = "1";
					const svg = hitbox.querySelector("svg");
					if (svg) svg.style.display = "none";
					if (hitbox.querySelector('[data-taffy-hero-img]') === null) {
						const img = document.createElement("img");
						img.src = EMO_HERO_URI;
						img.dataset.taffyHeroImg = "1";
						img.alt = "";
						img.setAttribute("draggable", "false");
						hitbox.prepend(img);
					}
				}
				// hero 签名副标题：在 headline 与 body 之间插入一行签名（idempotent）。
				const headline = hitbox.parentElement;
				const body = headline?.nextElementSibling;
				const stack = headline?.parentElement;
				if (stack && body && stack.querySelector('[data-taffy-signature]') === null) {
					const sig = document.createElement("div");
					sig.setAttribute("data-taffy-signature", "");
					sig.setAttribute("aria-hidden", "true");
					sig.textContent = "永雏塔菲 · AceTaffy";
					stack.insertBefore(sig, body);
				}
			}
			// New Session icon → kawaii pink chat bubble.
			const newBtn = document.querySelector('[class*="newSession"]');
			if (newBtn && !newBtn.dataset.taffyNewChat) {
				newBtn.dataset.taffyNewChat = "1";
				const svg = newBtn.querySelector("svg");
				if (svg) {
					const wrap = document.createElement("span");
					wrap.innerHTML = NEW_CHAT_SVG;
					svg.replaceWith(wrap.firstElementChild);
				}
			}
			// Composer send icon → kawaii white paper plane (pink button).
			const sendBtn = document.querySelector('button[aria-label="发送消息"], button[aria-label="Send message"]');
			if (sendBtn && !sendBtn.dataset.taffySend) {
				sendBtn.dataset.taffySend = "1";
				const svg = sendBtn.querySelector("svg");
				if (svg) {
					const img = document.createElement("img");
					img.src = EMO_SEND_URI;
					img.alt = "";
					img.setAttribute("draggable", "false");
					img.style.cssText = "width:100%;height:100%;border-radius:50%;object-fit:cover;display:block";
					svg.replaceWith(img);
				}
			}
			// Collapsed rail fish logo → Taffy official logo（保留原类名以沿用显隐逻辑）.
			const railFish = document.querySelector('[class*="railFish"]');
			if (railFish && railFish.tagName !== "IMG" && !railFish.dataset.taffyRail) {
				const img = document.createElement("img");
				img.src = LOGO48_URI;
				img.alt = "";
				img.setAttribute("draggable", "false");
				img.className = railFish.getAttribute("class") || "";
				img.dataset.taffyRail = "1";
				img.style.cssText = "width:24px;height:24px;object-fit:contain;display:block";
				railFish.replaceWith(img);
			}
		}
		/** Watch the app tree and keep the decorations applied. */
		function startDecorator() {
			if (typeof document === "undefined" || typeof MutationObserver === "undefined") return () => {};
			decorate();
			const observer = new MutationObserver(() => decorate());
			observer.observe(document.body, { childList: true, subtree: true });
			return () => observer.disconnect();
		}
		//#endregion
		//#region lib/types/client/header-action.js
		/** Session-header pill: Taffy avatar + link to the 雏草姬百科. */
		function TaffyHeaderAction() {
			return jsxRuntime.jsxs("a", {
				href: "https://acetaffy.org/",
				target: "_blank",
				rel: "noreferrer noopener",
				title: "永雏塔菲百科 · acetaffy.org",
				"data-taffy-header": "",
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 6,
					height: 28,
					padding: "0 10px 0 6px",
					borderRadius: 999,
					background: "var(--dsw-alias-interactive-bg-hover)",
					color: "var(--dsw-alias-label-primary)",
					textDecoration: "none",
					fontSize: 12,
					lineHeight: "20px",
					fontWeight: 500,
					whiteSpace: "nowrap",
					boxSizing: "border-box"
				},
				children: [jsxRuntime.jsx("img", {
					key: "taffy-avatar",
					src: EMO_HEADER_URI,
					width: 20,
					height: 20,
					alt: "",
					style: { display: "block", borderRadius: 6, flex: "none" }
				}), jsxRuntime.jsx("span", {
					key: "taffy-name",
					children: "永雏塔菲"
				})]
			});
		}
		//#endregion
		//#region lib/types/client/index.js
		/** Required services: the theme seat and the slots registry. */
		const inject = ["theme", "slots"];
		/** 主题开关的 localStorage 键与默认值（默认开启）。 */
		const SKIN_STORAGE_KEY = "dsh-client-ui-theme-taffy:enabled";
		function readPersistedEnabled() {
			try {
				const v = localStorage.getItem(SKIN_STORAGE_KEY);
				if (v === null) return true;
				return v !== "0" && v !== "false";
			} catch {
				return true;
			}
		}
		function writePersistedEnabled(v) {
			try {
				localStorage.setItem(SKIN_STORAGE_KEY, v ? "1" : "0");
			} catch { /* 无 localStorage（如隐私模式）下仅本次会话生效 */ }
		}
		/** 皮肤开关状态 + 变更监听（工厂作用域单例）。 */
		let skinEnabled = readPersistedEnabled();
		const skinListeners = new Set();
		function setSkinEnabled(v) {
			if (skinEnabled === v) return;
			skinEnabled = v;
			writePersistedEnabled(v);
			for (const fn of skinListeners) fn(v);
		}
		/**
		 * 挂载整块皮肤：favicon + 场景门控/粒子/五角星 + token 覆盖层 +
		 * DOM 装饰器 + 头部药丸。返回对应 disposer。
		 */
		function mountSkin(ctx) {
			setFavicon();
			setArtVars();
			const disposeLayer = ctx.theme.overrideTokens(LAYER_SOURCE, TOKENS);
			const disposeDecor = startDecorator();
			const disposePill = ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "taffy-link",
				order: 30
			}, TaffyHeaderAction));
			return () => {
				disposePill();
				disposeDecor();
				disposeLayer();
				unmountSkinDom();
			};
		}
		/** 外观（General）设置行：一个持久化的「永雏塔菲主题」开关。 */
		function TaffyToggleRow() {
			const [enabled, setEnabled] = react.useState(() => skinEnabled);
			return jsxRuntime.jsxs("div", {
				style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%" },
				children: [jsxRuntime.jsx("span", {
					style: { fontSize: 14, lineHeight: "20px", color: "var(--dsw-alias-label-primary)" },
					children: "永雏塔菲主题"
				}), jsxRuntime.jsx("button", {
					type: "button",
					"aria-pressed": enabled,
					"data-taffy-toggle": "",
					onClick: () => {
						const next = !enabled;
						setEnabled(next);
						setSkinEnabled(next);
					},
					style: {
						appearance: "none",
						border: "1px solid var(--dsw-alias-border-l3)",
						background: enabled ? "var(--dsw-alias-button-primary-fill)" : "var(--dsw-alias-bg-overlay)",
						color: enabled ? "var(--dsw-alias-label-primary-inverted)" : "var(--dsw-alias-label-secondary)",
						width: 44,
						height: 24,
						borderRadius: 999,
						cursor: "pointer",
						position: "relative",
						transition: "background .2s ease",
						fontSize: 12,
						lineHeight: 1,
						padding: 0
					},
					children: jsxRuntime.jsx("span", {
						style: {
							display: "block",
							width: 18,
							height: 18,
							borderRadius: "50%",
							background: "#FFFFFF",
							position: "absolute",
							top: 2,
							left: enabled ? 23 : 2,
							transition: "left .2s ease",
							boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
						}
					})
				})]
			});
		}
		/** 注册外观开关行；settings.general.item 未声明时 inject 会静默等待，不抛错。 */
		function installToggleRow(ctx) {
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "taffy-theme-toggle",
				order: 20
			}, TaffyToggleRow));
		}
		/**
		 * Client plugin body: 按持久化开关挂载/卸载皮肤，并注册外观开关行。
		 * @param ctx - client root context.
		 * @returns disposer removing the token layer、observer 与开关监听。
		 */
		function apply(ctx) {
			let disposeSkin = () => {};
			const mount = () => { disposeSkin = mountSkin(ctx); };
			if (skinEnabled) mount();
			const onToggle = (v) => {
				if (v) mount();
				else { disposeSkin(); disposeSkin = () => {}; }
			};
			skinListeners.add(onToggle);
			installToggleRow(ctx);
			return () => {
				skinListeners.delete(onToggle);
				disposeSkin();
			};
		}
		//#endregion
		exports.inject = inject;
		exports.apply = apply;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
