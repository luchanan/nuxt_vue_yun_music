## 添加vant ui组件

### 常见问题

- 按需加载配置

### 出错记录

- 按需加载'style': 'css'加载错误, 导致按需加载无法加载样式

```
1. 
build: {
  /*
  ** You can extend webpack config here
  */
  extend (config, ctx) {},
  babel: {
    plugins: [
      ['import', { libraryName: 'vant', 'style': 'css' }, 'vant']
    ]
  }
}

//

This dependency was not found:                                                                                 
* vant/lib/button/style/css in ./plugins/vant.js

// 原因：node_modules\vant\lib\button\index.css才是css打包后的路径

// 解决1， 缺点：每次要import一样样式

vant.js 添加css

import { Button } from 'vant'
import 'vant/lib/button/index.css'
// 按需加载，全局注册
Vue.use(Button)

nuxt.config.js, 去除style字段

babel: {
  plugins: [
    ['import', { libraryName: 'vant' }, 'vant']
  ]
}

解决2： 组件js按需插入， 但是css全部引入，因为目前还不支持按需插入对应组件的样式...

1. next.config.js

module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    'vant/lib/index.css'
  ],
  plugins: [
    { src: '~/plugins/vant.js' } // 默认ssr: true, ~可以用@代替
  ],
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    babel: {
      plugins: [
        [
          'import', {
            libraryName: 'vant'
          },
          'vant'
        ]
      ]
    }
  }
}

2. 或者不在nuxt.config的css不引入，在vant.js处理

import Vue from 'vue'
import 'vant/lib/index.css'
import { Button } from 'vant'
// 按需加载，全局注册
Vue.use(Button)
```