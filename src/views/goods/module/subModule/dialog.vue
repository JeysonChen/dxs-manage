<template>
    <el-drawer
        :title="title"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="edit-drawer"
        ref="drawer"
        size="85%"
        >
        <div class="demo-drawer__content">
            <new-publish
                type="edit"
                :edit-data="editData"
                :product-img="productInfo.productImg"
                :detail-img="productInfo.detailImg"
            /> 
        </div>
    </el-drawer>
</template>

<script>
import Api from '@/api';
import NewPublish from '../newPublish';
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
            dialogFormData: {},
            productInfo: {}

        }
    },
    components: {
        NewPublish
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
    created () {
        
    },
    computed: {
        editData() {
            return this.formData;
        }
    },
    methods: {
        handleClose() {
            this.close();
        },
        open() {
            this.dialog = true;
            this.$nextTick(() => {
                this.getProductDetail(this.editData.id);
            })
            
        },
        close() {
            this.dialog = false;
        },
        getProductDetail(id) {
            Api.product.info({
                productId: id
            }).then(({data}) => {
                this.productInfo = data;
                let list1 = [data.mainImage].concat(data.subImages && data.subImages.split(','));
                this.productInfo.productImg = list1.map(item => {
                    return {
                        url: item
                    }
                });
                this.productInfo.detailImg = [...data.detail.split(',')].map(item => {
                    return {
                        url: item
                    }
                });
            })
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