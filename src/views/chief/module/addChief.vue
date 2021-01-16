<template>
    <div class="chief-add">
        <p>添加站点</p>
        <el-form 
            class="form-box"
            ref="formSites" 
            :rules="rules"
            :inline="true" 
            :model="formData" 
            size="small"
            label-width="80px">
            <el-form-item label="省市区" prop="deliveryPointAddressThree">
                <el-cascader
                    placeholder="请选择省市区"
                    clearable
                    size="small"
                    :options="options"
                    v-model="formData.deliveryPointAddressThree"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="deliveryPointAddress">
                <el-input v-model="formData.deliveryPointAddress" placeholder="请输入详细地址"></el-input>
            </el-form-item>
            
            <el-form-item label="电话" label-width="60px" prop="deliveryPointMobile">
                <el-input type="tel" v-model="formData.deliveryPointMobile" placeholder="请输入站点电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Api from '@/api'
// 地区选择--省市区级联数据
import { 
    provinceAndCityData, 
    regionData, 
    provinceAndCityDataPlus, 
    regionDataPlus, 
    CodeToText, 
    TextToCode 
} from 'element-china-area-data';

export default {
    data () {
        return {
             // 表单提交数据
            formData: {
                deliveryPointAddressThree: '',
                // deliveryPointProvince: '',
                // deliveryPointCity: '',
                // deliveryPointDistrict: '',
                deliveryPointAddress: '',
                deliveryPointMobile: '',
            },
            // 表单校验数据
            rules: {
                deliveryPointAddressThree: [
                    { required: true, message: '省市区地址不能为空', trigger: 'change' },
                ],
                deliveryPointAddress: [
                    { required: true, message: '详细地址不能为空', trigger: 'blur' },
                ],
                deliveryPointMobile: [
                    { required: true, message: '站点电话不能为空', trigger: 'blur' },
                    { pattern: /^1[35789]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' },

                ]
            },
            options: regionData,
            selectedOptions: []
        }
    },
    methods: {
        handleChange (value) {
            console.log(value)
        },
        onSubmit() {
            
            this.$refs.formSites.validate((valid) => {
                if (valid) {
                    // console.log(valid,'校验')---true
                    // console.log(this.formData.deliveryPointAddressThree, '省市区三联')
                    // console.log(CodeToText[this.formData.deliveryPointAddressThree[0]],'省市区转化')

                    Api.sites.add({
                        deliveryPointProvince: CodeToText[this.formData.deliveryPointAddressThree[0]],
                        deliveryPointCity: CodeToText[this.formData.deliveryPointAddressThree[1]],
                        deliveryPointDistrict: CodeToText[this.formData.deliveryPointAddressThree[2]],
                        deliveryPointAddress: this.formData.deliveryPointAddress,
                        deliveryPointMobile: this.formData.deliveryPointMobile
                    }).then(res => {
                        
                    })

                    this.$emit('addSucc', '')

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
            
        },

    }
}
</script>
<style lang="less" scoped>
    .chief-add{
        p{
            border-left: 2px solid#909399;
            padding-left: 6px;
            font-size: 14px;
        }
        .form-box{
            padding: 20px 0;
        }
    }
</style>