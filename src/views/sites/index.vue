<template>
    <div>
        <!-- 添加分类 -->
        <FormBox :formItem="formItem" :rules="rules" :dataSet="dataSet" @add="add" />
        <!-- 分类列表 -->
        <CheckList
            :tableTitle="tableTitle"
            :tableData="tableData"
            :loading="loading"
            :dataSet="dataSet"
            :showPagigation="false"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            @handleTable="handleTable"
        />
        <Dialog
            ref="dialog"
            title="编辑站点"
            type="mark"
            :rules="rules"
            :form-item="formItem"
            :form-data="dialogFormData"
            @submit="submitDialog"

        />
    </div>
</template>

<script>
import FormBox from '@/components/formBox';
import CheckList from '@/components/checkList'
import Dialog from './module/dialog';
import {formItem, rules, dataSet, tableTitle} from '@/utils/sites';
import Api from '@/api';
export default {
    name: 'configure',
    components: {
        FormBox,
        CheckList,
        Dialog
    },
    data () {
        return {
            formItem: formItem,
            rules: rules,
            dataSet: dataSet,
            tableTitle: tableTitle,
            pagination: {
                total: 1,
                currentPage: 1,
                pageSize:10
            },
            tableData: [],
            loading: false,
            showDialog: false,
            dialogFormData: {}
        }
    },
    created () {
        this.getData();
    },
    mounted () {
        
    },
    methods: {
        add(formData) {
            Api.mark.add(
                formData
            ).then(res => {
                console.log(this, 'this')
                console.log(res,'提交成功')
                // 消息提示--添加成功
                this.$message.success('添加成功')
                this.pagination.currentPage = 1;
                this.getData();
            }).catch(err => {
                this.$message.error('添加失败');
            })
        },
        getData() {
            this.loading = true;
            Api.mark.list().then(res => {
                console.log(res, 'ressf')
                this.loading = false;
                this.tableData = res.data;
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
                    let param = new URLSearchParams();
                    param.append("tagId", row.id);
                    this.$confirm('确认删除？')
                    .then(_ => {
                        Api.mark.delete(param, {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }).then(res => {
                            this.$message.success('删除成功');
                            this.getData();
                        });
                    })
                    .catch(_ => {});
                    
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
        submitDialog(param) {
            console.log(param, '90909');
            Api.mark.edit(param).then(res => {
                console.log(res, '编辑mark');
                this.$message.success('编辑成功');
                this.getData();
            });
        }


    }
}
</script>

<style>

</style>