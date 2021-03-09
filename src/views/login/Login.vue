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
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label-width="0px" class="btn-box">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
	</div>
</template>

<script>
import Api from '@/api';
import axios from 'axios'
export default {
	name: 'Login',
	components: {},
    data () {
        return {
            ruleForm: {
                username: '18660626629',  // dsx888
                password: 'dsx888'  // 18660626629
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
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
                    let param = new URLSearchParams();
                    param.append("username", this.ruleForm.username);
                    param.append("password", this.ruleForm.password);
                    Api.mallUser.login(
                        param,
                        {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    ).then(res => {
                        console.log(res);
                        localStorage.setItem('isAuthenticated', true);
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                        this.$router.push({ path: '/goods/publishing' })
                    });
                    
                }
                else {

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
