const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  devServer: {
    proxy: 'http://49.50.172.137:3000'
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