module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/revision': {
        target: 'http://m.ximalaya.com',

        // target: 'http://m.ximalaya.com',
        // ws: true,
        changeOrigin: true
      }
    }
  }
}
