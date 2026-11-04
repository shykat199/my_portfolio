import { renderIcon } from "@/lib/icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iPhones round the corners themselves, so the built-in icon is a full square.
export default function AppleIcon() {
  return renderIcon(size.width, { round: false });
}
