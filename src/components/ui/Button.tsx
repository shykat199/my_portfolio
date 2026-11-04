import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-accent text-surface hover:bg-accent-strong",
  secondary: "border border-fg/25 text-fg hover:border-fg hover:bg-fg/[0.06]",
};

const icons = {
  calendar: "M8 3v3M16 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM9 14l2 2 4-4",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  icon?: keyof typeof icons;
};

export function Button({ variant = "primary", icon, className = "", href, children, ...props }: ButtonProps) {
  const isExternal = typeof href === "string" && href.startsWith("http");

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-center text-[0.95rem] font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {icon === "calendar" && <ButtonIcon path={icons.calendar} className="size-[1.1em]" />}
      {children}
      {icon === "arrow" && (
        <ButtonIcon
          path={icons.arrow}
          className="size-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

function ButtonIcon({ path, className }: { path: string; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}
