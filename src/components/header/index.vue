<!--
    @discribtion:项目header组件，header部分
-->
<template>
    <!-- 顶栏、头部 -->
    <el-header>
        <el-row class="header-box" type="flex" align="middle">
            <!-- logo -->
            <el-col :span="4" class="logo-box">
                <a href="javascript:;" class="logo-img">
                    <img src="../../assets/imgs/logo.png" width="24" alt="duoxiansheng"/>
                </a>
                <a href="javascript:;" class="logo-title">多鲜生管理后台</a>
            </el-col>
            <!-- ment-one -->
            <el-col :span="14">
                <el-menu
                    :default-active="defaultValue"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                >
                    <el-menu-item :index="item.value" v-for="(item, index) in navData" :key="index">{{item.label}}</el-menu-item>
                    <!-- <el-menu-item index="2">站点</el-menu-item>
                    <el-menu-item index="3">订单</el-menu-item>
                    <el-menu-item index="4">团长</el-menu-item>
                    <el-menu-item index="5">配置</el-menu-item> -->
                </el-menu>
            </el-col>
            <!-- user-out -->
            <el-col :span="6" class="user-out">
                <span>{{userInfo.phone || ''}}</span>
                <el-button size="small" @click="loginOut">退出登录</el-button>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
import Api from '@/api';
export default {
    props: {
        navData: {
            type: Array,
            default: () => []
        },
        defaultValue: {
            type: String,
            default: 'goods'
        },

    },
    data() {
        return {
            // defaultValue: this.defaultValue,
            current: 0
        }
    },
    computed: {
        userInfo() {
            return localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
        }
    },
    methods: {
        // 切换菜单栏
        handleSelect(index) {
            this.$emit('changeNav', index);
            // this.defaultValue = index;
        },
        loginOut() {
            Api.mallUser.logout().then(res => {
                this.$message.success('退出登录成功');
                localStorage.setItem('userInfo', '');
                localStorage.setItem('isAuthenticated', false);
                localStorage.setItem('token', '');
                this.$router.push({path: '/login'})
            })
        }
    },
}
</script>
<style lang="less" scoped>

    .header-box {
        height: 100%;
        .logo-box{
            text-align: left;
            .logo-img {
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                vertical-align: middle;
            }
            .logo-title {
                display: inline-block;
                height: 24px;
                line-height: 24px;
                font-size: 16px;
            }
        }
        .user-out{
            text-align: right;
            span{
                padding: 0 15px;
            }
        }
        
    }

    // menu
    .el-menu.el-menu--horizontal{
        border-bottom: none!important;
    }
    .el-menu--horizontal>.el-menu-item{
        height: 30px;
        line-height: 30px;    }
</style>