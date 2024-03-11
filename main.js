import Vue from 'vue'

import App from './App'

import cuCustom from '@/modules/colorui/components/cu-custom.vue'

import plugins from './plugins' // plugins
// uni.promisify.adaptor文件是用来将uniapp的异步API转换为Promise的适配器
import './uni.promisify.adaptor'

Vue.component('cu-custom',cuCustom)
Vue.use(plugins)
Vue.config.productionTip = true

App.mpType = 'app'

const app = new Vue({
  ...App
})

app.$mount()