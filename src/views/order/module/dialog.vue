<template>
    <el-drawer
        :title="title"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="edit-drawer"
        ref="drawer"
        size="40%"
        >
        <div class="demo-drawer__content">
            <div class="dialog-list">
                <p>订单号： {{formData.orderNo}}</p>
                <p>退款金额: {{formData.payment}}</p>
                <p>退款图片: <img :src="formData.refundImages" alt=""></p>
                <p>退款原因: {{formData.refundReason}}</p>
                <p>退款状态: {{formData.statusInfo}}</p>
                <p>创建时间: {{formData.createTime}}</p>
            </div>
            <div class="demo-drawer__footer">
            <el-button @click="submit(2)">审核驳回</el-button>
            <el-button type="primary" @click="submit(1)">审核通过</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import Api from '@/api';
export default {
    data () {
        return {
            dialog: false,
            loading: false,
            dataSet: {
                formSet: {
                    labelWidth: '80px',
                    labelPosition: 'right',
                    inline: false,
                },
            },
            dialogFormData: {}

        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        formData: {
            type: Object,
            default: () => {}
        },
    },
    methods: {
        handleClose() {
            this.close();
        },
        open() {
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        },
        submit(n) {
            this.close();
            this.$confirm(n === 1 ? '通过后将全部退还' : '确认驳回退款')
            .then(_ => {
                Api.order.audit({
                    id: this.formData.id,
                    orderNo: this.formData.orderNo,
                    status: n
                }).then(({data}) => {
                    this.$message.success('提交成功');
                    this.$emit('submitSucc');
                });
            })
            .catch(_ => {});
        },

    }
}
</script>

<style lang="less">
    .edit-drawer {
        .el-drawer__header>:first-child {
            font-size: 16px;
            color: #333;
        }
        .el-icon-close {
            font-size: 20px;
        }
        .dialog-list {
            min-height: 400px;
            p {
                font-size: 14px;
                line-height: 20px;
                margin-bottom: 10px;
            }
        }
    }
</style>