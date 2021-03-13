<template>
	<div id="app" class="dxs-wrapper">
        <!-- 登录页面 -->
        <!-- <Login v-if="!isAuthenticated"/> -->

        <!-- 后台区域 -->
		<el-container style="flex-direction: column;">
            <!-- 顶栏、头部 -->
            <!-- 数据传递：父传子 -->
            <header-menu v-if="isAuthenticated"  :navData="navMenu" :defaultValue="defaultValue" @changeNav="changeNav"/>
            <!-- 下面内容 -->
            <el-container class="bottom-box">
                <!-- 左侧栏导航 -->
                <sider-menu v-if="isAuthenticated" :menuData="currentNav" :defaultValue="defaultSideMenu" />

                <!-- 内容区 -->
                <el-main class="main-box">
                    <router-view />
                </el-main>
            </el-container>
		</el-container>
	</div>
</template>

<script>
import Login from '@/views/login/Login'
import HeaderMenu from '@/components/header';
import SiderMenu from '@/components/sidemenu';
import {navMenu} from '@/utils/constant';
export default {
	data() {
		return {
            loginSuccess: true,// 控制登录页面
            navMenu: navMenu,   // 一级导航数据
            currentNav: [],     // 二级导航数据（对应当前选中的一级导航的二级数据
            defaultSideMenu: this.defaultValueSide
		}
	},
	components: {
		Login,
        HeaderMenu,
        SiderMenu

    },
    computed: {
        defaultValue() {
            return this.$route.meta.name;
        },
        defaultValueSide() {
            console.log(this.$route.params.menu, 'this.$route.params.menu')
            return this.$route.params.menu;
        },
        isAuthenticated() {
            console.log(this.$store.state.isAuthenticated, 'this.$store.state.isAuthenticated')
            return this.$store.state.isAuthenticated
        },
    },
    watch: {
        defaultValue(val) {
            this.currentNav = navMenu.filter(item => item.value === val)[0].children;
        },
        // $route: {
        //     handler(router) {
        //         console.log(router, 'router');
        //         this.defaultValue = router.menu.name;
        //         this.defaultValueSide = router.params.menu;
        //     },
        //     deep: true,
        //     immediate: true
        // }
    },
	created() {
        // this.currentNav = navMenu[0].children;
    },
	methods: {
        changeNav(index) {
            console.log(this.$route, 'this.$route----')
            // 切换一级导航时，与二级导航做映射
            let curr = this.navMenu.filter(item => item.value === index);
            this.currentNav = curr[0].children;
            this.defaultSideMenu = curr[0].children[0].value;
            // 切换一级导航时，默认展示二级导航的第一个导航
            this.$router.push({ path: `/${this.currentNav[0].parent}/${this.currentNav[0].value}`});
        }


    },
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.bottom-box{
    height: calc(100vh - 60px);
}
.main-box{
    text-align: left;
}

/* #nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
} */
</style>

