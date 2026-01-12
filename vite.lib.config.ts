import { resolve } from "path";
import { mergeConfig } from "vite";
import dts from "vite-plugin-dts";

import viteBaseConfig from "./vite.base.config";

export default mergeConfig(viteBaseConfig, {
  plugins: [dts({ outDir: "dist", insertTypesEntry: true, rollupTypes: true })],
  build: {
    minify: false,
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
        exports: "named",
      },
    },
  },
});
