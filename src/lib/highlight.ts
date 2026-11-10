import { createHighlighter, type BundledLanguage } from "shiki";

const THEME = "one-dark-pro";

/** Languages coloured in articles; any other code block is shown as plain text. */
const LANGUAGES = [
  "tsx", "typescript", "jsx", "javascript", "json", "html", "css", "bash", "shellscript",
  "php", "blade", "sql", "yaml", "markdown", "diff", "xml", "python", "dotenv", "nginx",
] as const satisfies BundledLanguage[];

/** Short names writers use in Markdown (```ts) mapped to the language above. */
const ALIASES: Record<string, string> = { ts: "typescript", js: "javascript", sh: "bash", shell: "bash", zsh: "bash", md: "markdown", yml: "yaml", env: "dotenv", py: "python" };

/** Labels in the code block's title bar. */
const LABELS: Record<string, string> = { typescript: "TypeScript", javascript: "JavaScript", tsx: "TSX", jsx: "JSX", bash: "Terminal", shellscript: "Terminal", dotenv: ".env" };

// Created once and reused, because loading the themes and languages is slow.
let highlighter: ReturnType<typeof createHighlighter> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighter({ themes: [THEME], langs: [...LANGUAGES] });
  return highlighter;
}

function decodeEntities(text: string) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'")
    .replace(/&amp;/g, "&");
}

/** Handled by CopyCodeButtons, which copies the code next to it. */
const COPY_BUTTON =
  '<button type="button" class="code-block-copy" data-copy-code aria-label="Copy code">' +
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
  '<span data-copy-label>Copy</span></button>';

const CODE_BLOCK = /<pre><code(?: class="language-([\w+#.-]+)")?>([\s\S]*?)<\/code><\/pre>/g;

/**
 * Colours every code block in an article like a code editor, with a title bar
 * showing the language. Runs on the server, so visitors download no extra
 * JavaScript. Shiki escapes the code again, so the output stays safe.
 */
export async function highlightCode(html: string) {
  if (!html.includes("<pre><code")) return html;

  const shiki = await getHighlighter();
  const loaded = shiki.getLoadedLanguages();

  return html.replace(CODE_BLOCK, (_, language: string | undefined, code: string) => {
    const requested = (language ?? "").toLowerCase();
    const name = ALIASES[requested] ?? requested;
    const lang = loaded.includes(name) ? name : "text";
    const label = LABELS[name] ?? (requested ? requested.toUpperCase() : "Code");
    const highlighted = shiki.codeToHtml(decodeEntities(code).replace(/\n$/, ""), { lang, theme: THEME });

    return `<div class="code-block"><div class="code-block-bar"><span class="code-block-dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="code-block-actions"><span class="code-block-lang">${label}</span>${COPY_BUTTON}</span></div>${highlighted}</div>`;
  });
}
