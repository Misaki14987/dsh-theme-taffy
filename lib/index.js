/**
 * Host half of the 永雏塔菲 (AmaTaffy) web theme plugin.
 *
 * This row exists so the web profile's client roster can carry the package:
 * the host half is a pass-through cordis plugin and every piece of the theme
 * lives in the browser half (`lib/client.js`), which stacks a Taffy token
 * layer over the active palette via `ctx.theme.overrideTokens` and injects a
 * small decoration stylesheet (pink selection, gold-eye focus ring, star
 * watermark, night-sky glows).
 */

export const name = "client-ui-theme-taffy";

/** Host side has nothing to do — the browser half owns the theme. */
export function apply() {}
