"use client";

import type React from "react";

type ShareQrButtonProps = {
  /** The id of the QR code's <svg>. */
  qrId: string;
  label: string;
  fileName: string;
  title: string;
  text: string;
  url: string;
  className?: string;
  /** Visible text next to the icon; without it the button is icon-only. */
  children?: React.ReactNode;
};

const PNG_SIZE = 1024;

/** Turns the QR code's SVG into a PNG file, so it can be shared as a picture. */
async function qrAsPng(svg: SVGSVGElement, fileName: string) {
  const markup = new XMLSerializer().serializeToString(svg);
  const source = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }));

  try {
    const image = new Image();
    image.src = source;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = PNG_SIZE;
    canvas.getContext("2d")?.drawImage(image, 0, 0, PNG_SIZE, PNG_SIZE);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    return blob ? new File([blob], fileName, { type: "image/png" }) : null;
  } finally {
    URL.revokeObjectURL(source);
  }
}

function download(file: File) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

/**
 * Opens the phone's share menu with the QR code as a picture. Where pictures
 * can't be shared, it shares the link instead; on computers without a share
 * menu, it downloads the picture.
 */
export function ShareQrButton({ qrId, label, fileName, title, text, url, className = "", children }: ShareQrButtonProps) {
  async function share() {
    const svg = document.getElementById(qrId);
    if (!(svg instanceof SVGSVGElement)) return;

    try {
      const file = await qrAsPng(svg, fileName);
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title, text });
      } else if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
      } else if (file) {
        download(file);
      }
    } catch (error) {
      // Closing the share menu is not an error.
      if (!(error instanceof DOMException && error.name === "AbortError")) console.error("Could not share the QR code", error);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={children ? undefined : label}
      title={label}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-fg/25 transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      {children}
    </button>
  );
}
