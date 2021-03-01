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
                    :width="item.width"
                    :fixed="item.fixed">
                    <template slot-scope="{row, column}">
                        <span  v-if="column.property === 'refundImages' || column.property === 'avatar'"><img :src="row.refundImages && row.refundImages.split(',')[0] || row.avatar" width="30" alt=""></span>
                        <span v-else>{{row[item.prop]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width">
                    <template slot-scope="{row}">
                        <template v-if="row.showBtnList">
                            <el-button
                                type="text"
                                size="mini"
                                v-for="(btn, i) in row.showBtnList" 
                                @click="handleTable(btn.identity, row)" 
                                :key='i'
                                :disabled="btn.disabled"
                            >{{btn.label}}</el-button>
                        </template>
                        <template v-else>
                            <el-button
                                type="text"
                                size="mini"
                                v-for="(btn, i) in item.buttonList" 
                                @click="handleTable(btn.identity, row)" 
                                :key='i'>
                                {{row.isHidehandler ? row.replaceBtn : btn.label}}
                            </el-button>
                        </template>
                        
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
            console.log(currentPage, '0-0-0')
            this.$emit('handleCurrentChange', currentPage)
        }
    }
}
</script>

<style>

</style>