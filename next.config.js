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


    // This doesn't change anything
    // 
    // if (dev && !isServer) {
    //   config.module.rules.push({
    //     test: /\.(ts|tsx)$/,
    //     loader: 'hot-self-accept-loader',
    //     include: [path.join(dir, 'pages')],
    //     options: {
    //       extensions: /\.(ts|tsx)$/
    //     }
    //   })
    // }


    // This does work:
    //
    if (dev && !isServer) {
      const HMR = config.module.rules.find(r => r.loader === "hot-self-accept-loader")
      if (HMR) {
        HMR.test = /\.(ts|tsx)$/
        HMR.options.extensions = /\.(ts|tsx)$/
      }
    }

    return config
  },
}

module.exports = currentExport
