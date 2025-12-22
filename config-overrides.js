const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: function override(config) {
    config.plugins.push(
      new NodePolyfillPlugin({
        excludeAliases: ["console"],
      })
    );
    return config;
  },

  devServer: function overrideDevServer(configFn) {
    return function (proxy, allowedHost) {
      // Shim CRA's expected devServer.close() on webpack-dev-server v5 instances
      try {
        const WebpackDevServer = require("webpack-dev-server");
        if (
          WebpackDevServer &&
          WebpackDevServer.prototype &&
          typeof WebpackDevServer.prototype.stop === "function" &&
          typeof WebpackDevServer.prototype.close !== "function"
        ) {
          WebpackDevServer.prototype.close = WebpackDevServer.prototype.stop;
        }
      } catch (e) {
        // no-op if require fails
      }

      const config = configFn(proxy, allowedHost);

      // Remove deprecated v4 hooks rejected by wds v5 schema
      if (config.onBeforeSetupMiddleware) {
        delete config.onBeforeSetupMiddleware;
      }
      if (config.onAfterSetupMiddleware) {
        delete config.onAfterSetupMiddleware;
      }

      // Migrate deprecated `https`/`http2` to webpack-dev-server v5 `server` option
      if (Object.prototype.hasOwnProperty.call(config, "https")) {
        const httpsOption = config.https;
        if (httpsOption) {
          if (typeof httpsOption === "object") {
            config.server = { type: "https", options: httpsOption };
          } else {
            config.server = "https";
          }
        } else {
          config.server = "http";
        }
        delete config.https;
      }
      if (Object.prototype.hasOwnProperty.call(config, "http2")) {
        delete config.http2;
      }

      // Ensure setupMiddlewares exists for wds v5
      if (!config.setupMiddlewares) {
        config.setupMiddlewares = (middlewares) => middlewares;
      }

      return config;
    };
  },
};

