<template>
    <div>
        <!-- 分类列表 -->
        <CheckList
            :tableTitle="tableTitle"
            :tableData="tableData"
            :loading="loading"
            :dataSet="dataSet"
            :showPagigation="true"
            :pagination="pagination"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            @handleTable="handleTable"
        />
        <Dialog
            ref="dialog"
            title="编辑商品"
            :form-data="dialogFormData"
            @submit="submitDialog"

        />
    </div>
</template>

<script>
import CheckList from '@/components/checkList'
import Dialog from './subModule/dialog';
import {dataSet, tableTitle, goodsStatus, tableHandler} from '@/utils/goods';
import Api from '@/api';
import MD5 from 'md5';
export default {
    name: 'configure',
    components: {
        CheckList,
        Dialog
    },
    data () {
        return {
            // formItem: formItem,
            // rules: rules,
            dataSet,
            // tableTitle,
            goodsStatus,
            pagination: {
                total: 1,
                currentPage: 1,
                pageSize:10
            },
            tableData: [
            ],
            loading: false,
            showDialog: false,
            dialogFormData: {},
            activeName: 'first'
        }
    },
    created () {
        this.getData();
    },
    computed: {
        params() {
            return this.$route.params.menu;
        },
        tableTitle() {
            return tableTitle.concat(tableHandler[this.params]);
        }
    },

    watch: {
        params() {
            this.getData();
        }
    },
    methods: {
        getData() {
            this.loading = true;
            Api.product.searchFromManager({   
                    upDownStatus: goodsStatus[this.params],
                    size: this.pagination.pageSize,
                    index: this.pagination.currentPage
            }).then(({data}) => {
                this.loading = false;
                this.pagination.total = data.total;
                this.tableData = data.records.map((item, index) => {
                    item.index = index + 1;
                    item.groupOwnerEarnings = Number(item.groupOwnerEarnings) / 10;
                    item.costPrice = Number(item.costPrice) / 10;
                    item.helphairEarnings = Number(item.helphairEarnings) / 10;
                    item.originPrice = Number(item.originPrice) / 10;
                    item.shareEarnings = Number(item.shareEarnings) / 10;
                    item.salePrice = Number(item.salePrice) / 10;
                    return item;
                });
            })
        },
        handleTable(event, row) {
            console.log(event, row, 'event');
            switch(event) {
                case 'edit':
                    this.$refs.dialog.open();
                    this.dialogFormData = row;
                    // this.getProductDetail(row.id);
                    break;
                case 'del':
                    let param = new URLSearchParams();
                    param.append("productId", row.id);
                    this.$confirm('确认删除？')
                    .then(_ => {
                        Api.product.delete(param, {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }).then(res => {
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    })
                    .catch(_ => {});
                    break;
                case 'offsale':
                    let param2 = new URLSearchParams();
                    param2.append("productId", row.id);
                    this.$confirm('确认下架？')
                    .then(_ => {
                        Api.product.soldOut(param2, {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }).then(res => {
                            this.$message.success('下架成功');
                            this.getData();
                        });
                    })
                    .catch(_ => {});
                    break;
                 case 'onsale':
                    let param3 = new URLSearchParams();
                    param3.append("productId", row.id);
                    this.$confirm('确认上架？')
                    .then(_ => {
                        Api.product.shelves(param3, {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }).then(res => {
                            this.$message.success('上架成功');
                            this.getData();
                        });
                    })
                    .catch(_ => {});
                    break;
            }
        },
        handleCurrentChange(currentPage) {
            console.log(currentPage, 'currentPage');
            this.pagination.currentPage = currentPage;
            this.getData();
        },
        handleSizeChange(pageSize) {
            console.log(pageSize, 'pageSize');
            this.pagination.pageSize = pageSize;
            this.getData();
        },
        // 编辑提交
        submitDialog(val) {
            console.log(val);
            Api.mark.edit(val).then(res => {
                console.log(res, '编辑mark');
                this.$message.success('编辑成功')
            })
        }


    }
}
</script>

<style>

</style>