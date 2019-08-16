import Vue from 'vue'
import 'vant/lib/index.css'
import { Button, Field, CellGroup, Toast, Grid, GridItem, Image } from 'vant'
// 按需加载，全局注册
Vue.use(Button)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Image)

Vue.prototype.$toast = Toast
