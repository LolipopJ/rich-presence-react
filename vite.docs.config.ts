import { mergeConfig } from "vite";

import viteBaseConfig from "./vite.base.config";

export default mergeConfig(viteBaseConfig, {
  build: {
    outDir: "dist-docs",
  },
});
