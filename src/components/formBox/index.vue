<template>
    <div>
        <p class="item-title">{{dataSet.titleSet && dataSet.titleSet.formTitle}}</p>
        <el-form 
            :model="formData" 
            :rules="rules" 
            ref="ruleForm" 
            :label-width="dataSet.formSet.labelWidth" 
            :label-position="dataSet.formSet.labelPosition"
            :inline="dataSet.formSet.inline"
            >
            <template v-for="(item, index) in formItem">
                <el-form-item v-if="item.type=='upload'" :label="item.label" :prop="item.prop" :key="item.prop">
                    <Upload
                        ref="upload"
                        v-model="formData[item.prop]"
                        type="1"
                        :file-list="formData.fileList"
                        :limit="item.limit"
                        actionUrl="https://upload-z2.qiniup.com"
                        tips="只能上传jpg/png文件，默认第一张图为封面主图"
                        @handlerSuccess="uploaded(item.prop, $event)"
                    />
                </el-form-item>
                <el-form-item v-if="item.type=='cascader'" :label="item.label" :prop="item.prop" :key="item.prop">
                    <el-cascader
                        :placeholder="item.placeholder"
                        clearable
                        size="small"
                        :options="regionData"
                        v-model="formData[item.prop]"
                    >
                    </el-cascader>
                </el-form-item>
                <el-form-item v-if="item.type=='input'" :label="item.label" :prop="item.prop" :key="index">
                    <el-input v-model="formData[item.prop]" size="small"></el-input>
                </el-form-item>
                <el-form-item v-if="item.type=='password'" :label="item.label" :prop="item.prop" :key="index">
                    <el-input type="password" v-model="formData[item.prop]" size="small"></el-input>
                </el-form-item>
                <el-form-item v-if="item.type=='select'" :label="item.label" :prop="item.prop" :key="index">
                    <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" size="small">
                        <el-option
                            v-for="(option, i) in item.options"
                            :key="i"
                            :label="option.label"
                            :value="option.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
            
            <el-form-item v-if="showAddBtn">
                <el-button type="primary" @click="onSubmit" size="small">确认添加</el-button>
            </el-form-item>
        </el-form>
    </div>  
</template>

<script>
import Upload from '../../views/goods/module/subModule/upload';
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
    // 接受各父级（站点、团长、标签、分类）的传参(与data互斥)
    props: {
        formItem: {
            type: Array,
            default: () => []
        },
        rules: {
            type: Object,
            default: () => {}
        },
        dataSet: {
            type: Object,
            default: () => {}
        },
        showAddBtn: {
            type: Boolean,
            default: true
        },
        formDataInit: {
            type: Object,
            default: null
        },
        fileList: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            formData: {},
            regionData: regionData,
        }
    },
    components: {
        Upload
    },
    watch: {
        formDataInit: {
            handler(val) {
                if (val) {
                    this.formData = {...val};
                }
            },
            deep: true,
            immediate: true
        },
        formData: {
            handler(val) {
                if (val) {
                    this.$emit('formChange', val);
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        setInit() {
            this.formData = {...this.formDataInit};
        },
        onSubmit() {
            // debugger
            // let hasUpload = this.formItem.some(item => item.type === 'upload');
            // if (hasUpload) {
            //     debugger;
            //     this.$refs.upload.upload();
            // }
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // console.log(this.formData,'提交')
                    this.$emit('add', this.formData);

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        upload() {
            console.log(this.$refs.upload, '----------')
            this.$refs.upload[0].upload();
        },
        uploaded(prop, list) {
            console.log(prop, list, 'prop, list');
            this.$emit('fileList', list);
        }
    }
}

</script>

<style>

</style>