<template>
	<div id="app" class="dxs-wrapper">
		<el-container style="flex-direction: column;">
            <!-- 顶栏、头部 -->
            <!-- 数据传递：父传子 -->
            <header-menu :navData="navMenu" @changeNav="changeNav"/>
            <!-- 下面内容 -->
            <el-container class="bottom-box">
                <!-- 左侧栏导航 -->
                <sider-menu :menuData="currentNav"/>
                
                <!-- 内容区 -->
                <el-main class="main-box">
                    {{defaultValue}}
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
            navMenu: navMenu,   // 一级导航数据
            currentNav: {},     // 二级导航数据（对应当前选中的一级导航的二级数据
            
            
		}
	},
	components: {
		Login,
        HeaderMenu,
        SiderMenu

    },
    computed: {
        defaultValue() {
            console.log(this.$route, '44')
        }
    },

	created() {
        this.currentNav = navMenu[0].children;
    },
	methods: {
        changeNav(index) {
            // 切换一级导航时，与二级导航做映射
            this.currentNav = this.navMenu.filter(item => item.value === index)[0].children;
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

