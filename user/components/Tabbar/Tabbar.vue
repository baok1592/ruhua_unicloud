<template>
	<view>
		<u-tabbar :list="vuex_tabbar" :active-color="color" :inactive-color="color1"></u-tabbar>
	</view>
</template>

<script>
	import list from "../../pages/example/components.config.js";
	export default {
		data() {
			return {
				// list: list
				color:'#fb586a',
				color1:'#606266',
			};
		}
	}
</script>

<style lang="scss">

</style>
