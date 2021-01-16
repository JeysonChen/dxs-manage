<template>
    <div class="upload-box">
        <el-upload
            
            action="#"
            list-type="picture-card"
            :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div class="el-upload__text"><p class="title-one">上传图片</p><p class="title-two">建议尺寸1000x1000</p></div>
            
            <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                    <!-- 放大按钮 -->
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <!-- 下载按钮 -->
                    <!-- <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                        >
                        <i class="el-icon-download"></i>
                    </span> -->
                    <!-- 移出按钮 -->
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
            
        </el-upload>
        <!-- 放大图 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'upload',
    data () {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    created () {
        
    },
    mounted () {
        
    },
    methods: {
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
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