const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  devServer: {
    proxy: 'http://49.50.172.137:3000'
  },
  pluginOptions: {
  electronBuilder: {
    removeElectronJunk: false,
    builderOptions: {
      appId: 'com.electron.articulation',
      files: ['!bin/*'],
      asar: true,
      extraFiles: [
        {
          from: 'src/plugins',
          to: 'resources/src/plugins',
          filter: ['**/*'],
        },
        {
          from: 'src/assets',
          to: 'resources/src/assets',
          filter: ['**/*'],
        },
        {
          from: 'config',
          to: 'resources/config',
          filter: ['**/*'],
        },
      ],
      win: {
        target: [
          {
            target: 'nsis',
            arch: ['x64'],
          },
        ],
        icon: 'public/favicon.ico',
        publisherName: 'Lighten Tech.',
      },
      nsis: {
        oneClick: true,
        allowElevation: true,
        deleteAppDataOnUninstall: true,
      },
    },
  },
}
}

// module.exports = {
//   devServer: {
//     proxy: {
//       '/':{
//         "target":'http://49.50.172.137:3000',
//         "pathRewrite":{'^/':''},
//         "changeOrigin":true,
//         "secure":false
//       }
//     }
//   }
// }