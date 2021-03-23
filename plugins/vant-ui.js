import Vue from 'vue'
import Vant from 'vant'

import { Row, Col, Icon, Image, Cell, CellGroup, Toast, GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';

// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css';

Vue.use(Vant)

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use(Row)
  .use(Col)
  .use(Image)
  .use(Icon)
  .use(Cell)
  .use(CellGroup)
  .use(Toast);




