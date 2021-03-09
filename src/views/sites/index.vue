<template>
    <div>
         <el-tabs v-model="activeName">
            <el-tab-pane label="站点列表" name="first">
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
                    title="编辑站点"
                    type="mark"
                    :rules="rules"
                    :form-item="formItem"
                    :form-data="dialogFormData"
                    @submit="submitDialog"

                />
            </el-tab-pane>
            <el-tab-pane label="新增站点" name="second">
                 <!-- 添加分类 -->
                <FormBox :formItem="formItem" :rules="rules" :dataSet="dataSet" @add="add" />

            </el-tab-pane>
         </el-tabs>
       
    </div>
</template>

<script>
import { CodeToText, TextToCode } from 'element-china-area-data';
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
            dialogFormData: {},
            activeName: 'first',
        }
    },
    created () {
        this.getData();
    },
    mounted () {
        
    },
    methods: {
        add(formData) {
            let [deliveryPointProvince, deliveryPointCity, deliveryPointDistrict] = formData.deliveryPointAddressThree;
            Object.assign(formData, {
                deliveryPointProvince: CodeToText[deliveryPointProvince],
                deliveryPointCity: CodeToText[deliveryPointCity],
                deliveryPointDistrict: CodeToText[deliveryPointDistrict]
            });
            delete formData.deliveryPointAddressThree;
            Api.sites.add(
                formData
            ).then(res => {
                // 消息提示--添加成功
                this.$message.success('添加成功')
                this.pagination.currentPage = 1;
                this.activeName = 'first';
                this.getData();
            }).catch(err => {
                this.$message.error('添加失败');
            })
        },
        search() {
            this.pagination.currentPage = 1;
            this.getData();
        },
        getData() {
            this.loading = true;
            Api.sites.list(
                {
                    pageSize: this.pagination.pageSize,
                    pageNo: this.pagination.currentPage
                }
            ).then(({data}) => {
                console.log(data, 'ressf')
                this.loading = false;
                this.tableData = data.records.map((item, index) => {
                    item.index = index + 1;
                    item.deliveryPointAddressThree = [
                        TextToCode[item.deliveryPointProvince].code,
                        TextToCode[item.deliveryPointProvince][item.deliveryPointCity].code,
                        TextToCode[item.deliveryPointProvince][item.deliveryPointCity][item.deliveryPointDistrict].code
                    ];
                    return item;
                });
                this.pagination.total = data.total;
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
                    // let param = new URLSearchParams();
                    // param.append("deliveryPointId", row.id);
                    this.$confirm('确认删除？')
                    .then(_ => {
                        Api.sites.delete({
                            deliveryPointId: row.id
                        }, {
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
        submitDialog(param) {
            console.log(param, '90909');
            Api.sites.edit(param).then(res => {
                console.log(res, '编辑mark');
                this.$message.success('编辑成功');
                this.pagination.currentPage = 1;
                this.getData();
            });
        }


    }
}
</script>

<style>

</style>