nuxt内置了对axios的封装

```
nuxt.conifg.js
modules: [
  // Doc: https://axios.nuxtjs.org/usage
  '@nuxtjs/axios'
],
axios: {
}
```

如何使用

```
async asyncData ({ req, res, error, params, $axios }) {
    try {
      (await $axios.get('http://localhost:8085/api/personalized', { params: { a: '1' } }))
      // or $axios.$get
      // or $axios.post
      // or $axios.$post
    } catch (res) {
      console.log(res)
    }
  }
```

如果需要对其进行全局处理

```
nuxt.config.js
plugins: [
  { src: '~/plugins/axios.js' }
]
```

plugins/axios.js

```
```