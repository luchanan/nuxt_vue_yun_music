import iconFont from '@/plugins/icon-font/index.vue'
import Vue from 'vue'
if (process.client) { require('@/plugins/icon-font/iconfont.js') }
Vue.component('icon-font', iconFont)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
// requireAll(req)
