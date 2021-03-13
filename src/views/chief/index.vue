<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="团长列表" name="first">
                <el-form
                    :model="searchData" 
                    ref="ruleForm" 
                    label-width="100" 
                    :inline="true"
                >
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="searchData.userName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="searchData.phone" size="small"></el-input>
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
                    @add="add"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {qiniuConfig} from '@/utils/qiniuConfig';

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
            type: 'search',
            searchData: {
                userName: '',
                phone: '',
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
            this.formData = formData;
            this.type = 'add';
            this.submit();
        },
        setParams() {
            let {time} = this.formData;
            let [startTime, endTime] = time;
            return {...this.formData, startTime, endTime};
        },
        search() {
            this.type = 'search';
            this.pagination.currentPage = 1;
            this.getData();
        },
        getData() {
            let params = {};
            if (this.type === 'search') {
                params = this.searchData;
            }
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
                    this.type = 'edit';
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
            this.formData = val ;
            this.type = 'edit';
            // await this.$refs.chiefForm.upload();
            this.submit();
            
        },
        submit() {
            this.pagination.currentPage = 1;
            let params = {};
            params = {
                avatar: this.formData.avatar,
                email: this.formData.email,
                nickName: this.formData.nickName,
                password: this.formData.password2,
                phone: this.formData.phone,
                username: this.formData.username
            };
            if (this.type === 'edit') {
                params.id = Number(this.dialogFormData.id);
                Api.mallUser.edit(params).then(res => {
                    console.log(res, '编辑mark');
                    this.$message.success('编辑成功');
                    this.getData();
                })
            } else {
                Api.mallUser.add(params).then(res => {
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