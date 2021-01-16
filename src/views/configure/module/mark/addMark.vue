<template>
    <div>
        <p class="item-title">添加标签</p>
        <el-form 
            :model="formData" 
            :rules="rules" 
            ref="formMark" 
            label-width="80px" 
            label-position="right"
            inline
            >
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="formData.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="标签编号" prop="sortOrder">
                <el-input v-model="formData.sortOrder" size="small"></el-input>
            </el-form-item>
            <el-form-item label="标签状态" prop="status">
                <el-select v-model="formData.status" placeholder="请选择标签状态" size="small">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="已废弃" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small">确认添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'addmark',
    data () {
        return {
           
            formData: {
                name: '',
                sortOrder: '',
                status: ''    
            },
            rules: {
                name: [
                    { required: true, message: '请输入标签名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sortOrder: [
                     { required: true, message: '请输入标签标号', trigger: 'blur' },
                     { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择标签状态', trigger: 'change' }
                ]
            }
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    methods: {
        onSubmit() {    
            this.$refs.formMark.validate((valid) => {
                if (valid) {
                    // console.log(this.formData,'提交')
                    console.log(message,'提示')
                    Api.mark.add(
                        this.formData
                    ).then(res => {
                        console.log(this, 'this')
                        console.log(res,'提交成功')
                        // 消息提示--添加成功
                        this.$message.success('添加成功')
                        this.$parent.$refs.checkList.pagination.currentPage = 1;
                        this.$parent.$refs.checkList.getData();
                    })


                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
            
        },
    }
}
</script>

<style>

</style>