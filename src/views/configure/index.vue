<template>
    <div>
        <Mark v-if="params == 'mark'"/>
        <Category v-else/>
    </div>
</template>

<script>
import Mark from './module/mark';
import Category from './module/category'
export default {
    name: 'configure',
    components: {
        Mark,
        Category
    },
    computed: {
        // 监听页面（参数）传参的变化，对页面实时展示不同的内容（params相当于定义的一个变量，实时监听变化的）
        params() {
            return this.$route.params.menu;
        }
    },
    data () {
        return {
            
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    methods: {
        
    }
}
</script>

<style>

</style>