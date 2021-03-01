<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="新增团长" name="first">
                <!-- 添加分类 -->
                <FormBox :formItem="formItem" :rules="rules" :dataSet="dataSet" @add="add" />
            </el-tab-pane>
            <el-tab-pane label="团长列表" name="second">
                <el-form
                    :model="formData" 
                    ref="ruleForm" 
                    label-width="100" 
                    :inline="true"
                >
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="formData.userName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="formData.phone" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formData.email" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="time">
                        <el-date-picker
                            v-model="formData.time"
                            type="daterange"
                            size="small"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="search">查询</el-button>
                    </el-form-item>
                </el-form>
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
                    title="编辑团长"
                    type="mark"
                    :rules="rules"
                    :form-item="formItem"
                    :form-data="dialogFormData"
                    @submit="submitDialog"

                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import FormBox from '@/components/formBox';
import CheckList from '@/components/checkList'
import Dialog from './module/dialog';
import {formItem, rules, dataSet, tableTitle} from '@/utils/chief';
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
            formItem: formItem,
            rules: rules,
            dataSet: dataSet,
            tableTitle: tableTitle,
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
            activeName: 'first',
            formData: {
                userName: '',
                phone: '',
                email: '',
                time: []
            }
        }
    },
    created () {
        this.getData();
    },
    mounted () {
        
    },
    methods: {
        add(formData) {
            if (formData.password) {
                formData.password = MD5(formData.password);
            }
            Api.mallUser.add(
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
        setParams() {
            let {time} = this.formData;
            let [startTime, endTime] = time;
            return {...this.formData, startTime, endTime};
        },
        search() {
            this.pagination.currentPage = 1;
            this.getData();
        },
        getData() {
            let params = this.setParams();
            delete params.time;
            this.loading = true;
            Api.mallUser.list(
                {
                    ...params,
                    pageSize: this.pagination.pageSize,
                    pageNo: this.pagination.currentPage
                }
            ).then(({data}) => {
                this.loading = false;
                this.pagination.total = data.total;
                this.tableData = data.records.map((item, index) => {
                    item.index = index + 1;
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
                    this.dialogFormData.fileList = [{url: row.avatar}]
                    break;
                case 'del':
                    Api.mark.delete({tagId: row.id}).then(res => {
                        this.$message.success('删除成功');
                    });
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