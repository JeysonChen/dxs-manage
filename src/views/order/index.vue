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
            title="退款审核"
            type="refund"
            :form-data="dialogFormData"
            @submitSucc="submitSucc"
        />
    </div>
</template>

<script>
import FormBox from '@/components/formBox';
import CheckList from '@/components/checkList'
import Dialog from './module/dialog';
import {orderStatus, dataSet, tableTitle, refundTableTitle, tableHandler} from '@/utils/order';
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
            if (this.params === 'refund') {
                return refundTableTitle.concat(tableHandler[this.params]);
            } else {
                return tableTitle.concat(tableHandler[this.params]);
            }
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
            this.tableData = [];
            if (this.params === 'refund') {
                Api.order.SearchRefound({
                    size: this.pagination.pageSize,
                    index: this.pagination.currentPage
                }).then(({data}) => {
                    let statusInfo = {
                        '0': '申请退款',
                        '1': '审核通过',
                        '2': '审核驳回'
                    };
                    this.loading = false;
                    this.pagination.total = data.total;
                    this.tableData = data.records.map(item => {
                        item.statusInfo = statusInfo[item.status];
                        item.isHidehandler = +item.status !== 0;
                        return item;
                    });
                });
            } else {
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
                        item.quantity = item.quantityList.length > 0 && item.quantityList.reduce((pre, cur) => {
                            return pre + cur;
                        });
                        return item;
                    });
                });
            }
        },
        handleTable(event, row) {
            console.log(event, row, 'event');
            switch(event) {
                // 确认发货
                case 'confirmSend':
                    this.$confirm('确认发货？')
                    .then(_ => {
                        this.edit(row, 50);
                    })
                    .catch(_ => {});
                    break;
                // 确认送达
                case 'confirmDeliver':
                    this.$confirm('确认送达？')
                    .then(_ => {
                        this.edit(row, 55);
                    })
                    .catch(_ => {});
                    break;
                case 'cancelOrder':
                    this.$confirm('确认取消？')
                    .then(_ => {
                        this.edit(row, 40);
                    })
                    .catch(_ => {});
                    break;
                case 'confirmRefund':
                    this.$refs.dialog.open();
                    this.dialogFormData = row;
                    break;
            }
        },
        // UNPAID(10, "unpaid", "未支付"),
        // PAID_ING(20, "paid_ing", "支付中"),
        // PAID(30, "paid", "支付成功"),
        // CANCEL(40, "cancel", "交易取消"),
        // FINISH(50, "finish", "已发货"),
        // DELIVERY_POINT_FINISH(55, "delivery_point_finish", "货物已到取货点"),
        // SHIPPED(60, "shipped", "确认收货"),
        // AUTO_FINISH(70, "auto_finish", "自动确认收货"),
        // REFOUND_APPLY(80, "refound_apply", "退款审核中"),
        // NOT_SHIPPED_REFOUND_APPLY(81, "not_shipped_refound_apply", "未发货取消订单，退款申请"),
        // REFOUND_FINISH(90, "refound_finish", "退款审核通过"),
        // REFOUND_REJECT(100, "refound_reject", "退款审核驳回"),
        // ORDER_COMPLETE(110, "order_complete", "交易完成"),
        // ORDER_CLOSED(120, "order_closed", "交易关闭");
        edit(row, num) {
            let {id, orderNo, payPlatform, payPlatformTradeNo, paymentType, platformStatus} = row;
            Api.order.modify({
                id,
                orderNo,
                // payPlatform: row.orderType,
                // payPlatformTradeNo,
                // paymentType: row.tradeType,
                // platformStatus,
                status: num,
            }).then(({data}) => {
                console.log(data);
                this.$message.success('更改成功');
                this.getData();
            })
        },
        handleCurrentChange(currentPage) {
            console.log(currentPage, 'currentPage');
            this.pagination.currentPage = currentPage;
            this.getData();
        },
        handleSizeChange(pageSize) {
            console.log(pageSize, 'pageSize');
            this.pagination.currentPage = currentPage;
            this.getData();
        },
        // 编辑提交
        submitDialog(val) {
            console.log(val);
            Api.mark.edit(val).then(res => {
                console.log(res, '编辑mark');
                this.$message.success('编辑成功')
            })
        },
        submitSucc() {
            this.getData();
        }


    }
}
</script>

<style>

</style>