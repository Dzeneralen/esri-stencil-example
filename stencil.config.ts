import { sass } from "@stencil/sass";
import { Config } from "@stencil/core";

export const config: Config = {
  commonjs: {
    namedExports: {
      "node_modules/esri-loader/dist/umd/esri-loader.js": [
        "getScript",
        "isLoaded",
        "loadModules",
        "loadScript",
        "loadCss",
        "utils"
      ]
    }
  },
  plugins: [sass()],
  devServer: {
    root: "www"
  }
};
