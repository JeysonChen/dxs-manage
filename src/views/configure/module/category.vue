<template>
    <div class="catelog">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="分类列表" name="first">
                <el-tree
                    :data="data"
                    :props="props"
                    node-key="id"
                    :expand-on-click-node="false"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span class="catelog-label">{{ node.label }}</span>
                        <span class="catelog-handle">
                            <el-button
                                type="text"
                                size="mini"
                                @click="() => edit(data)">
                                编辑
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="() => remove(node, data)">
                                删除
                            </el-button>
                        </span>
                    </span>
                </el-tree>
                <Dialog
                    ref="dialog"
                    title="编辑分类"
                    type="catelog"
                    :rules="rules"
                    :form-item="formItemCatelog"
                    :form-data="dialogFormData"
                    @submit="submitDialog"
                />
            </el-tab-pane>
            <el-tab-pane label="新增分类" name="second">
                <!-- 添加分类 -->
                <FormBox :formItem="pFormItem" :rules="rules" :dataSet="pDataSet" @add="addParentCantelog" />
                <FormBox :formItem="formItem" :rules="rules" :dataSet="dataSet" @add="addCantelog" />
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import Dialog from './dialog';
import FormBox from '@/components/formBox';
import {pFormItem, formItem, rules, pDataSet,dataSet, tableTitle} from '@/utils/category';
import Api from '@/api';
export default {
    name: 'catelog',
    components: {
        FormBox,
        Dialog
    },
    data () {
        return {
            props: {
                label: 'name',
                isLeaf: 'leaf'
            },
            activeName: 'first',
            pFormItem,
            formItem: formItem,
            rules: rules,
            dataSet: dataSet,
            pDataSet,
            tableTitle: tableTitle,
            pagination: {
                total: 1,
                currentPage: 1,
                pageSize:10
            },
            data: [],
            loading: false,
            formData: {},
            dialogFormData: {},
            formItemCatelog: []
        }
    },
    created () {
        this.getData();
    },
    mounted () {
        this.formItem[0].options = [
            {
                label: 1,
                value: 1
            }
        ];
    },
    methods: {
        addParentCantelog(formData) {
            console.log(formData, 'formData');
            Api.category.add({
                ...formData,
                parentId: 0
            }).then(res => {
                console.log(this, 'this')
                console.log(res,'提交成功')
                // 消息提示--添加成功
                this.$message.success('添加成功')
                this.pagination.currentPage = 1;
                this.getData();
            }).catch(err => {
                this.$message.error('添加失败');
            });
        },
        addCantelog(formData) {
            console.log(formData, 'formData');
            Api.category.add({
                ...formData,
                mainImage: ''
            }).then(res => {
                console.log(this, 'this')
                console.log(res,'提交成功')
                // 消息提示--添加成功
                this.$message.success('添加成功')
                this.pagination.currentPage = 1;
                this.getData();
                this.activeName = 'first';
            }).catch(err => {
                this.$message.error('添加失败');
            });
        },
        // 所有分类
		getData() {
			Api.category.listTree().then(res => {
				console.log('查询所有分类');
                this.data = res.data;
				console.log('查询所有分类', this.navCateLogList);
				this.formItem[0].options = res.data.map(item => {
                    let json = {};
                    json.label = item.name;
                    json.value = item.id;
                    return json;
                })
			})
        },
        edit(data) {
            this.$refs.dialog.open();
            this.dialogFormData = data;
            if (data.parentId) {
                this.formItemCatelog = this.formItem;
            } else {
                this.formItemCatelog = this.pFormItem;
            }
        },
        // 编辑提交
        submitDialog(param) {
            console.log(param);
            Api.category.edit({
                id: param.id,
                mainImage: param.mainImage,
                name: param.name,
                parentId: param.parentId
            }).then(res => {
                console.log(res, '编辑分类');
                this.$message.success('编辑成功');
                this.getData();3
            })
        },
        remove(node, data) {
            let param = new URLSearchParams();
            param.append("categoryId", data.id);
            this.$confirm('确认删除？')
            .then(_ => {
                Api.category.delete(param).then(res => {
                    console.log(res, '编辑分类');
                    this.$message.success('编辑成功');
                    this.getData();
                })
            })
            .catch(_ => {});
            
        }



    }
}
</script>

<style lang="less">
.catelog {
    .custom-tree-node {
        width: 200px;
        display: flex;
        align-items: center;
        .catelog-label {
            flex: 1;
        }
    }
}

</style>