import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-accent text-surface hover:bg-accent-strong",
  secondary: "border border-fg/25 text-fg hover:border-fg hover:bg-fg/[0.06]",
};

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className = "", href, ...props }: ButtonProps) {
  const isExternal = typeof href === "string" && href.startsWith("http");

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-center text-[0.95rem] font-medium transition-colors duration-200 ${variants[variant]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
