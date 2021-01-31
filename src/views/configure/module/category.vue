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
    </div>
</template>

<script>
import FormBox from '@/components/formBox';
import CheckList from '@/components/checkList'
import {formItem, rules, dataSet, tableTitle} from '@/utils/category';
import Api from '@/api';
export default {
    name: 'configure',
    components: {
        FormBox,
        CheckList
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
            loading: false
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
                this.$refs.checkList.pagination.currentPage = 1;
                this.$refs.checkList.getData();
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
                    Api.mark.edit(row).then(res => {
                        console.log(res, '编辑mark')
                    })
            }
        },
        handleCurrentChange(currentPage) {
            console.log(currentPage, 'currentPage')
        },
        handleSizeChange(pageSize) {
            console.log(pageSize, 'pageSize')
        }


    }
}
</script>

<style>

</style>