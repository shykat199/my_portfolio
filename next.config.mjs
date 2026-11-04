const blogApi = process.env.BLOG_API_URL ? new URL(process.env.BLOG_API_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    formats: ["image/avif", "image/webp"],
    // Blog cover images are served by the admin panel (BLOG_API_URL).
    remotePatterns: blogApi ? [{ protocol: blogApi.protocol.replace(":", ""), hostname: blogApi.hostname, port: blogApi.port, pathname: "/storage/**" }] : [],
    // In development the admin panel runs on localhost, which Next.js otherwise refuses to fetch images from.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
