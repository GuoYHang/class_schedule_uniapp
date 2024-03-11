<script>
	
	import config from './config.js'
	
	export default {
		
		onLaunch: function() {
			this.initApp()
		},
		
		methods: {
			// 初始化app
			initApp: function() {
				this.globalData.config = config
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/static/scss/index.scss'
	
</style>
