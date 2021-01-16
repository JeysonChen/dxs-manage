<template>
	<div>
		<el-button type="primary" @click="toHome">主要按钮</el-button>
	</div>
</template>

<script>
export default {
	name: 'Login',
	components: {},
	created() {},
	methods: {
		toHome() {
			this.$router.push({ path: '/goods/Publish' })
		},
	},
}
</script>

<style></style>
