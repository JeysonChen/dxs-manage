<template>
    <div class="new-publish">
        <el-form :model="formData" :rules="rules" ref="ruleForm" class="publish-box">
            <div class="box-top">
                <el-row :gutter="60">
                    <el-col :span="16">
                        <!-- 产品图 -->
                        <div class="item">
                            <p class="item-title">产品图</p>
                            <el-form-item prop="picture">
                                <UpLoad
                                    ref="productListUpload"
                                    type="1"
                                    :file-list="productImg"
                                    actionUrl="https://upload-z2.qiniup.com"
                                    tips="只能上传jpg/png文件，默认第一张图为封面主图"
                                    @handlerSuccess="productListUploaded"
                                    @changeFileList="changeFileList"
                                    @handleError="handleErrorProduct"
                                />
                            </el-form-item>
                        </div>
                        <!-- 产品标题 -->
                        <div class="item title-box">
                            <p class="item-title">产品标题</p>
                            <el-form-item prop="title">
                                <el-input v-model="formData.name" size="small" class="title" placeholder="主标题"></el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle">
                                <el-input v-model="formData.subtitle" size="small" class="title" placeholder="副标题"></el-input>
                            </el-form-item>
                        </div>
                        <!-- 产品标签 -->
                        <div class="item mark-box">
                            <p class="item-title">产品标签</p>
                            <el-form-item>
                                <el-select size="small" v-model="formData.tagIds" multiple placeholder="请选择" >
                                    <el-option
                                        v-for="item in marks"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <!-- 产品价格 -->
                        <div class="item price-area">
                            <p class="item-title">产品价格</p>
                            <el-form-item prop="title" class="pl-52">
                                <el-input size="small" v-model="formData.salePrice">
                                    <template slot="prefix">销售价：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle">
                                <el-input size="small" v-model="formData.originPrice" >
                                    <template slot="prefix">原价：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input size="small" v-model="formData.transportCosts">
                                    <template slot="prefix">运费：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <p>分佣比例</p>
                            <el-form-item prop="title" class="pl-60">
                                <el-input size="small" v-model="formData.groupOwnerEarnings">
                                    <template slot="prefix">大团主挣：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle" class="pl-84">
                                <el-input size="small" v-model="formData.shareEarnings" >
                                    <template slot="prefix">小团主自转挣：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="pl-84">
                                <el-input size="small" v-model="formData.helphairEarnings">
                                    <template slot="prefix">小团主帮发挣：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <!-- 产品分类 -->
                        <div class="item">
                            <p class="item-title">产品分类</p>
                            <el-form-item>
                                <el-button
                                    size="mini"
                                    :type="categoryParentId === item.id ? 'primary' : ''"
                                    v-for="(item, index) in parentCatelogList"
                                    :key="index"
                                    @click="catelogChange('categoryParentId', item)"
                                >{{item.name}}</el-button>
                            </el-form-item>
                            <p>请选择二级分类</p>
                            <el-form-item>
                                <el-button
                                    size="mini"
                                    :type="categoryId === item.id ? 'primary' : ''"
                                    v-for="(item, index) in subCatelogList"
                                    :key="index"
                                    @click="catelogChange('categoryId', item)"
                                >{{item.name}}</el-button>
                            </el-form-item>
                        </div>
                        <!-- 产品库存 -->
                        <div class="item price-area">
                            <p class="item-title">产品库存</p>
                            <el-form-item prop="title" class="pl-52">
                                <el-input size="small" v-model="formData.stockQuantity">
                                    <template slot="prefix">总数量：</template>
                                    <template slot="suffix">件</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle" class="pl-114">
                                <el-input size="small" v-model="formData.maxBuyQuantity" >
                                    <template slot="prefix">单人最多可购买数：</template>
                                    <template slot="suffix">件</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <!-- 大团主 -->
                        <div class="item price-area">
                            <p class="item-title">大团主</p>
                            <el-form-item prop="subtitle" class="pl-52">
                                <el-input size="small" v-model="formData.groupOwnerPhone" >
                                    <template slot="prefix">手机号：</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <!-- 详情长图 -->
                        <div class="item">
                            <p class="item-title">详情长图</p>
                            <UpLoad
                                class="upload-detail"
                                ref="productDetailUpload"
                                type="2"
                                :file-list="detailImg"
                                actionUrl="https://upload-z2.qiniup.com"
                                tips="只能上传jpg/png文件，且不超过500kb"
                                title="上传详情长图"
                                @handlerSuccess="productDetailUploaded"
                                @changeFileList="changeFileListDetails"
                                @handleError="handleErrorDetail"
                            />
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="tox-bottom">
                <el-button type="primary" size="mini" @click="submit">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import UpLoad from './subModule/upload';
