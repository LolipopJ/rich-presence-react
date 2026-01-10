import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "RichPresenceReact",
        fileName: "rich-presence-react",
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
