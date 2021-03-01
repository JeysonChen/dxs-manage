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
            <FormBox
                ref="formBox"
                :form-item="formItem"
                :rules="rules"
                :dataSet="dataSet"
                :show-add-btn="false"
                :form-data-init="formData"
                @formChange="formChange"
            />
            <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="submit" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import FormBox from '@/components/formBox';

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
        formItem: {
            type: Array,
            default: () => []
        },
        rules: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        FormBox
    },
    methods: {
        cancelForm() {
            this.close();
        },
        handleClose() {
            this.close();
        },
        open() {
            this.dialog = true;
        },
        close() {
            this.$refs.formBox.setInit();
            this.dialog = false;
        },
        submit() {
            this.close();
            this.$emit('submit', this.dialogFormData);
        },
        formChange(val) {
            this.dialogFormData = {...val};
        }

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
    }
</style>