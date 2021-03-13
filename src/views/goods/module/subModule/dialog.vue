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
                @changeFileList="changeFileList"
                @changeFileListDetails="changeFileListDetails"
                @edit="edit"
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
            dialog: true,
            loading: false,
            dataSet: {
                formSet: {
                    labelWidth: '80px',
                    labelPosition: 'right',
                    inline: false,
                },
            },
            dialogFormData: {},
            productInfo: {},
            editData: this.formData
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
    mounted() {
        this.$nextTick(() => {
            this.getProductDetail(this.editData.id);
        })
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
        edit() {
            this.$emit('edit')
        },
        close() {
            this.dialog = false;
            this.$emit('close');
        },
        changeFileList(list) {
            this.editData.productImg = list;
        },
        changeFileListDetails(list) {
            this.editData.detailImg = list;
        },
        getProductDetail(id) {
            Api.product.info({
                productId: id
            }).then(({data}) => {
                Object.assign(this.editData, data);
                let list1 = [data.mainImage].concat(data.subImages && data.subImages.split(',') || []);
                this.editData.productImg = list1.map(item => {
                    return {
                        url: item
                    }
                });
                this.editData.detailImg = [...data.detail.split(',')].map(item => {
                    return {
                        url: item
                    }
                });
            })
        },
        submit(n) {

            this.close();
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