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
                                <up-load />
                            </el-form-item>
                        </div>
                        <!-- 产品标题 -->
                        <div class="item title-box">
                            <p class="item-title">产品标题</p>
                            <el-form-item prop="title">
                                <el-input v-model="formData.title" size="small" class="title" placeholder="主标题"></el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle">
                                <el-input v-model="formData.subtitle" size="small" class="title" placeholder="副标题"></el-input>
                            </el-form-item>
                        </div>
                        <!-- 产品标签 -->
                        <div class="item mark-box">
                            <p class="item-title">产品标签</p>
                            <el-form-item>
                                <el-select size="small" v-model="formData.marks" multiple placeholder="请选择" >
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
                                <el-input size="small" v-model="input1">
                                    <template slot="prefix">销售价：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle">
                                <el-input size="small" v-model="input1" >
                                    <template slot="prefix">原价：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input size="small" v-model="input1">
                                    <template slot="prefix">运费：</template>
                                    <template slot="suffix">元</template>
                                </el-input>
                            </el-form-item>
                            <p>分佣比例</p>
                            <el-form-item prop="title" class="pl-60">
                                <el-input size="small" v-model="input1">
                                    <template slot="prefix">大团主挣：</template>
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="subtitle" class="pl-84">
                                <el-input size="small" v-model="input1" >
                                    <template slot="prefix">小团主自转挣：</template>
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="pl-84">
                                <el-input size="small" v-model="input1">
                                    <template slot="prefix">小团主帮发挣：</template>
                                    <template slot="suffix">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <!-- 产品分类 -->
                        <div class="item">
                            <p class="item-title">产品分类</p>
                            <el-form-item>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    v-for="(item, index) in parentCatelogList"
                                    :key="index"
                                >{{item.name}}</el-button>
                            </el-form-item>
                        </div>
                        <!-- 产品库存 -->
                        <div class="item">
                            <p class="item-title">产品库存</p>
                            <el-form-item prop="title">
                                
                            </el-form-item>
                            <el-form-item prop="subtitle">
                               
                            </el-form-item>
                        </div>
                        <!-- 大团主 -->
                        <div class="item">
                            <p class="item-title">大团主</p>
                            <el-form-item prop="title">
                                
                            </el-form-item>
                            <el-form-item prop="subtitle">
                               
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <!-- 详情长图 -->
                        <div class="item">
                            <p class="item-title">详情长图</p>
                            <el-form-item prop="title">
                                
                            </el-form-item>
                            <el-form-item prop="subtitle">
                               
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="tox-bottom">

            </div>
            
            
            <!-- <el-form-item label="活动名称" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="formData.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="活动时间" required>
                <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formData.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="formData.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="即时配送" prop="delivery">
                <el-switch v-model="formData.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="formData.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
                <el-radio-group v-model="formData.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="desc">
                <el-input type="textarea" v-model="formData.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script>
import UpLoad from './subModule/upload';
import Api from '@/api';
export default {
    name:'newPublish',
    components: {
        UpLoad,
    },
    data () {
        return {
            formData: {
                // 标签
                marks: [],
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
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
            }
        }
    },
    created () {
        
    },
    mounted () {
        this.getMarks();
        this.getCatelogList();
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
            Api.product.getCategoryList().then(res => {
                console.log(res, 'fenlei');
                this.parentCatelogList = res.data.filter(item => item.parentId === 0);
            })
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