import {qiniuConfig} from '@/utils/qiniuConfig';
import Api from '@/api';
export default {
    name:'newPublish',
    components: {
        UpLoad
    },
    data () {
        return {
            uploadProductList: [], // 上传图片列表
            uploadProductDetail: [], // 商品详情          
            formData: {
                categoryId: 0,
                categoryParentId: 0,
                costPrice: 0,
                details: '',
                groupOwnerEarnings: 0,
                groupOwnerId: 0,
                helphairEarnings: 0,
                mainImage: '',
                maxBuyQuantity: 0,
                monthlySales: 0,
                name: '',
                originPrice: 0,
                promotionIds: [],
                salePrice: 0,
                shareEarnings: 0,
                status: 0,
                stockQuantity: 0,
                stockStatus: 0,
                strategyIds: [],
                subImages: '',
                subtitle: '',
                tagIds: [],
                transportCosts: 0
            },
            productInfo: {},
            categoryParentId: 0, // 父类当前项
            categoryId: 0, // 子类当前项
            marks: [], // 标签列表
            parentCatelogList: [], // 一级分类
            subCatelogList: [], // 二级分类
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            isAllDone: false,
            isDetailsAllDone: false,
            params: {},
            detailImg: [],
            productImg: []
        }
    },
    computed: {
        // formData() {
        //     return this.type === 'edit' ? this.editData : this.formData1;
        // },
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    watch: {
        editData: {
            handler(val) {
                if (this.type === 'edit' && val) {
                    this.formData = {...val};
                    this.detailImg = val.detailImg;
                    this.productImg = val.productImg;
                    this.categoryParentId = val.categoryParentId;
                    setTimeout(() => {
                        this.subCatelogList = this.parentCatelogList.filter(i => i.id === val.categoryParentId)[0].children;
                        this.categoryId = val.categoryId;
                    }, 0)
                    
                }
            },
            immediate: true,
            deep: true
            
        },
    },
    props: {
        editData: {
            type: Object,
            default: () => {}
        },
        type: {
            type: String,
            default: 'add'
        },
    },
    mounted () {
        console.log(this.userInfo.id, '=-=-')
        this.getMarks();
        this.getCatelogList();
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
        // 获取所有标签
        getMarks() {
            Api.mark.list().then(({data}) => {
                this.marks = data;
            })
        },
        // 获取所有分类
        getCatelogList() {
            Api.category.listTree().then(({data}) => {
                console.log(data, 'fenlei');
                this.parentCatelogList = data;
            })
        },

        // 分类
        catelogChange(type, item) {
            this.formData[type] = item.id;
            this[type] = item.id;
            if (type === 'categoryParentId') {
                this.subCatelogList = this.parentCatelogList.filter(i => i.id === item.id)[0].children;
            }
        },
        submit() {
            this.params = {
                categoryId: Number(this.formData.categoryId),
                categoryParentId: Number(this.formData.categoryParentId),
                costPrice: Number(this.formData.costPrice) * 10,
                detail: this.formData.details,
                groupOwnerEarnings: Number(this.formData.groupOwnerEarnings) * 10,
                groupOwnerId: this.userInfo.id,
                helphairEarnings: Number(this.formData.helphairEarnings) * 10,
                mainImage: this.formData.mainImage,
                maxBuyQuantity: Number(this.formData.maxBuyQuantity),
                monthlySales: Number(this.formData.monthlySales),
                name: this.formData.name,
                originPrice: Number(this.formData.originPrice) * 10,
                promotionIds: this.formData.promotionIds,
                salePrice: Number(this.formData.salePrice) * 10,
                shareEarnings: Number(this.formData.shareEarnings) * 10,
                status: Number(this.formData.status),
                stockQuantity: Number(this.formData.stockQuantity),
                stockStatus: Number(this.formData.stockStatus),
                strategyIds: this.formData.strategyIds,
                subImages: this.formData.subImages,
                subtitle: this.formData.subtitle,
                tagIds: this.formData.tagIds,
                transportCosts: Number(this.formData.transportCosts)
            };

            if (this.type === 'edit') {
                this.params.id = this.formData.id;
                Api.product.edit(this.params).then(res => {
                    console.log('res', res);
                    this.$message.success('编辑成功');
                    this.$emit('edit');
                });
            }  else {
                
                Api.product.add(this.params).then(res => {
                    console.log('res', res);
                    this.$message.success('发布成功');
                    this.$router.push('/goods/onsale')
                });
            }
            

        },
        productListUploaded(list) {
            console.log(list, '11111');
            
            list = list.map(item => {
                item.url = `${qiniuConfig.Domain}/${item.response.key}`;
                return item;
            })
            this.productImg = list;
            this.setFormDataImg();
            // this.formData.mainImage = list && list[0];
            // this.formData.subImages = list && list.length > 1 && list.slice(1).join(';') || '';
            if (this.isAllDone && this.type === 'edit') {
                this.editProduct()
            }
        },
        productDetailUploaded(list) {
            list = list.map(item => {
                item.url = `${qiniuConfig.Domain}/${item.response.key}`;
                return item;
            })
            this.detailImg = list;
            this.setFormDataImg();
        },
        async editProduct() {
            await this.setFormDataImg();
            this.params = {
                id: this.formData.id,
                categoryId: Number(this.formData.categoryId),
                categoryParentId: Number(this.formData.categoryParentId),
                costPrice: Number(this.formData.costPrice) * 10,
                detail: this.formData.details,
                groupOwnerEarnings: Number(this.formData.groupOwnerEarnings) * 10,
                groupOwnerId: this.userInfo.id,
                helphairEarnings: Number(this.formData.helphairEarnings) * 10,
                mainImage: this.formData.mainImage,
                maxBuyQuantity: Number(this.formData.maxBuyQuantity),
                monthlySales: Number(this.formData.monthlySales),
                name: this.formData.name,
                originPrice: Number(this.formData.originPrice) * 10,
                promotionIds: this.formData.promotionIds,
                salePrice: Number(this.formData.salePrice) * 10,
                shareEarnings: Number(this.formData.shareEarnings) * 10,
                status: Number(this.formData.status),
                stockQuantity: Number(this.formData.stockQuantity),
                stockStatus: Number(this.formData.stockStatus),
                strategyIds: this.formData.strategyIds,
                subImages: this.formData.subImages,
                subtitle: this.formData.subtitle,
                tagIds: this.formData.tagIds,
                transportCosts: Number(this.formData.transportCosts)
            };
            Api.product.edit(this.params).then(res => {
                console.log('res', res);
                this.$message.success('编辑成功');
                this.$emit('edit');
            });
        },
        changeFileList(list, type) {
            console.log(list, type, '0000');
            this.productImg = list;
            this.setFormDataImg();

            this.isAllDone = list.some(item => item.status !== 'success');
        },
        changeFileListDetails(list, type) {
            this.detailImg = list;
            this.setFormDataImg();
            this.isDetailsAllDone = list.some(item => item.status !== 'success');
        },
        setFormDataImg() {
            let productImg = this.productImg.map(item => item.url);
            let detailImg = this.detailImg.map(item => item.url);
            this.formData.mainImage = productImg && productImg[0];
            this.formData.subImages = productImg && productImg.length > 1 && productImg.slice(1).join(';') || '';
            this.formData.details = detailImg && detailImg.join(';');

        },
        handleErrorProduct() {
            this.$message.error('图片上传失败，请重新提交');
        },
        handleErrorDetail() {
            this.$message.error('图片详情上传失败，请重新提交');
        }

    }
}
</script>

<style lang="less" scoped>
    .publish-box{
        .box-top{
            .item{
                p{
                    // margin-bottom: 20px;
                }
                .el-form-item{
                    // margin-bottom: 6px!important;
                }
            }


        }
        .new-publish {}
        
    }

</style>