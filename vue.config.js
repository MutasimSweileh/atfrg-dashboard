module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/',

  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true
    }
  }
}
