const webpack = require('webpack');

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : '/',
  configureWebpack: {
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true
    },
    devtool: process.env.NODE_ENV === 'coverage' ? 'eval' : undefined,
    performance: {
      hints: false
    },
    plugins: [
      new webpack.EnvironmentPlugin({ LATER_COV: false }),
      new webpack.NormalModuleReplacementPlugin(
        /element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/,
        'element-ui/lib/locale/lang/en'
      )
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.module
        .rule('istanbul')
        .test(/\.(js|vue)$/)
        .enforce('post')
        .include.add(`${__dirname}apollo-server`)
        .add(`${__dirname}src`)
        .end()
        .use('@jsdevtools/coverage-istanbul-loader')
        .loader('@jsdevtools/coverage-istanbul-loader')
        .options({ esModules: true })
        .end();
    }
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    allowedHosts: ['all'],
    proxy: {
      '/api-app/releases': {
        target: 'https://api.github.com/repos/johnsusek/praeco/releases',
        changeOrigin: true,
        pathRewrite: {
          '^/api-app/releases': ''
        }
      },
      '/api-ws/test': {
        target: 'http://127.0.0.1:10100',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api-ws/test': '/test'
        }
      },
      '/api': {
        target: 'http://127.0.0.1:10100',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
