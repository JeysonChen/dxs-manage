<template>
	<div class="login-box">
		<div class="login-content">
            <h4 class="title">多鲜生后台管理系统</h4>
            <el-form 
                class="form-box"
                :model="ruleForm" 
                :rules="rules" 
                ref="ruleForm" 
                label-width="70px" 
                size="small"
                >
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input v-model="ruleForm.passWord" show-password></el-input>
                </el-form-item>
                <el-form-item label-width="0px" class="btn-box">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	components: {},
    data () {
        return {
            ruleForm: {
                userName: '',
                passWord: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
	created() {},
	methods: {
		
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$router.push({ path: '/goods/Publish' })
                } else {
                    
                    return false;
                }
            });
        },
	},
}
</script>

<style lang="less" scoped>
    .login-box{
        .login-content{
            padding: 20px;
            width: 400px;
            height: 320px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
            border-radius: 5px;
            opacity: 0.9;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -200px;
            margin-top: -180px;
            .title{
                font-size: 18px;
                height: 46px;
                line-height: 46px;
                padding: 20px 0;
            }
            .form-box{
                margin-top: 40px;
                .el-input--small{
                    width: 100%;
                }
                .btn-box{
                    margin-top: 30px;
                    .el-button{
                        width: 100%; 
                    }
                }
                .el-form-item__error{
                    left: 35px!important;
                }
               
            }
            
        }
    }
</style>
