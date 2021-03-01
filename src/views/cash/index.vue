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
    </div>
</template>

<script>
import FormBox from '@/components/formBox';
import CheckList from '@/components/checkList'
import {dataSet, tableTitle} from '@/utils/cash';
import Api from '@/api';
export default {
    name: 'configure',
    components: {
        CheckList,
    },
    data () {
        return {
            dataSet: dataSet,
            tableTitle: tableTitle,
            pagination: {
                total: 1,
                currentPage: 1,
                pageSize:10
            },
            tableData: [],
            loading: false,
            dialogFormData: {}
        }
    },
    created () {
        this.getData();
    },
    mounted () {
        
    },
    methods: {
        getData() {
            this.loading = true;
            Api.order.paySearch({
                index: this.pagination.currentPage,
                size: this.pagination.pageSize
            }).then(({data}) => {
                console.log(data, 'ressf')
                this.loading = false;
                this.pagination.total = data.total;
                this.tableData = data.records.map((item, index) => {
                    item.index = index + 1;
                    item.showBtnList = [
                        {
                            label: item.status === 0 ? '确认提现' : '已提现',
                            identity: 'confirm',
                            disabled: item.status !== 0
                        },
                        {
                            label: item.status === 2 ? '已取消' : '取消申请',
                            identity: 'cancel',
                            disabled: item.status === 2
                        }
                    ];
                    return item;
                });
            })
        },
        handleTable(event, row) {
            console.log(event, row, 'event');
            switch(event) {
                case 'confirm':
                    this.$confirm('确认线下完成打款')
                    .then(_ => {
                        Api.order.edit({
                            payId: row.id
                        }).then(res => {
                            this.$message.success('已确认取现');
                            this.getData();
                        });
                    })
                    .catch(_ => {});
                    break;
                case 'cancel':
                    this.$confirm('确认取消申请取现？')
                    .then(_ => {
                        Api.order.cancelTakeMoney({
                            payId: row.id
                        }).then(res => {
                            this.$message.success('取消成功');
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
        submitDialog(param) {
            console.log(param, '90909');
            Api.order.edit(param).then(res => {
                console.log(res, '编辑mark');
                this.$message.success('编辑成功');
                this.getData();
            });
        }


    }
}
</script>
