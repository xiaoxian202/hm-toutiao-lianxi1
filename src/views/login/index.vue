<template>
  <div class="container-login">
    <el-card>
        <div>
            <img src="../../assets/logo_index.png" alt="">
        </div>
        <el-form :model="loginForm" :rules="rulesForm" ref="loginForm">
            <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:240px; margin-right:8px"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <!-- :value代表当前绑定值，默认选中 -->
                <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button @click="loginBtn" type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'page-login',
    data() {
        // 手机号自定义校验
        // rule:该字段对应的校验过则，用不上
        // value:该字段对应的数据
        // callback:校验后的回调函数
        const checkMobile = (rule,value,callback) => {
            // 第一位是1，第二位是3-9，后面有9位并以他结尾
            if(/^1[3-9]\d{9}$/.test(value)) {
                callback()
            }else{
                callback(new Error('手机号不正确'))
            }
        }
       return{
            // 表单数据对象
            loginForm:{
                mobile:'',
                code:''
            },
            // 校验规则对象
            rulesForm:{
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    // 自定义验证规则
                    {validator:checkMobile,trigger: 'blur'}

                ],
                code:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { len:6, message: '验证码是6位字符', trigger: 'blur' }
                ]
            }
       }
    },
    methods:{
        // 登录按钮
        loginBtn() {
            // 对整体表单校验,参数valid是布尔值true代表校验成功
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    // 跳转登录界面
                    await this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations',this.loginForm)
                    .then(res => {
                        // 跳转登录界面
                        this.$router.push('/')
                    }).catch(error => {
                        // 错误提示
                        this.$message.error('手机号或验证码错误')
                    })
                } else {
                    this.$message.error('手机号或验证码错误')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.container-login {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../../assets/login_bg.jpg) no-repeat center /cover;
    .el-card {
        width: 400px;
        height: 350px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img {
            display: block;
            width: 200px;
            margin: 0 auto 20px;
        }
    }
}
</style>