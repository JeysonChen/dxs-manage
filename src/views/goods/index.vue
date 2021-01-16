<template>
<div>
    <!-- 发布商品 -->
    <new-publish v-if="params == 'publishing'" />

    <!-- 商品列表：上架、下架商品 -->
    <!-- 向checkList传参数params -->
    <check-list v-else :params="params"/>

</div>
</template>

<script>
import NewPublish from './module/newPublish';
import CheckList from './module/checkList';
export default {
    computed: {
        // 监听页面（参数）传参的变化，对页面实时展示不同的内容（params相当于定义的一个变量，实时监听变化的）
        params() {
            return this.$route.params.menu;
        }
    },
    components: {
        NewPublish,
        CheckList
    },
    created () {
        
    }
}
</script>
<style scoped>
</style>