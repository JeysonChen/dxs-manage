<!--
    @discribtion:页码组件
-->
<template>
    <div class="page-box">
        <el-pagination

            background
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
    </div>
    
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        // 向父组件发射数据
        // 改变页码容量
        handleSizeChange() {
            this.$emit('handleSizeChange', this.pagination.pageSize);
        },
        // 改变当前页面
        handleCurrentChange() {
            this.$emit('handleCurrentChange', this.pagination.currentPage);
        },
    }
}
</script>

<style lang="less">
   .page-box{
        padding: 20px 0;
        .el-pagination{
            text-align: right;
        }
    }

</style>