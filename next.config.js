const path = require("path")

const currentExport = {
  pageExtensions: ["jsx", "js", "ts", "tsx"],
  webpack: (config, options) => {
    const { dir, defaultLoaders, dev, isServer } = options
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ".json"]

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [dir],
      exclude: /node_modules/,
      use: [defaultLoaders.babel],
    })

    return config
  },
}

module.exports = currentExport
