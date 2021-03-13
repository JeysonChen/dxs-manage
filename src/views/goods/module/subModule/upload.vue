<template>
    <el-upload
        ref="upload"
        :data="uploadForm"
        :action="actionUrl"
        :before-upload="beforeUpload"
        :file-list="fileList"
        list-type="picture-card"
        :type="type"
        accept=".png,.jpeg,.jpg"
        :on-change="change"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handlerSuccess"
        :on-error="handlerError"
        :auto-upload="true">
        <i slot="default" class="el-icon-plus"></i>
        <div class="el-upload__text"><p class="title-one">{{title}}</p></div>

        <div slot="tip" class="el-upload__tip">{{tips}}</div>
    </el-upload>
</template>

<script>
import {qiniuConfig} from '@/utils/qiniuConfig';
const token = require('@/qiniu/qntoken.js');
export default {
    name: 'Upload',
    data () {
        return {
            uploadForm: {
                uploadToken: '',
                domain: '',
            },
            fileItem: [],
            successFile: []
        }
    },
    props: {
        refDom: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        tips: {
            type: String,
            default: ''
        },
        actionUrl: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        fileList: {
            type: Array,
            default: () => []
        },
        limit: {
            type: [String, Number],
            default: ''
        }
    },
    created () {
        
    },
    mounted () {
        this.formItem = this.fileList;
        this.successFile = this.fileList;
    },
    watch: {
        fileItem: {
            handler(val) {
                // this.$emit('changeFileList', val, this.type)
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        beforeUpload(file) {
            console.log(file, '0000bef')
            let tokendata= {
				ak: qiniuConfig.AccessKey,
				sk: qiniuConfig.SecretKey,
				bkt: qiniuConfig.Bucket,
				cdn: qiniuConfig.Domain
			};
            this.uploadForm.token = token.token(tokendata);  //参数传入封装代码函数
            this.uploadForm.key = Math.round(new Date() / 1000);
        },
        change(file, fileList) {
            console.log(fileList, file, 'change');
            // this.fileItem = fileList;
        },
        handleRemove(file, fileList) {
            console.log(file);
            console.log(fileList, '删除');
            // this.fileItem = fileList;

        },
        handlePreview(file) {
            console.log(file);
        },
        handlerSuccess(response, file, fileList) {
            this.$emit('handlerSuccess', fileList);
            this.$emit('input', this.formItem)
        },
        upload() {
            this.$refs.upload.submit();
        },
        handlerError() {
            this.$message.error('请重新上传');
        }
        
    }
}
</script>
<style scoped>
    .upload-box>>>.el-upload--picture-card{
        position: relative!important;
    }
</style>
<style lang="less" scoped>
    
    .upload-box{
        .el-upload__text{
            width: 148px;
            position: absolute;
            top: 84px;
            left: 0;
            p{
                height: 18px;
                line-height: 18px;
            }
            .title-one{
                font-size: 14px;
            }
            .title-two{
                color: #999;
            }
            
        }        
    }
    
</style>