<template>
    <div>
        <!-- 商品列表 -->
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
                :fixed="item.fixed"
                :width="item.width">
            </el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
                    <el-button type="text" size="mini" v-show="params == 'onsale'">下架</el-button>
                    <el-button type="text" size="mini" v-show="params == 'offsale'">上架</el-button>
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
import {tableTitle, goodsStatus} from '@/utils/goods';
import Api from '@/api'
export default {
    name:'checkList',
    // 接受父级传参
    // props: {
    //     params: {
    //         type: String,
    //         default: ''
    //     }
    // },
    components: {
        Pagination
    },
    computed: {
        // 监听页面（参数）传参的变化，
        params() {
            return this.$route.params.menu;
        }
    },
    watch: {
        params: {
            handler(val,oldVal) {
                // console.log(val,oldVal,'值');
                this.pagination = {
                    total: 1,
                    currentPage: 1,
                    pageSize:10
                };
                this.getData();
            },
            immediate: true
        }
    },
    data () {
        return {
            loading: true,
            // 商品部分--------------------
            // 列表表头数据
            tableTitle: tableTitle,
            // 页码相关数据
            pagination: {
                total: 20,
                currentPage: 1,
                pageSize:10
            },
            // 已上架商品数据
            tableData: [
                {
                    id: '001',
                    name: '新鲜安全鸡蛋400g',
                    price: '12',
                    chief: '17345678765',
                    time: '2021/01/04 22:00',
                    stock: '23/100',
                    views: 34,
                    paynumber: 99,
                    inversion: '34%',
                    share: 456
                },
                {
                    id: '002',
                    name: '新鲜苹果400g',
                    price: '12',
                    chief: '17345678765',
                    time: '2021/01/04 22:00',
                    stock: '23/100',
                    views: 34,
                    paynumber: 99,
                    inversion: '34%',
                    share: 456
                },
            ],

            // 列表表格商品数据：已发布、已上架、已下架
            downTableData: [
                {
                    id: '001',
                    name: '新鲜安全鸡蛋400g',
                    price: '12',
                    chief: '17345678765',
                    time: '2021/01/04 22:00',
                    stock: '23/100',
                    views: 34,
                    paynumber: 99,
                    inversion: '34%',
                    share: 456
                },
                {
                    id: '002',
                    name: '新鲜苹果400g',
                    price: '12',
                    chief: '17345678765',
                    time: '2021/01/04 22:00',
                    stock: '23/100',
                    views: 34,
                    paynumber: 99,
                    inversion: '34%',
                    share: 456
                },
            ],

            // 页码部分---------------------
            total: 200,

        }
    },
    created () {
        // 获取商品列表数据
        // this.getGoodsData();
    },
    mounted () {
        this.getData();
    },
    methods: {

        // 查看
        handleClick(row) {
            console.log(row);
        },

        // 判断不同状态，请求不同状态下的商品
        getData() {
            this.loading = true;
            console.log(this.params, 'params');
            
            Api.product.add({
                index: this.pagination.currentPage,
                size: this.pagination.pageSize,
                status: goodsStatus[this.params]
            }).then(res => {
                this.loading = false;
            })
        },

        // 改变页面容量
        handleSizeChange(pageSize){
            this.pagination.pageSize = pageSize;
             this.getGoodsData();
        },
        // 改变当前页码
        handleCurrentChange(currentPage){
            this.pagination.currentPage = currentPage;
            this.getGoodsData();
        }
    }
}
</script>

<style lang="less" scoped>
 
</style>