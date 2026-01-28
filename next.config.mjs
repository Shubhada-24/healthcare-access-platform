import { fileURLToPath } from "node:url";

/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {
    // Pin Turbopack to this project root (Windows-safe).
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
};

export default nextConfig;

