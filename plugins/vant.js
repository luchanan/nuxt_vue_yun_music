import Vue from 'vue'
import 'vant/lib/index.css'
import { NoticeBar, Popup, NavBar, Icon, NumberKeyboard, Dialog, SwipeCell, Button, Field, Cell, CellGroup, Toast, Grid, GridItem, Image, Lazyload, Loading, Swipe, SwipeItem, Collapse, CollapseItem, Divider } from 'vant'
// 按需加载，全局注册
Vue.use(NoticeBar)
Vue.use(Popup)
Vue.use(Dialog)
Vue.use(SwipeCell)
Vue.use(Button)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Image)
Vue.use(Lazyload, { lazyComponent: true })
Vue.use(Loading)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Divider)
Vue.use(NumberKeyboard)
Vue.use(Icon)
Vue.use(NavBar)

Vue.prototype.$toast = Toast
