// const withBabelMinify = require('next-babel-minify')()
// module.exports = withBabelMinify({
//   webpack(config, options) {
//     return config
//   }
// })

const TerserPlugin = require("terser-webpack-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  env: {},
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          parallel: true,
          sourceMap: false,
          terserOptions: {
            compress: {
              dead_code: true,
              drop_debugger: true,
              drop_console: true,
              warnings: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ];
    }
    return config;
  },
});
