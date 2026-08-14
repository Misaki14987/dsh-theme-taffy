#!/usr/bin/env node
/**
 * 把 src/client.template.js 里的占位符替换为内联 data-URI，生成 lib/client.js。
 *
 * 素材源（原始文件，可随时替换后重新构建）：
 *   assets/art-dark.jpg            → __ART_DARK_URI__  （暗色全屏背景）
 *   assets/art-light.jpg           → __ART_LIGHT_URI__ （浅色全屏背景）
 *   assets/icons/LOGO96_URI.png    → __LOGO96_URI__
 *   assets/icons/LOGO48_URI.png    → __LOGO48_URI__
 *   assets/icons/EMO_HERO_URI.png  → __EMO_HERO_URI__
 *   assets/icons/EMO_SEND_URI.png  → __EMO_SEND_URI__
 *   assets/icons/EMO_HEADER_URI.png→ __EMO_HEADER_URI__
 *
 * 用法：node scripts/build.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = join(root, "src", "client.template.js");
const outPath = join(root, "lib", "client.js");

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };

const sources = {
	__ART_DARK_URI__: join(root, "assets", "art-dark.jpg"),
	__ART_LIGHT_URI__: join(root, "assets", "art-light.jpg"),
	__LOGO96_URI__: join(root, "assets", "icons", "LOGO96_URI.png"),
	__LOGO48_URI__: join(root, "assets", "icons", "LOGO48_URI.png"),
	__EMO_HERO_URI__: join(root, "assets", "icons", "EMO_HERO_URI.png"),
	__EMO_SEND_URI__: join(root, "assets", "icons", "EMO_SEND_URI.png"),
	__EMO_HEADER_URI__: join(root, "assets", "icons", "EMO_HEADER_URI.png"),
};

let out = readFileSync(templatePath, "utf8");

for (const [name, path] of Object.entries(sources)) {
	const bytes = readFileSync(path);
	const mime = MIME[extname(path).toLowerCase()];
	if (!mime) throw new Error(`未知图片格式：${path}`);
	const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;
	const marker = `/*${name}*/`;
	if (!out.includes(marker)) throw new Error(`模板中未找到占位符 ${marker}`);
	out = out.split(marker).join(JSON.stringify(dataUri));
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, out);
console.log(`✓ 生成 ${outPath}（${(out.length / 1024).toFixed(0)} KB）`);
