<template>
    <div>
        <p class="item-title">{{dataSet.titleSet.listTitle}}</p>
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <template  v-for="item in tableTitle">
                <el-table-column
                    v-if="item.prop!=='handler'"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                </el-table-column>
                <el-table-column
                    v-else
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                    <template slot-scope="{row}">
                        <el-button
                            type="text"
                            size="mini"
                            v-for="(btn, i) in item.buttonList" 
                            @click="handleTable(btn.identity, row)" 
                            :key='i'
                        >{{btn.label}}</el-button>
                    </template>
                </el-table-column>
            </template>
           
        </el-table>
         <!-- 页码 -->
        <Pagination
            v-if="showPagigation"
            :pagination="pagination"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        />
    </div>
</template>

<script>
import Pagination from '../pagination';
export default {
    // 接受各父级（站点、团长、标签、分类）的传参(与data互斥)
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        tableTitle: {
            type: Array,
            defalut: () => []
        },
        pagination: {
            type: Object,
            default: () => {}
        },
        tableData: {
            type: Array,
            defalut: () => []
        },
        showPagigation: {
            type: Boolean,
            default: true
        },
        dataSet: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        Pagination
    },
    methods: {
        handleTable(event, rows) {
            this.$emit('handleTable', event, rows);
        },
        handleSizeChange(pageSize) {
            this.$emit('handleSizeChange', pageSize);
        },
        handleCurrentChange(currentPage) {
            this.$emit('handleCurrentChange', currentPage)
        }
    }
}
</script>

<style>

</style>