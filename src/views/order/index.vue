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
        <!-- <Dialog
            ref="dialog"
            title="编辑团长"
            type="mark"
            :rules="rules"
            :form-item="formItem"
            :form-data="dialogFormData"
            @submit="submitDialog"

        /> -->
    </div>
</template>

<script>
import FormBox from '@/components/formBox';
import CheckList from '@/components/checkList'
import Dialog from './module/dialog';
import {orderStatus, dataSet, tableTitle, tableHandler} from '@/utils/order';
import Api from '@/api';
import MD5 from 'md5';
export default {
    name: 'configure',
    components: {
        FormBox,
        CheckList,
        Dialog
    },
    data () {
        return {
            // formItem: formItem,
            // rules: rules,
            dataSet: dataSet,
            // tableTitle,
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
    methods: {
        getData() {
            this.loading = true;
            Api.order.search(
                {
                    status: orderStatus[this.params],
                    userId: '',
                    queryModel: '',
                    size: this.pagination.pageSize,
                    index: this.pagination.currentPage
                }
            ).then(({data}) => {
                this.loading = false;
                this.pagination.total = data.total;
                this.tableData = data.records.map((item, index) => {
                    item.index = index + 1;
                    item.buyProducts = item.mallOrderDetailS.map(list => list.productName).join(',');
                    item.quantityList = item.mallOrderDetailS.map(list => list.quantity);
                    item.quantity = item.quantityList.reduce((pre, cur) => {
                        return prev + cur;
                    })
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
                    break;
                case 'del':
                    Api.mark.delete({tagId: row.id}).then(res => {
                        this.$message.success('删除成功');
                    });
                    break;
            }
        },
        handleCurrentChange(currentPage) {
            console.log(currentPage, 'currentPage')
        },
        handleSizeChange(pageSize) {
            console.log(pageSize, 'pageSize')
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