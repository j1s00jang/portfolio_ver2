import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tanstackStart({
            server: {
                entry: "server",
            },
        }),
        // Always emit Build Output API (`.vercel/output`) — Vercel's `vercel build`
        // may run vite without VERCEL=1, so don't rely on env auto-detection.
        nitro({ preset: "vercel" }),
        react(),
        tsconfigPaths(),
        tailwindcss(),
    ],
});
