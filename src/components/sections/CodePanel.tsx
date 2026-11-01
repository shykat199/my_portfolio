import type { CSSProperties } from "react";
import { site } from "@content/site";

const { code } = site.hero;

function lineStyle(line: number) {
  return { "--line": line } as CSSProperties;
}

export function CodePanel() {
  const lines = [
    <span key="comment" className="text-code-comment">{`// ${code.comment}`}</span>,
    <span key="open">
      <span className="text-accent">const</span> website = {"{"}
    </span>,
    ...code.entries.map((entry) => (
      <span key={entry.key}>
        {"  "}
        {entry.key}: <span className="text-warm">&quot;{entry.value}&quot;</span>,
      </span>
    )),
    <span key="close">{"};"}</span>,
    <span key="call">
      <span className="text-accent">launch</span>(website);
    </span>,
  ];

  return (
    <figure
      role="img"
      aria-label={code.description}
      className="overflow-hidden rounded-2xl border border-fg/10 bg-code font-mono text-[0.8rem] leading-[1.8] text-fg shadow-[0_30px_80px_-30px_rgb(94_224_174/0.35)] sm:text-sm sm:leading-[1.8]"
    >
      <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-error" />
        <span className="size-2.5 rounded-full bg-warm" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="ml-2 text-xs text-code-comment">{code.fileName}</span>
      </div>

      <ol className="px-4 py-5 sm:px-5">
        {lines.map((line, index) => (
          <li key={index} style={lineStyle(index)} className="code-line flex whitespace-pre">
            <span className="hidden w-8 shrink-0 text-code-comment/70 select-none sm:block">{index + 1}</span>
            {line}
          </li>
        ))}
      </ol>

      <div
        style={lineStyle(lines.length)}
        className="code-line flex items-center gap-2 border-t border-fg/10 px-4 py-3 text-xs text-accent sm:px-5"
      >
        <span className="size-1.5 rounded-full bg-accent" />
        {code.status}
        <span className="code-cursor h-3.5 w-1.5 bg-accent" />
      </div>
    </figure>
  );
}
