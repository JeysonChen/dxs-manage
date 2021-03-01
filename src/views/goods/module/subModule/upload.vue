<template>
    <el-upload
        ref="upload"
        :data="uploadForm"
        :action="actionUrl"
        :before-upload="beforeUpload"
        :file-list="fileList"
        list-type="picture-card"
        :type="type"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handlerSuccess"
        :auto-upload="false">
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
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    methods: {
        beforeUpload(file) {
            let tokendata= {
				ak: qiniuConfig.AccessKey,
				sk: qiniuConfig.SecretKey,
				bkt: qiniuConfig.Bucket,
				cdn: qiniuConfig.Domain
			};
            this.uploadForm.token = token.token(tokendata);  //参数传入封装代码函数
            this.uploadForm.key = Math.round(new Date() / 1000);
        },
        handleRemove(file) {
            console.log(file);
        },
        handlePreview(file) {
            console.log(file);
        },
        handlerSuccess(response, file, fileList) {
            let list = fileList && fileList.map(item => {
                item.uploadFile = `${qiniuConfig.Domain}/${response.key}`;
                return item.uploadFile;
            });
            this.$emit('handlerSuccess', list);
            this.$emit('input', list)
        },
        upload() {
            this.$refs.upload.submit();
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