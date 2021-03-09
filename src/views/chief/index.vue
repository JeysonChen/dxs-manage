<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="团长列表" name="first">
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
            <el-tab-pane label="新增团长" name="second">
                <!-- 添加分类 -->
                <FormBox ref="chiefForm" :formItem="formItem" :rules="rules" :dataSet="dataSet" 
                    @add="add" @fileList="getFileList"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import crypto from 'crypto-js/md5';
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
                avatar: '',
                userName: '',
                phone: '',
                email: '',
                time: []
            },
            type: 'add'
        }
    },
    created () {
        this.getData();
    },
    mounted () {
        
    },
    methods: {
        async add(formData) {
            this.formData = formData;
            this.type = 'add';
            await this.$refs.chiefForm.upload();
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
                    item.password2 = item.password;
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
                    this.$confirm('确认删除？')
                    .then(_ => {
                        Api.mallUser.delete({userId: row.id}).then(res => {
                            this.$message.success('删除成功');
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
        async submitDialog(val) {
            debugger
            console.log(val);
            this.formData = val;
            this.type = 'edit';
            // await this.$refs.chiefForm.upload();
            this.add(val);
            
        },
        async getFileList(list) {
            this.formData.avatar = list && list[0];
            if (this.formData.password2) {
                this.formData.password = this.formData.password2;
                delete this.formData.password2;
            }
            debugger;
            if (this.type === 'edit') {
                Api.mallUser.edit({
                    id: this.formData.id,
                    ...this.formData
                }).then(res => {
                    console.log(res, '编辑mark');
                    this.$message.success('编辑成功');
                    this.getData();
                })
            } else {
                Api.mallUser.add(
                    this.formData
                ).then(res => {
                    // 消息提示--添加成功
                    this.activeName = 'first';
                    this.$message.success('添加成功')
                    this.pagination.currentPage = 1;
                    this.getData();
                }).catch(err => {
                    this.$message.error('添加失败');
                })
            }
            
        }


    }
}
</script>

<style>

</style>