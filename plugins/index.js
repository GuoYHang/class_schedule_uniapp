import colors from './colors.js'
import tabs from './tabs.js'

export default {
	// vue提供install可供我们开发新的插件及全局注册组件等
	install(Vue) {
		Vue.prototype.$tab = tabs
		Vue.prototype.$color = colors
	}
}