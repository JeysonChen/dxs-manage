<template>
    <div class="sites-list">
        <p class="item-title">已添加站点</p>
        <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                v-for="(item, index) in tableTitle"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template slot-scope="scope">
                    <el-button type="text" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 页码 -->
        <Pagination 
            :pagination="pagination"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        />
    </div>
</template>

<script>
import Pagination from '@/components/pagination';
import {tableTitle} from '@/utils/sites';
export default {
    data () {
        return {
            loading: false,
            pagination: {
                total: 1,
                currentPage: 1,
                pageSize:10
            },
            tableTitle: tableTitle,
            tableData: [
                {
                    index: 1
                }
            ]
        }
    },
    components: {
        Pagination
    },
    props: {
        isAdded: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isAdded(val) {
            if (val) {
                this.pagination = {
                    total: 1,
                    currentPage: 1,
                    pageSize:10
                };
                this.getData();
            }
        }
    },
    methods: {
        getData() {
            console.log('更新数据');
            this.$emit('getSucc', '')
        },
        handleSizeChange(pageSize) {
            console.log(pageSize);
        },
        handleCurrentChange() {
            console.log(currentPage);
            this.pagination.currentPage = currentPage;
            this.getData();
        }
    }

}
</script>

<style lang="less" scoped>
    
</style>