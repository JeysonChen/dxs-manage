<!--
    @discribtion:二级导航组件
-->
<template>
    <el-aside width="200px" class="aside-box">
        <el-menu
            :default-active="defaultAction"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item :index="item.value" v-for="(item, index) in menuData" :key="index">
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    props: {
        menuData: {
            type: Array,
            default: () => []
        },
        defaultValue: {
            type: String,
            default: 'publishing'
        }
    },
    data() {
        return {
            defaultAction: this.defaultValue
        }
    },
    computed: {
        // defaultValue() {
        //     console.log(this.$route.params.menu, 'this.$route.params.menu')
        //     return this.$route.params.menu;
        // },
    },
    watch: {
        $route: {
            handler(val) {
                console.log(val, '888');
                if (val.params && val.params.menu) {
                    this.defaultAction = val.params.menu;
                    console.log(this.defaultAction);
                }
            },
            deep: true,
            immediate: true
        }
    },

    methods: {
        handleSelect(index) {
            let curr = this.menuData.filter(item => item.value === index)[0];
            this.$router.push({ path: `/${curr.parent}/${index}`});
        }
    }
}
</script>

<style lang="less" scoped>
    .aside-box{
        border-right: solid 1px #e6e6e6;
        .el-menu{
            border-right:none;
        }
    }
</style>