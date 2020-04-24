不知道nuxt默认采取的eslint规则是不是recommended， 类似这种

```
<div>fefe</div>
// warning: vue/singleline-html-element-content-newline

<input v-model="aa" aa>
// 属性顺序乱也warning
```

本想设置默认为standard模式，暂时找不到文档在哪里配置，现在的处理的方法是保存的时候，自动格式化代码

```
nuxt.config.js
devModules: [
  // Doc: https://github.com/nuxt-community/eslint-module
  ['@nuxtjs/eslint-module', {
    fix: true // 保存自动修复语法，无需在编辑器（VSCODE）用户那里设置
  }]
]
```

https://github.com/nuxt/eslint-plugin-nuxt

https://eslint.vuejs.org/rules/attributes-order.html