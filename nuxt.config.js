
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/touch-icon/64_64.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/touch-icon/114_1114.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/touch-icon/152_152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/touch-icon/180_180.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'flex.css', // node_modules
    '~/assets/less/base'
  ],
  // https://zh.nuxtjs.org/api/configuration-build/#styleresources
  styleResources: {
    less: [
      './assets/less/variables.less', // 当具体页面用到的时候，不必每个页面都@import
      './assets/less/mixin.less'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vant.js' }, // 默认ssr: true, ~可以用@代替
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/icon-font/index.js' },
    { src: '~/plugins/filters.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', {
      fix: true
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // 网易云启动api地址
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  server: {
    port: 8085, // default: 3000
    host: 'localhost' // default: localhost
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // if (ctx.isDev) {
      //   config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      // }
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
    },
    postcss: {
      plugins: {
        'postcss-aspect-ratio-mini': {},
        'postcss-px-to-viewport': {
          selectorBlackList: ['van'], // 设置vant的样式不被转换
          viewportWidth: 1242
        }
      }
    }
  }
}
